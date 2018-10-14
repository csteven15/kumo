import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';


const Footer = () => {
    return (
        <div style={styles.containerStyle}>
            <Container>
                <Row>
                    <Col>© 2018 Team Blue</Col>
                </Row>
                <Row>
                    <Col>
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
        backgroundColor: '#212529',
        color: '#FFFFFF'
    }
};

export default Footer;