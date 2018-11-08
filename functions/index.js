const functions = require('firebase-functions');

// For access to the realtime database
const admin = require('firebase-admin');

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

function getNameWithExtention(path) {
  return path.slice(path.lastIndexOf("/")+1);
}

function getName(path) {
  return stripExtention(getNameWithExtention(path));
}

function stripExtention(path) {
  return path.slice(0, path.lastIndexOf("."));
}


/*
  So upon adding an image, we need to create ana appropriate entry in the
  realtime database to represent that the image exists in the gallery directory.
  We also then need to create a thumbnail that is one-third the size and save
  that with an equivalent name to the thumbnails directory.
*/
exports.imageAdded = functions.storage.object().onFinalize((object) => {
  console.log("Running imageAdded for " + JSON.stringify(object));
  if (!object.name.includes("gallery/")) {
    // No processing for non-gallery
    console.log("Ignoring non-gallery upload!");
    return null;
  } else if (!object.name.endsWith(".jpg")) {
    console.log("Ignoring non-jpg file upload.");
    return null;
  } else {
    const bucket = gcs.bucket(object.bucket);
    const tempFilePath = path.join(os.tmpdir(), "tempFile");
    return bucket.file(object.name).download({ destination: tempFilePath }).then(
      () => {
        console.log("Image downloaded locally to", tempFilePath);
        return spawn('convert', [tempFilePath, '-thumbnail', '400x400', tempFilePath]);
      }
    ).then(() => {
      console.log("Image thumbnail created at", tempFilePath);
      return bucket.upload(tempFilePath, {
        destination: "thumbnail/" + getNameWithExtention(object.name)
      });
    }).then(() => {
      console.log("Thumbnail uploaded!");
      fs.unlinkSync(tempFilePath);

      console.log("Adding image entry in database...");
      let newImageEntryRef = admin.database().ref().child("gallery").push();
      newImageEntryRef.set(getName(object.name));
    });
  }
});

exports.imageDeleted = functions.storage.object().onDelete((object) => {
  console.log("Running imageDeleted for " + JSON.stringify(object));
  const bucket = gcs.bucket(object.bucket);
  const thumbnailFile = bucket.file("thumbnail/" + getNameWithExtention(object.name));
  return thumbnailFile.delete().then(() => {
    console.log("File deleted successfully! Cleaning up database entry...");
    return admin.database().ref().child("gallery").once("value").then(snapshot => {
      let objectList = snapshot.val();
      for (let key in objectList) {
        if (objectList[key] === getName(object.name)) {
          console.log("Deleting child: " + JSON.stringify(objectList[key]));
          return admin.database().ref().child("gallery").child(key).remove();
        }
      }
    });
  });
});
