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
import './home.css';
import Gallery from './gallery';
import MapBox from './mapbox';

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
                title: 'Kumo Asian Kitchen',
                description: '767 South SR 434',
                button: 'Read More',
                image: require('../images/sushiCarousel.jpg'),
                subDescription: 'Altamonte Springs, FL 32714'
            },
            {
                title: '14 Different Types of Sushi!',
                description: '',
                button: 'Buy now',
                image: require('../images/chopsticksCarousel.jpg'),
                subDescription: 'Check out our menu for details'
            },
			{
                title: 'Place an order today!',
                description: '',
                button: 'Discover',
                image: require('../images/salmonCarousel.jpg'),
                subDescription: '(407)270-6587'
            },
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
                <div style={{ backgroundColor: '#ffffff' }}>
                  <div>
                    <Slider autoplay={2000} className="slider" >
                      {content.map((item, index) => (
                        <div
                          className="slider-content"
                          key={index}
                          style={{ background: `url('${item.image}') no-repeat center` }}
                        >
                          <br />
                          <br />
                          <br />
                          <div className="inner" style={{color: "#FFFFFF"}}>
                            <h1 style = {{ textShadow: "2px 2px #000000"}}><strong>{item.title}</strong></h1>
                            <p><strong>{item.description}</strong></p>
                            {/* <button>{item.button}</button> */}
                          </div>
                          <div className="inner" style={{color: "#FFFFFF"}}>
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
                      <Col sm="4"><Fade left><img src={require('../images/storeFront.jpg')} style={styles.image} alt="Store Front" /></Fade></Col>
                      <Col sm="8"><Fade right>
                        <h4 style={styles.headingText}><span className="heading">Authentic Asian Food Done Right!</span></h4>
                        <br />
                        <p>Looking for a quick bite to eat but don't want to compromise on taste and quality. Look no further than Kumo Asian Kitchen located directly across from Seminole State College Altamonte Springs Campus. A great place for sushi, hibachi, and bento. The reviews are in and Kumo Asian Kitchen is one of the top Asian Food restaurants in the Orlando area.</p>
                      </Fade></Col>
                    </Row>
                  </Container>
                  <br />
                  <br />
                  <Container>
                    <Row>
                      <Col sm="8"><Fade left>
                        <h4 style={styles.headingText}><span className="heading">Fresh and Local Ingredients</span></h4>
                        <br />
                        <p> Our ingredients are delivered straight from farms located all throughout Florida. We are not scared to hide what we cook with, at Kumo Asian Kitchen we cook in plain site right behind the counter so you can always be sure we are using ingredients that are up to par. We believe that farm fresh ingredients enhance our food and make us the best Asian Kitchen in Florida. Come in today and experience all that your new favorite Asian restaurant has to offer.</p>
                      </Fade></Col>
                      <Col sm="4"><Fade right><img src={require('../images/insideStore.jpg')} style={styles.image} alt="Inside Store" /></Fade></Col>
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
                      <h2 style={styles.headingText}><span className="heading">Preview of Menu</span></h2>
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
                  <h3 style={styles.headingText}><span className="heading">Gallery</span></h3>
                  <Gallery title={false} numRows={2} />
                  <br />
                  <Container>
                    <h3 style={styles.headingText}><span className="heading">Contact</span></h3>
                    <h4><strong>767 S State Rd 434 Suite 1040, Altamonte Springs, FL 32714</strong></h4>
                  </Container>
                  <MapBox />
                </div>
            );
        }
    }
}

const styles = {
    image: {
        width: '300px',
        height: '300px'
    },
    headingText: {
        color: '#C42C18',
        fontWeight: 'bold'
    }
};

export default Home;
