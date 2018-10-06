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
          images: [
            {
                  src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                  thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                  thumbnailWidth: 320,
                  thumbnailHeight: 174
            }
          ]
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
            this.state.images = this.state.images.slice();
            this.state.images.push(
              {
                  src: url,
                  thumbnail: url,
                  thumbnailWidth: 320,
                  thumbnailHeight: 174
              }
            );
            this.setState(this.state);
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
