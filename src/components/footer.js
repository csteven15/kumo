import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';


const Footer = () => {
    return (
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
                    <p>767 South SR 434 Suite 1040<br />Altamonte Springs, Fl 32714</p>
                  </Col>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Contact</h5>
                    <p>(407) 270-6587</p>
                  </Col>
                  <Col xs="3" style={{textAlign: "left"}}>
                    <h5 style={styles.footerStyle}>Stay Connected</h5>
                    <img src={require('../images/facebook.svg')} width="30" />
                    <img src={require('../images/instagram.svg')} width="30" />
                    <img src={require('../images/yelp.svg')} width="30" />
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
    )
};

const styles = {
    containerStyle: {
        fontSize: '12px',
        backgroundColor: '#ffffff',
        color: '#000000',
        justifyContent: 'center'
    },
    footerStyle: {
      fontWeight: 600,
      color: '#C42C18'
    }
};

export default Footer;
