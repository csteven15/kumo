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
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  handleClick() {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((arg) => {
      alert('Signed in with ' + JSON.stringify(arg));
    }, (error) => {
      alert('Failed to sign in with ' + JSON.stringify(error));
    });
  }

  handleUpdateEmail(event) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.email = event.target.value;
    this.setState(stateCopy);
  }

  handleUpdatePassword(event) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.password = event.target.value;
    this.setState(stateCopy);
  }

  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user == null) {
        alert('Not signed in!');
      } else {
        alert('Signed in as ' + JSON.stringify(user));
      }
    });
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
