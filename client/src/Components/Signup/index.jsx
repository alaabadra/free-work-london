import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Form, Button } from 'react-bootstrap';

export default class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
    errormsg: '',
  };



  handleChange = ({ target: { value, name } }) =>
  {
      this.setState({ [name]: value });
    console.log(this.state);

   }

  render() {
    const { username, email, password, confPassword, errormsg } = this.state;
    return (
      <>
        <Form className="content-signup">
          <h2 className="content-signup__word-sigup">Sign Up</h2>
          <Form.Group
            controlId="formBasicUsername"
            className="content-signup__username"
          >
            <Form.Label>
              Username :{' '}
              <span className="content-signup__username-star">*</span>
            </Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={this.handleChange}
              type="username"
              placeholder="e.g: emily1234"
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicEmail"
            className="content-signup__email"
          >
            <Form.Label>
              E-mail : <span className="content-signup__email-star">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={this.handleChange}
              type="email"
              placeholder="example@mail.com"
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__password"
          >
            <Form.Label>
              Password :{' '}
              <span className="content-signup__password-star">*</span>
            </Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__confirm-password"
          >
            <Form.Label>
              Confirm Password :{' '}
              <span className="content-signup__confirm-password-star">*</span>
            </Form.Label>
            <Form.Control
              name="confPassword"
              value={confPassword}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
            
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="content-signup__submit"
          >
            Submit
          </Button>
          <Form.Text className="content-signup__text-muted">
            Already have an account?{' '}
            <Link to="/login" className="content-signup__word-login">
              Login
            </Link>
          </Form.Text>
        </Form>
      </>
    );
  }
}