import React from 'react';
import './style.css';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    message: '',
  };



  handleChange = ({ target: { value, name } }) =>
  {
      this.setState({ [name]: value });
    // console.log(this.state);

  }
    
    

  render() {
    const { username, password, message } = this.state;

    return (
      <Container>
        <Form className="content-login">
          <span className="content-login__word-login">Login</span>
          <Form.Group
            controlId="formBasicUsername"
            className="content-login__input "
          >
            <Form.Label>Username : </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-login__input "
          >
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <p className="message">{message}</p>
          <Button
            type="button"
            className="content-login__submit"
          >
            Login
          </Button>
          <Form.Text className="content-login__text-muted">
            Don’t have an account?{' '}
            <span className="content-login__word-signup">
              <Link to="/signup">Sign Up</Link>
            </span>
          </Form.Text>
        </Form>
      </Container>
    );
  }
}
