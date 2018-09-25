import AdminControls from './AdminControls';
import fire from '../fire';
import Login from './login';
import React from 'react';

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
      return <div>Loading...</div>;
    }
    if (this.state.user == null) {
      return <Login />;
    }
    return <AdminControls user={this.state.user} />;
  }

  componentWillMount() {
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
