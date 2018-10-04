import React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { Button } from 'reactstrap';
import { Container } from 'reactstrap';
import { Form } from 'reactstrap';
import { Col } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Label } from 'reactstrap';
import fire from '../fire';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(fire);
  }

  handleClick = () => {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((arg) => {
      //alert('Signed in with ' + JSON.stringify(arg));
    }, (error) => {
      alert('Failed to sign in: ' + error.message);
    });
  }

  handleUpdateEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleUpdatePassword = (event) => {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="login">
        <Container>
          <h2>Admin Login</h2>
          <Form>
            <Col>
              <FormGroup className="login_email">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="inputEmail"
                  id="inputEmail"
                  placeholder="myemail@email.com"
                  onChange={ this.handleUpdateEmail }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="login_password">
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="inputPassword"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={ this.handleUpdatePassword }
                />
              </FormGroup>
            </Col>
            <Button onClick={ this.handleClick }>Log In</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
