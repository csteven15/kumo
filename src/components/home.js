import React from 'react';
import { Component } from 'react';
import Mapbox from './mapbox';
import { Button } from 'reactstrap';
import fire from '../fire';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.dataStuff = {};
  }

  componentWillMount() {
    fire.database().ref('/').on('value', (snapshot) => {
      this.state.dataStuff = snapshot;
      this.setState(this.state);
    });
  }

  render() {
    return (
      <div>
        <h1>Home Component</h1>
        <p>
          The data currently looks like:
          { JSON.stringify(this.state.dataStuff) }
        </p>
        <Mapbox />
        <Button color="primary" size="sm" onClick={ () => { fire.database().ref('testPushing').push({name: "Philip", lname: "Rodrigo"}); alert('pushed'); } }>Test Button</Button>
      </div>
    );
  }
}

export default Home;
