import React, { Component} from 'react';
import Fade from 'react-reveal/Fade';
import { Row, Col, Container, Jumbotron, Button } from 'reactstrap';
import Firebase from './../fire';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import Category from './category';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';

const storage = Firebase.storage().ref();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // images: [],
            appetizer: [],
            sushiBurrito: []
        }

    }

    componentWillMount() {
        let database = Firebase.database();
        let appetizerRef = database.ref('menu/0');
        appetizerRef.on('value', (snapshot) => {
            var appetizer = snapshot.toJSON();
            console.log('did mount')
            console.log(appetizer);
            this.setState({appetizer});
        });
        let sushiBurritoRef = database.ref('menu/11');
        sushiBurritoRef.on('value', (snapshot) => {
            var sushiBurrito = snapshot.toJSON();
            this.setState({sushiBurrito});
        });
        // this.getImage('sushi');
        // this.getImage('popcornChicken');
        // this.getImage('drinks');
    }

    // getImage(image) {
    //     storage.child(`/menu/${image}.jpg`).getDownloadURL().then((url) => {
    //       console.log(this.state);
    //         this.setState({images: [...this.state.images, url]});
    //         console.log(this.state);
    //         }).catch((error) => {
    //         // Handle any errors
    //     });
    // }


    miniMenu(data) {
        return <Category data={data} col={"12"} />;
    }

    render() {
        const content = [
            {
                title: 'Vulputate Mollis Ultricies Fermentum Parturient',
                description:
                'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo.',
                button: 'Read More',
                image: require('../images/sushiCarousel.jpg'),
                subDescription: 'Nullam id dolor id nibh ultricies vehicula ut id elit'
            },
            {
                title: 'Tortor Dapibus Commodo Aenean Quam',
                description:
                'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur, porta ac consectetur ac, vestibulum at eros.',
                button: 'Discover',
                image: require('../images/salmonCarousel.jpg'),
                subDescription: 'Aenean eu leo quam'
            },
            {
                title: 'Phasellus volutpat metus',
                description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                button: 'Buy now',
                image: require('../images/chopsticksCarousel.jpg'),
                subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
        ];
        if (this.state.sushiBurrito.length === 0 || this.state.appetizer.length === 0) {
            return (
                <div>
                    <br />
                    <Fade big>
                        <h3 style={{fontFamily: "cursive",fontSize: "16pt",margin: "50px"}}>Loading Home Page...</h3>
                    </Fade>
                </div>
            );
        } else {
            return (
                <div style={{ backgroundColor: '#eeeeee' }}>
                    <div>
                        <Slider autoplay={2000} >
                            {content.map((item, index) => (
                                <div
                                    className="slider-content"
                                    key={index}
                                    style={{ background: `url('${item.image}') no-repeat center` }}
                                >
                                    <br />
                                    <br />
                                    <br />
                                    <div className="inner" style={{color: "#FFFFFF", textShadow: "2px 2px #000000"}}>
                                        <h1><strong>{item.title}</strong></h1>
                                        <p>{item.description}</p>
                                        {/* <button>{item.button}</button> */}
                                    </div>
                                    <div className="inner" style={{color: "#FFFFFF", textShadow: "2px 2px #000000"}}>
                                        <p><strong>{item.subDescription}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <br />
                    <br />
                    <Container>
                        <Row>
                            <Col sm><Fade left><img src={require('../images/storeFront.jpg')} style={styles.image} alt="Store Front" /></Fade></Col>
                            <Col sm><Fade right>
                                <h4>Title</h4>
                                <hr />
                                <h5>Description</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Dignissim diam quis enim lobortis. Laoreet sit amet cursus sit amet dictum sit amet. Auctor augue mauris augue neque gravida in. Ut consequat semper viverra nam libero justo laoreet. Eros donec ac odio tempor orci dapibus ultrices in. Vitae semper quis lectus nulla. Tortor at auctor urna nunc id. At elementum eu facilisis sed odio morbi. Morbi tristique senectus et netus et malesuada. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Ac tincidunt vitae semper quis. Cras ornare arcu dui vivamus arcu felis. Est velit egestas dui id. Neque egestas congue quisque egestas.</p>
                            </Fade></Col>
                        </Row>
                    </Container>
                    <br />
                    <br />
                    <Container>
                        <Row>
                            <Col sm><Fade left>
                                <h4>Title</h4>
                                <hr />
                                <h5>Description</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed magna aliqua. Dignissim convallis aenean et tortor at risus. Ac auctor augue mauris augue neque gravida in fermentum et. Egestas sed sed risus pretium quam vulputate dignissim. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Facilisis magna etiam tempor orci. Vitae aliquet nec ullamcorper sit amet risus nullam. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Arcu risus quis varius quam quisque id. Scelerisque varius morbi enim nunc faucibus a. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Felis bibendum ut tristique et egestas quis. Libero id faucibus nisl tincidunt eget nullam non. Egestas diam in arcu cursus euismod quis viverra nibh cras. Urna porttitor rhoncus dolor purus non enim. Vestibulum morbi blandit cursus risus at. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Quis hendrerit dolor magna eget. Congue quisque egestas diam in arcu cursus euismod quis viverra.</p>
                            </Fade></Col>
                            <Col sm><Fade right><img src={require('../images/insideStore.jpg')} style={styles.image} alt="Inside Store" /></Fade></Col>
                        </Row>
                    </Container>
                    <br />
                    <br />
                    <Parallax bgImage={require('../images/plate.jpg')} blur={{ min: -1, max: 3 }} strength={500}>
                        <div style={{ height: 500 }}>
                            <div style={{background: "#ffffff",padding: 20,position: "absolute",top: "50%",left: "50%",width: "65%",transform: "translate(-50%,-50%)"}}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h4>Opening Hours</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <h5>Monday - Saturday</h5>
                                            <h6>11:00 AM</h6>
                                            <hr />
                                            <h6>9:30 PM</h6>
                                        </Col>
                                        <Col xs="6">
                                            <h5>Sunday</h5>
                                            <h6>12:00 AM</h6>
                                            <hr />
                                            <h6>9:30 PM</h6>
                                        </Col>
                                    </Row>
                                </Container>
    
                            </div>
                        </div>
                    </Parallax>
                    <br />
                    <Container>
                        <Fade top>
                            <h3><strong>Preview of Menu</strong></h3>
                        </Fade>
                      <Row>
                        <Col sm="6">
                          {this.miniMenu(this.state.appetizer)}
                        </Col>
                        <Col sm="6">
                          {this.miniMenu(this.state.sushiBurrito)}
                        </Col>
                      </Row>
                    </Container>
                    <br />
                    <Fade bottom>
                        <Link to="/menu" style={{textDecoration: "none", color: "#ffffff"}}>
                            <Button>
                                View Whole Menu
                            </Button>
                        </Link>
                    </Fade>
                    <br />
                    <br />
                    
                </div>
            );
        }
    }
}

const styles = {
    image: {
        width: '400px',
        height: '400px'
    }
};

export default Home;
