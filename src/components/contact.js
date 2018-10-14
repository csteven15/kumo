import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import Map from './mapbox';
import Fade from 'react-reveal/Fade';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({render: true});
        }.bind(this), 100);
    }

    render() {
        if (this.state.render === false) {
            return (
                <div>
                    <br />
                    <Fade big>
                        <h3 style={{fontFamily: "cursive",fontSize: "16pt",margin: "50px"}}>Loading Maps...</h3>
                    </Fade>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <br />
                    <Container>
                        <Row>
                            <Col sm="5" style={{textAlign: "left"}}>
                                <h3><strong>Contact Kumo Asian Kitchen</strong></h3>
                                <h4>Address</h4>
                                <h5>Kumo Asian Kitchen</h5>
                                <h6>767 South SR 434<br />Altamonte Springs, Fl 32714</h6>
                                <h6>Tel: (407) 270-6587</h6>
                                <br />
                                <h4>Opening Hours</h4>
                                <Row>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <h5>Monday - Saturday</h5>
                                        <h6>11:00 AM to 9:30 PM</h6>
                                    </Col>
                                    <Col xs="6">
                                        <h5>Sunday</h5>
                                        <h6>12:00 AM to 9:30 PM</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="7">
                                <Map />
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <br />
                </div>
            );
        }
    }
};
// #212529

export default Contact;