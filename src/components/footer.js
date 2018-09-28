import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import Map from './mapbox';

const Footer = () => {
    return (
        <div style={styles.containerStyle}>
        <Container>
            <br />
            <Row>
                <Col sm="4">
                    <h5>About</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi purus, egestas vel tortor eget, vestibulum accumsan metus. Aenean tincidunt sem felis, id vulputate mi consectetur sit amet. Nunc non lobortis turpis. Suspendisse interdum posuere purus et faucibus. Curabitur varius, neque id efficitur dignissim, libero magna malesuada ex, et auctor erat velit a leo. Vivamus in nulla sem. Nunc gravida ex et scelerisque eleifend. In suscipit vestibulum turpis. Aliquam vitae porttitor mauris, sit amet ullamcorper ante. Suspendisse in nunc vitae ex feugiat semper. Ut ultrices feugiat lectus ac maximus.</p>
                </Col>
                <Col sm="4">
                    <h5>Our Location</h5>
                    <Map />
                </Col>
                <Col sm="4">
                    <h5>Business Hours</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td><strong>Monday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Tuesday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Wednesday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Thursday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Friday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Saturday</strong></td>
                                <td>11:00 am - 9:30 pm</td>
                            </tr>
                            <tr>
                                <td><strong>Sunday</strong></td>
                                <td>12:00 am - 9:30 pm</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>© 2018 Team Blue</Col>
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