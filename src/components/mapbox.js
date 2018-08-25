import React, { Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiY3N0ZXZlbjE1IiwiYSI6ImNqZW01enFuejBndnIyeHFtMjE2eGJjdWUifQ.ijNpFhnB7y8tdIRqT4fWYw';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 200,
                height: 200,
                latitude: 28.602382,
                longitude: -81.200104,
                zoom: 12
            }
        }
    }
    
    render() {
        const {viewport} = this.state;
        console.log('created maps');
        return (
            <MapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/dark-v9" onViewportChange={(viewport) => this.setState({viewport})} mapboxApiAccessToken={TOKEN}>
            </MapGL>
        );
    }

}

export default Map;