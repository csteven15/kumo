import fire from '../fire';
import React from 'react';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
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
            <Button style={{margin: '5px'}} onClick={this.handleSignOut}>Logout</Button>
            <div>Logged in as: {this.props.user.email}</div><br/>
            To use the admin panel, simply click one of the buttons, or click on any text to edit it.<br/>
            When editting text, hit enter to finish editting, or click the X to remove this item.
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
