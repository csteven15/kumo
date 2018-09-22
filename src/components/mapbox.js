import React, { Component} from 'react';
import MapGL from 'react-map-gl';
// Marker import

const TOKEN = 'pk.eyJ1IjoiY3N0ZXZlbjE1IiwiYSI6ImNqZW01enFuejBndnIyeHFtMjE2eGJjdWUifQ.ijNpFhnB7y8tdIRqT4fWYw';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 250,
                height: 250,
                latitude: 28.602382,
                longitude: -81.200104,
                zoom: 12
            }
        }
    }
    
    render() {
        return (
            <div style={styles.mapboxContainer}>
                <MapGL style={styles.mapboxStyle} {...this.state.viewport} mapStyle="mapbox://styles/csteven15/cje8ysrkab6sv2rmwzdn630ew" onViewportChange={(viewport) => this.setState({viewport})} mapboxApiAccessToken={TOKEN}>
                </MapGL>
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