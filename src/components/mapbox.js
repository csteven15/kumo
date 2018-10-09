import React, { Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { Button, Container, Row, Col } from 'reactstrap';
import Pin from './pin';
// Marker import

const TOKEN = 'pk.eyJ1IjoiY3N0ZXZlbjE1IiwiYSI6ImNqZW01enFuejBndnIyeHFtMjE2eGJjdWUifQ.ijNpFhnB7y8tdIRqT4fWYw';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 250,
                height: 250,
                latitude: 28.6464178,
                longitude: -81.4146076,
                zoom: 13
            }
        }
    }
    
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col style={styles.mapboxContainer}>
                            <MapGL style={styles.mapboxStyle} {...this.state.viewport} mapStyle="mapbox://styles/csteven15/cje8ysrkab6sv2rmwzdn630ew" onViewportChange={(viewport) => this.setState({viewport})} mapboxApiAccessToken={TOKEN}>
                                <Marker latitude={28.6464178} longitude={-81.4146076} >
                                    <Pin size={30} />
                                </Marker>
                            </MapGL>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button>Directions Here</Button>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        );
    }

}

const styles = {
    mapboxContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    mapboxStyle: {
        textAlign: 'justify',
        width: '100vw',
        height: '100vh'
    }
}

export default Map;