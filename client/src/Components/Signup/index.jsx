import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import signupValidation from './validate-schema';
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

   }
   handleClick = e => {
    console.log(11111111111);
    
    e.preventDefault();
    const { setUserInfo } = this.props;
    const { username, password, email, confPassword } = this.state;
    this.setState({ errormsg: '' });
    signupValidation
      .validate(
        {
          email,
          password,
          confPassword,
          username,
        },
        { abortEarly: false }
      )
      .then(() => {
        console.log(2222222222);
        fetch('/api/v1/members', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
               'Content-Type': 'application/json',
          },Accept:'application/json',
          body: JSON.stringify({ username, email, password }),
        })
          .then(res =>{ 
            console.log('111111',res);
            
           return res.json()
          })
          .then(response => {
            console.log('response post in this link fetch (b,f)',response);
            
            if (response.data) {
              localStorage.setItem(
                'userInfo',
                JSON.stringify(response.data[0])
              );
              // auth.isAuthenticated = true;
              setUserInfo(response.data);
              this.props.history.push('/home');
            } else {
              this.setState({ errormsg: response.error.msg });
            }
          })
          .catch(err => console.log(err)
          );
      })
          .catch(({ inner }) => {
        if (inner) {
          const errors = inner.reduce(
            (acc, item) => ({ ...acc, [item.path]: item.message }),
            {}
          
            );
            
          this.setState({ errormsg: { ...errors } },()=>{
            console.log(this.state.errormsg);
            
          });
          
        }
      });
  };
  render() {
    console.log(this.state);

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
            onClick={this.handleClick}
          >
            signup
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