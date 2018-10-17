import React from 'react';
import { Component } from 'react';
import GridGallery from './react-grid-gallery-modified/Gallery';
import './gallery.css';
import Firebase from './../fire';
import Fade from 'react-reveal/Fade';

const storage = Firebase.storage().ref();

const imageNames = ["FullSizeRender", "FullSizeRender 1", "drinks", "fish1", "fish2", "noodle", "popcornChicken", "shrimp", "sushi", "FullSizeRender 2", "FullSizeRender 3", "IMG_1539", "IMG_1540", "IMG_1541", "IMG_1565", "IMG_1566", "IMG_1568", "IMG_1575"];

function logFirebaseError(firebaseError) {
  console.log("An error occurred: " + firebaseError.message);
}

function compareImages(a, b) {
  return a.sortOrder - b.sortOrder;
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.getNumberOfImagesToLoad = this.getNumberOfImagesToLoad.bind(this);
        this.allImagesLoaded = this.allImagesLoaded.bind(this);
        this.imagesLoaded = [];
        this.state = {
          images: []
        }
    }

    getNumberOfImagesToLoad() {
      let imagesToLoad = this.props.numImages;
      if (imagesToLoad == undefined || imagesToLoad == null) {
        imagesToLoad = imageNames.length;
      }
      if (imagesToLoad > imageNames.length) {
        imagesToLoad = imageNames.length;
      }
      return imagesToLoad;
    }

    allImagesLoaded() {
      return this.imagesLoaded.length === this.getNumberOfImagesToLoad();
    }

    componentWillMount() {
      console.log("Called componentWillMount");

      // Did we already load the images before? (Happens if we switch out of Gallery page and then back into it)
      if (this.allImagesLoaded()) {
        console.log("State set on reentry");
        // We are done!
        this.setState({ images: this.imagesLoaded });
      } else {
        // For each of the image names, we want to get the image's download URL
        // and then the image's thumbnail download url and width and height. On
        // the last image being loaded, we want to present the gallery.
        imageNames.forEach((element, index, array) => {
          // We want to only load the number of images we were told to display
          // by our props. If no prop was given, then assume loading them all is
          // the intended outcome.

          if (index >= this.getNumberOfImagesToLoad()) {
            console.log("Not loading image with index " + index + " since props instructed the component to only load " + this.getNumberOfImagesToLoad() + " images.");
            return;
          }

          storage.child("menu").child(element + ".jpg").getDownloadURL().then((primaryURL) => {
            console.log("Got primaryURL for " + element);
            storage.child("menu").child(element + "_thumbnail.jpg").getDownloadURL().then((thumbnailURL) => {
              console.log("Got thumbnailURL for " + element);
              let thumbnailPrefetch = new Image();
              thumbnailPrefetch.src = thumbnailURL;
              thumbnailPrefetch.onload = () => {
                console.log("Thumbnail prefetched for " + element);
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
                console.log("imagesLoaded at " + this.imagesLoaded.length);
                if (this.allImagesLoaded()) {
                  console.log("State set on " + element);
                  this.imagesLoaded.sort(compareImages);
                  // We are done!
                  this.setState({ images: this.imagesLoaded });
                }
              };
            }).catch(logFirebaseError);
          }).catch(logFirebaseError);
        }, this);
      }
    }

    render() {
      if (this.allImagesLoaded()) {
        console.log("Final gallery is rendering!");
        return (
          <div className="gallery">

            <GridGallery images={this.state.images} rowHeight={250} margin={6} enableImageSelection={false} showLightboxThumbnails={false}/>

          </div>
        );
      } else {
        console.log("Loading message is rendering!");
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
