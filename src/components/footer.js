import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import './footer.css';

const Footer = () => {
    return (
      <div style={{backgroundColor: '#f8f9fa'}}>
            <Container style={styles.containerStyle}>
              <br />
              <br />
              <br />
              <Container style={{width: "90%"}}>
                <Row>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Kumo</h5>
                    <p>Kumo is a modern take on delicious Asian cuisine. We are here to satisfy your appetite in a fast casual environment!</p>
                  </Col>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Location</h5>
                    <a href="https://www.google.com/maps/place/Kumo+Asian+Kitchen/@28.6464178,-81.4167963,17z/data=!3m1!4b1!4m5!3m4!1s0x88e77191beca7b59:0x1f6936ccd7178272!8m2!3d28.6464178!4d-81.4146076" className="footerLink" target="_blank">767 South SR 434 Suite 1040<br />Altamonte Springs, Fl 32714</a>
                  </Col>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Contact</h5>
                    <a href="tel:(407) 207-6587" className="footerLink">(407) 270-6587</a>
                  </Col>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Stay Connected</h5>
                    <a href="https://www.facebook.com/Kumo-Asian-Kitchen-422796388126391/" target="_blank"><img src={require('../images/facebook.svg')} width="30" /></a>
                    <a href="https://www.instagram.com/kumosushi2018/" target="_blank"><img src={require('../images/instagram.svg')} width="30" /></a>
                    <a href="https://www.yelp.com/biz/kumo-asian-kitchen-altamonte-springs" target="_blank"><img src={require('../images/yelp.svg')} width="30" /></a>
                  </Col>
                </Row>
              </Container>
                <Row>
                    <Col style={{color: '#000000'}}>© 2018 Team Blue</Col>
                </Row>
                <Row>
                    <Col style={{fontSize: '8px'}}>
                        <a rel="license" href="http://creativecommons.org/licenses/by-nd/2.0/"><img alt="Creative Commons License" style={{borderWidth: 0}} src="https://i.creativecommons.org/l/by-nd/2.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nd/2.0/">Creative Commons Attribution-NoDerivs 2.0 Generic License</a>
                    </Col>
                </Row>
            </Container>
          </div>
    )
};

const styles = {
    containerStyle: {
        fontSize: '12px',
        color: '#000000',
        justifyContent: 'center'
    },
    footerStyle: {
      fontWeight: 600,
      color: '#C42C18'
    }
};

export default Footer;
