import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Map from './mapbox';
import Fade from 'react-reveal/Fade';
import './contact.css';
import MediaQuery from 'react-responsive';

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
                    <h3 style={{fontFamily: "gangOf3",fontSize: "16pt",margin: "50px"}}>Loading Maps...</h3>
                  </Fade>
                </div>
            );
        } else {
            return (
                <div className="contact">
                  <br />
                  <br />

                  <MediaQuery query="(min-width: 768px)">
                    <Container>
                      <Row>
                        <Col sm="5" style={{textAlign: "left"}}>
                          <h1 style={{color: '#C42C18',fontWeight: 'bold',fontFamily: 'gangOf3'}}><span className="heading">Contact Us</span></h1>
                          <h4 style={styles.subHeading}>Location</h4>
                          <a rel="noopener noreferrer" href="https://www.google.com/maps/place/Kumo+Asian+Kitchen/@28.6464178,-81.4167963,17z/data=!3m1!4b1!4m5!3m4!1s0x88e77191beca7b59:0x1f6936ccd7178272!8m2!3d28.6464178!4d-81.4146076" className="footerLink" target="_blank"><h6>Kumo Asian Kitchen<br />767 South SR 434 Suite 1040<br />Altamonte Springs, Fl 32714</h6></a>
                          <br />
                          <h4 style={styles.subHeading}>Phone</h4>
                          <a href="tel:(407) 207-6587" className="footerLink"><h6>(407) 270-6587</h6></a>
                          <br />
                          <h4 style={styles.subHeading}>Opening Hours</h4>
                          <Row>
                            <Col xs="6">
                              <h6 style={styles.dates}>Monday - Saturday</h6>
                              <h6>11:00 AM to 9:30 PM</h6>
                            </Col>
                            <Col xs="6">
                              <h6 style={styles.dates}>Sunday</h6>
                              <h6>Closed</h6>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs="7">
                          <div className="contactMapContainer">
                            <Map />
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </MediaQuery>

                  <MediaQuery query="(max-width: 768px)">
                    <Container>
                      <Row>
                        <Col sm="12" style={{textAlign: "left"}}>
                        <h1 style={{color: '#C42C18',fontWeight: 'bold',fontFamily: 'gangOf3'}}><span className="heading">Contact Us</span></h1>
                          <h4 style={styles.subHeading}>Location</h4>
                          <a rel="noopener noreferrer" href="https://www.google.com/maps/place/Kumo+Asian+Kitchen/@28.6464178,-81.4167963,17z/data=!3m1!4b1!4m5!3m4!1s0x88e77191beca7b59:0x1f6936ccd7178272!8m2!3d28.6464178!4d-81.4146076" className="footerLink" target="_blank"><h6>Kumo Asian Kitchen<br />767 South SR 434 Suite 1040<br />Altamonte Springs, Fl 32714</h6></a>
                          <br />
                          <h4 style={styles.subHeading}>Phone</h4>
                          <a href="tel:(407) 270-6587" className="footerLink"><h6>(407) 270-6587</h6></a>
                          <br />
                          <h4 style={styles.subHeading}>Opening Hours</h4>
                          <Row>
                            <Col xs="6">
                              <h6 style={styles.dates}>Monday - Saturday</h6>
                              <h6>11:00 AM to 9:30 PM</h6>
                            </Col>
                            <Col xs="6">
                              <h6 style={styles.dates}>Sunday</h6>
                              <h6>Closed</h6>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs="12">
                          <div className="contactMapContainer">
                            <Map />
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </MediaQuery>

                  <br />
                  <br />
                </div>
            );
        }
    }
};
// #212529
const styles = {
  subHeading: {
    fontWeight: 600
  },
  dates: {
    fontWeight: 600
  }
};

export default Contact;
