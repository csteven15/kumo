import AdminControls from './AdminControls';
import fire from '../fire';
import Login from './login';
import React from 'react';
import { Fade } from 'reactstrap';

type State = {
  user: ?Object,
  hasLoaded: boolean,
};

class AdminPage extends React.Component<State> {
  state = {
    user: null,
    hasLoaded: false,
  }
  render() {
    if (!this.state.hasLoaded) {
      return (
        <div><br/>
          <Fade big>
              <h3 style={{fontFamily: "cursive",fontSize: "16pt",margin: "50px"}}>Loading Admin Panel...</h3>
          </Fade>
        </div>
      );
    }
    if (this.state.user == null) {
      return <Login />;
    }
    return <AdminControls user={this.state.user} />;
  }

  componentWillMount() {
    console.log(fire.auth());
    fire.auth().onAuthStateChanged((user) => {
      /*if (user == null) {
        alert('Not signed in!');
      } else {
        alert('Signed in as ' + JSON.stringify(user));
      }*/
      this.setState({user, hasLoaded: true});
    });
  }
};

export default AdminPage;
