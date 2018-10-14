import React from 'react';
import { Component } from 'react';
import GridGallery from './react-grid-gallery-modified/Gallery';
import './gallery.css';
import Firebase from './../fire';
import Fade from 'react-reveal/Fade';

const storage = Firebase.storage().ref();

const imageNames = ["FullSizeRender", "FullSizeRender 1", "drinks", "fish1", "fish2", "noodle", "popcornChicken", "shrimp", "sushi", "FullSizeRender 2", "FullSizeRender 3", "IMG_1539", "IMG_1540", "IMG_1541", "IMG_1565", "IMG_1566", "IMG_1568", "IMG_1575"];
let imagesLoaded = [];

function logFirebaseError(firebaseError) {
  console.log("An error occurred: " + firebaseError.message);
}

function allImagesLoaded() {
  return imagesLoaded.length === imageNames.length;
}

function compareImages(a, b) {
  return a.sortOrder - b.sortOrder;
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          images: []
        }
    }

    componentWillMount() {
      console.log("Called componentWillMount");

      // Did we already load the images before? (Happens if we switch out of Gallery page and then back into it)
      if (allImagesLoaded()) {
        console.log("State set on reentry");
        // We are done!
        this.setState({ images: imagesLoaded });
      } else {
        // For each of the image names, we want to get the image's download URL
        // and then the image's thumbnail download url and width and height. On
        // the last image being loaded, we want to present the gallery.
        imageNames.forEach((element, index, array) => {
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
                imagesLoaded.push(
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
                console.log("imagesLoaded at " + imagesLoaded.length);
                if (allImagesLoaded()) {
                  console.log("State set on " + element);
                  imagesLoaded.sort(compareImages);
                  // We are done!
                  this.setState({ images: imagesLoaded });
                }
              };
            }).catch(logFirebaseError);
          }).catch(logFirebaseError);
        }, this);
      }
    }

    render() {
      if (allImagesLoaded()) {
        console.log("All images loaded rendering!");
        return (
          <div className="gallery">

            <GridGallery images={this.state.images} rowHeight={250} margin={6} enableImageSelection={false} showLightboxThumbnails={false}/>

          </div>
        );
      } else {
        console.log("Loading rendering!");
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
