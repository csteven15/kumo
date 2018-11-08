const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// For access to the realtime database
const admin = require('firebase-admin');
admin.initializeApp();

function getName(path) {
  return stripExtention(path.slice(path.lastIndexOf("/")+1));
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
    console.log("Adding image entry in database...");
    return admin.database().ref().child("gallery").once("value", function (snapshot) {
      let imageNames = snapshot.val();
      imageNames.push(getName(object.name));
      console.log("Setting gallery using imageName which is: " + imageNames);
      return admin.database().ref().child("gallery").set(imageNames);
    });
  }
});

exports.imageDeleted = functions.storage.object().onDelete((object) => {
  console.log("Running imageDeleted for " + JSON.stringify(object));
});
