import fire from '../fire';
import React from 'react';
import { Button } from 'reactstrap';
import { Col } from 'reactstrap';
import Menu from './menu';
type Props = {
    user: Object,
};

class AdminControls extends React.Component<{},Props> {
  render() {
    return (
        <div style={{ backgroundColor: '#fcfcfc' }}>
          <Col>
          <br/>
            <span>{this.props.user.email}</span> <Button style={{margin: '5px'}} onClick={this.handleSignOut}>Logout</Button>
            <br/>
            <h1>Admin Panel</h1>
            To use the admin panel, simply click "Edit" or "Add" buttons.<br/>
            Any changes you make are only local, until you click the "Save" button to publish changes.

            <Menu isAdmin={true}/>
          </Col>
        </div>

    )
  }
  handleSignOut = () => {
    fire.auth().signOut();
  }
};

export default AdminControls;
