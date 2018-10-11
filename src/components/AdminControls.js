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
            <Button style={{margin: '5px'}} onClick={this.handleSignOut}>Logout</Button>
            <div>Welcome {this.props.user.email} to Admin page!</div>
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
