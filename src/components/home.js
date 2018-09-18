import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import { UncontrolledCarousel, Jumbotron, Row, Col, Container} from 'reactstrap';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";

const items = [
    {
        src: 'https://picsum.photos/800/500/?image=3',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://picsum.photos/800/500/?image=2',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://picsum.photos/800/500/?image=1',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
    ];

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
    };
    return (
        <div style={{ backgroundColor: '#eeeeee' }}>
            <div>
            <Slider {...settings}>
                <div>
                    <img src="https://picsum.photos/1200/500/?image=99" style={{objectFit:'cover'}}/>
                    <Slide down>
                        <h2>Kumo Asian Kitchen</h2>
                    </Slide>
                    <Slide up>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing.</h4>
                    </Slide>
                </div>
                <div>
                    <Slide down>
                        <h2>Kumo Asian Kitchen</h2>
                    </Slide>
                    <br />
                    <br />
                    <Slide up>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing.</h4>
                    </Slide>
                </div>
                <div>
                    <Slide down>
                        <h2>Kumo Asian Kitchen</h2>
                    </Slide>
                    <br />
                    <br />
                    <Slide up>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing.</h4>
                    </Slide>
                </div>
            </Slider>
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
        </div>
    )
};

const styles = {
    image: {
        width: '350px',
        height: '350px'
    }
};

export default Home;