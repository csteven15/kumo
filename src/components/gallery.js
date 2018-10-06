import React from 'react';
import { Component } from 'react';
import GridGallery from 'react-grid-gallery';
import './gallery.css';
import Firebase from './../fire';

const storage = Firebase.storage().ref();

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          images: []
        }

        this.getImage = this.getImage.bind(this);

        this.getImage('drinks');
        this.getImage('fish1');
        this.getImage('fish2');
        this.getImage('noodle');
        this.getImage('popcornChicken');
        this.getImage('shrimp');
        this.getImage('sushi');
    }

    getImage(image) {
        storage.child(`/menu/${image}.jpg`).getDownloadURL().then((url) => {
              let img = new Image();
              img.src = url;
              img.onload = () => {
                this.state.images = this.state.images.slice();
                this.state.images.push(
                  {
                      src: url,
                      thumbnail: url,
                      thumbnailWidth: img.width/5,
                      thumbnailHeight: img.height/5
                  }
                );
                this.setState(this.state);
              }
            }).catch((error) => {
            // Handle any errors
        });
    }

    render() {
        return (
          <div className="gallery">
            <GridGallery images={this.state.images} enableImageSelection={false} />
          </div>
        );
    }
}

export default Gallery;
