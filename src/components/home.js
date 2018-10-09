import React, { Component} from 'react';
import Fade from 'react-reveal/Slide';
import { Row, Col, Container, Jumbotron } from 'reactstrap';
import Firebase from './../fire';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import Category from './category';


const storage = Firebase.storage().ref();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks: '',
            popcornChicken: '',
            sushi: '',
            appetizer: [],
            sushiBurrito: []
        }

        this.getImage('sushi');
        this.getImage('popcornChicken');
        this.getImage('drinks');

    }

    componentWillMount() {
        let database = Firebase.database();
        let appetizerRef = database.ref('menu/0');
        appetizerRef.on('value', (snapshot) => {
            var appetizer = snapshot.toJSON();
            this.setState({appetizer});
        });
        let sushiBurritoRef = database.ref('menu/11');
        sushiBurritoRef.on('value', (snapshot) => {
            var sushiBurrito = snapshot.toJSON();
            this.setState({sushiBurrito});
        });
        // appetizer.set(this.state.appetizer);
        console.log(this.state);
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

    miniMenu(appetizer, sushiBurrito) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="6">
                            <Category data={appetizer} />
                        </Col>
                        <Col sm="6">
                            <Category data={sushiBurrito} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
        
    }


    render() {
        const content = [
            {
                title: 'Vulputate Mollis Ultricies Fermentum Parturient',
                description:
                'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo.',
                button: 'Read More',
                image: 'https://picsum.photos/1500/800?image=460',
                subDescription: 'Nullam id dolor id nibh ultricies vehicula ut id elit'
            },
            {
                title: 'Tortor Dapibus Commodo Aenean Quam',
                description:
                'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur, porta ac consectetur ac, vestibulum at eros.',
                button: 'Discover',
                image: 'https://picsum.photos/1500/800?image=999',
                subDescription: 'Aenean eu leo quam'
            },
            {
                title: 'Phasellus volutpat metus',
                description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                button: 'Buy now',
                image: 'https://picsum.photos/1500/800?image=1080',
                subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
        ];
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
                        <Col sm><Fade left><img src="https://picsum.photos/500/500/?image=835" style={styles.image} /></Fade></Col>
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
                        <Col sm><Fade right><img src="https://picsum.photos/500/500/?image=429" style={styles.image} /></Fade></Col>
                    </Row>
                </Container>
                {/* <Container>
                    {this.miniMenu(this.state.appetizer,this.state.sushiBurrito)}
                </Container> */}
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