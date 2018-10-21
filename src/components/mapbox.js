import React, { Component} from 'react';
import mapboxgl from 'mapbox-gl'


const TOKEN = 'pk.eyJ1IjoiY3N0ZXZlbjE1IiwiYSI6ImNqZW01enFuejBndnIyeHFtMjE2eGJjdWUifQ.ijNpFhnB7y8tdIRqT4fWYw';
mapboxgl.accessToken = 'pk.eyJ1IjoiY3N0ZXZlbjE1IiwiYSI6ImNqZW01enFuejBndnIyeHFtMjE2eGJjdWUifQ.ijNpFhnB7y8tdIRqT4fWYw';

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
            },
            lat: 28.6464178,
            lng: -81.4146076,
            zoom: 13
        }
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [lng, lat],
          zoom
        });

        const link = 'https://www.google.com/maps/dir//kumo+asian+kitchen+google+maps/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x88e77191beca7b59:0x1f6936ccd7178272?sa=X&ved=2ahUKEwjl-pDa-v7dAhXMqlMKHf5wBFQQ9RcwC3oECAoQEw';


        const popup = new mapboxgl.Popup()
            .setHTML('<div style="color:#000000;"><h5>Kumo Asian Kitchen</h5><p>767 South SR 434<br />Altamonte Springs, Fl 32714</p><a href="' + link + '" target="_blank" >Directions</a></div>')

        var marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);

        map.on('move', () => {
          const { lng, lat } = map.getCenter();

          this.setState({
            lng: lng.toFixed(4),
            lat: lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
          });
        });


    }



    render() {
        return (
            <div style={styles.mapboxContainer}>
                <div ref={el => this.mapContainer = el} style={styles.mapboxStyle} />
            </div>
        );
    }

}

const styles = {
    mapboxContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '100%'
    },
    mapboxStyle: {
        textAlign: 'justify',
        width: '100%',
        height: '100%'
    }
}

export default Map;
