import fire from '../fire';
import React from 'react';
import { Button } from 'reactstrap';

type Props = {
    user: Object,
};

class AdminControls extends React.Component<{},Props> {
  render() {
    return (
        <div style={{ backgroundColor: '#eeeeee' }}>
        <Button onClick={this.handleSignOut}>Logout</Button>
            Welcome {this.props.user.email} to Admin page!
        </div>
    )
  }
  handleSignOut = () => {
    fire.auth().signOut();
  }
};

export default AdminControls;
