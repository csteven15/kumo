import React from 'react';
import { Component } from 'react';
import GridGallery from './react-grid-gallery-modified/Gallery';
import './gallery.css';
import Firebase from './../fire';
import Fade from 'react-reveal/Fade';

const database = Firebase.database().ref();
const storage = Firebase.storage().ref();

/**
* This function exists solely to make it easy to disable the debug message
* output. This allows commenting out or guarding in one place to disable console
* debug output.
*/
function debugLog(message) {
  console.log(message);
}

/**
* This function exists to be used as the argument to firebase Promise's catch
* method. (e.g. Promie.then(...).catch(logFirebaseError);)
*/
function logFirebaseError(firebaseError) {
  debugLog("An error occurred: " + firebaseError.message);
}

/**
* This method is used to help sort the otherwise asynchronously-loaded images.
*/
function compareImages(a, b) {
  return a.sortOrder - b.sortOrder;
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.getNumberOfImagesToLoad = this.getNumberOfImagesToLoad.bind(this);
        this.allImagesLoaded = this.allImagesLoaded.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.imageNames = { length: 999999999 };
        this.imagesLoaded = [];
        this.state = {
          images: []
        }
    }

    /**
    * This method should return the number of images that are intended to be
    * shown by this gallery component, taking into consideration the numImages
    * prop and the number of available images.
    */
    getNumberOfImagesToLoad() {
      let imagesToLoad = this.props.numImages;
      if (imagesToLoad === undefined || imagesToLoad == null) {
        imagesToLoad = this.imageNames.length;
      }
      if (imagesToLoad > this.imageNames.length) {
        imagesToLoad = this.imageNames.length;
      }
      return imagesToLoad;
    }

    /**
    * This mehtod should return true iff the gallery images to be shown have
    * had their thumbnails loaded and the this.imagesLoaded array is ready to be
    * fed into the react-grid-gallery component.
    */
    allImagesLoaded() {
      return this.imagesLoaded.length === this.getNumberOfImagesToLoad();
    }

    /**
    * This method does most of the heavy lifting. It loads all needed resources
    * from firebase's database and storage and populates and updates state
    * information.
    */
    componentWillMount() {
      debugLog("Called componentWillMount");

      // Did we already load the images before? (Happens if we switch out of Gallery page and then back into it)
      if (this.allImagesLoaded()) {
        debugLog("State set on reentry");
        // We are done!
        this.setState({ images: this.imagesLoaded });
      } else {
        // Fetch all image names from the database!
        database.child("gallery").once('value').then((snapshot) => {
          this.imageNames = snapshot.val();
          debugLog("Successfully fetched imageNames from database: " + this.imageNames);

          // For each of the image names, we want to get the image's download URL
          // and then the image's thumbnail download url and width and height. On
          // the last image being loaded, we want to present the gallery.
          this.imageNames.forEach((element, index, array) => {
            // We want to only load the number of images we were told to display
            // by our props. If no prop was given, then assume loading them all is
            // the intended outcome.

            if (index >= this.getNumberOfImagesToLoad()) {
              debugLog("Not loading image with index " + index + " since props instructed the component to only load " + this.getNumberOfImagesToLoad() + " images.");
              return;
            }

            storage.child("menu").child(element + ".jpg").getDownloadURL().then((primaryURL) => {
              debugLog("Got primaryURL for " + element);
              storage.child("menu").child(element + "_thumbnail.jpg").getDownloadURL().then((thumbnailURL) => {
                debugLog("Got thumbnailURL for " + element);
                let thumbnailPrefetch = new Image();
                thumbnailPrefetch.src = thumbnailURL;
                thumbnailPrefetch.onload = () => {
                  debugLog("Thumbnail prefetched for " + element);
                  // Now we know thumbnail width and height, we can construct our
                  // imagesLoaded array.
                  this.imagesLoaded.push(
                    {
                      sortOrder: index,
                      src: primaryURL,
                      thumbnail: thumbnailURL,
                      thumbnailWidth: thumbnailPrefetch.width,
                      thumbnailHeight: thumbnailPrefetch.height
                    }
                  );

                  // If we just finished loading the last image, then put it into
                  // our state so we refresh the view!
                  debugLog("imagesLoaded at " + this.imagesLoaded.length);
                  if (this.allImagesLoaded()) {
                    debugLog("State set on " + element);
                    this.imagesLoaded.sort(compareImages);
                    // We are done!
                    this.setState({ images: this.imagesLoaded });
                  }
                };
              }).catch(logFirebaseError);
            }).catch(logFirebaseError);
          }, this);
        }).catch(logFirebaseError);
      }
    }

    renderTitle() {
      if (this.props.title === true) {
        return (
          <h2 style={{color: "#C42C18"}}><strong>Gallery</strong></h2>
        );
      }
    }

    render() {
      if (this.allImagesLoaded()) {
        debugLog("Final gallery is rendering!");
        return (
          <div className="gallery">
            <br />
            {this.renderTitle()}
            <GridGallery images={this.state.images} rowHeight={250} margin={6} enableImageSelection={false} showLightboxThumbnails={false} numRows={this.props.numRows}/>

          </div>
        );
      } else {
        debugLog("Loading message is rendering!");
        return (
          <div className="gallery">
            <Fade big>
              <p className="loadingText">Preparing delicious dishes...</p>
            </Fade>
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        );
      }
    }
}

export default Gallery;
