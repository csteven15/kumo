import React, { Component} from 'react';
import Slide from 'react-reveal/Slide';
import { Row, Col, Container} from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Firebase from './../fire';

const storage = Firebase.storage().ref();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks: '',
            popcornChicken: '',
            sushi: ''
        }

        this.getImage('sushi');
        this.getImage('popcornChicken');
        this.getImage('drinks');

    }

    getImage(image) {
        let { state } = this;
        storage.child(`/menu/${image}.jpg`).getDownloadURL().then((url) => {
            state[image] = url
            this.setState(state)
            }).catch((error) => {
            // Handle any errors
        });
    }


    render() {
        return (
            <div style={{ backgroundColor: '#eeeeee' }}>
                <div>
                    <Carousel showThumbs={false} showStatus={false} autoPlay>
                        <div>
                            <img src={this.state.sushi} width="100" height="600" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src={this.state.popcornChicken} width="100" height="600" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src={this.state.drinks} width="100" height="600" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                </div>
                <br />
                <br />
                <Container>
                    <Row>
                        <Col sm><Slide left><img src="https://picsum.photos/500/500/?image=99" style={styles.image} /></Slide></Col>
                        <Col sm><Slide right>
                            <h4>Description</h4>
                            <hr />
                            <h5>Sub Description</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Dignissim diam quis enim lobortis. Laoreet sit amet cursus sit amet dictum sit amet. Auctor augue mauris augue neque gravida in. Ut consequat semper viverra nam libero justo laoreet. Eros donec ac odio tempor orci dapibus ultrices in. Vitae semper quis lectus nulla. Tortor at auctor urna nunc id. At elementum eu facilisis sed odio morbi. Morbi tristique senectus et netus et malesuada. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Ac tincidunt vitae semper quis. Cras ornare arcu dui vivamus arcu felis. Est velit egestas dui id. Neque egestas congue quisque egestas.</p>
                        </Slide></Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container>
                    <Row>
                        <Col sm><Slide left>
                            <h4>Description</h4>
                            <hr />
                            <h5>Sub Description</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed magna aliqua. Dignissim convallis aenean et tortor at risus. Ac auctor augue mauris augue neque gravida in fermentum et. Egestas sed sed risus pretium quam vulputate dignissim. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Facilisis magna etiam tempor orci. Vitae aliquet nec ullamcorper sit amet risus nullam. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Arcu risus quis varius quam quisque id. Scelerisque varius morbi enim nunc faucibus a. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Felis bibendum ut tristique et egestas quis. Libero id faucibus nisl tincidunt eget nullam non. Egestas diam in arcu cursus euismod quis viverra nibh cras. Urna porttitor rhoncus dolor purus non enim. Vestibulum morbi blandit cursus risus at. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Quis hendrerit dolor magna eget. Congue quisque egestas diam in arcu cursus euismod quis viverra.</p>
                        </Slide></Col>
                        <Col sm><Slide right><img src="https://picsum.photos/500/500/?image=100" style={styles.image} /></Slide></Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        <Col sm="4">
                            <p>testtest test        </p>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        )
    }
    
}

const styles = {
    image: {
        width: '350px',
        height: '350px'
    }
};

export default Home;