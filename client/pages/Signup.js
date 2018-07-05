import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { pick } from 'lodash';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    errors: null
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onChangeConfirm = (e) => {
    this.setState({ confirm: e.target.value });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = pick(this.state, ['username', 'email', 'password', 'confirm']);
    // Check password and confirm inputs
    if(this.state.password !== this.state.confirm) {
      this.setState({ errors: { con: "Password doesn't match" }})
      return;
    }
    // Create new user
    axios.post('/api/users', user)
      .then(response => {
        // Sign up
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { username, email, password, confirm, errors } = this.state;

    return (
      <section className="singup">
        <h1>Sign up</h1>
        { errors &&
          Object.keys(errors).map((error, index) => <p key={index}>{errors[error]}</p>)
        }
        <form className="signup-form" action="post">
          <div className="signup-form__field">
            <input 
              id="username" 
              type="text" 
              className="signup-form__field--username" 
              name="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="signup-form__field">
            <input 
              id="email" 
              type="email" 
              className="signup-form__field--email" 
              name="email"
              value={email}
              onChange={this.onChangeEmail}
            />
            <label htmlFor="email">E-Mail</label>
          </div>
          <div className="signup-form__field">
            <input 
              id="password" 
              type="password" 
              className="signup-form__field--password" 
              name="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="signup-form__field">
            <input
              id="confirm" 
              type="password" 
              className="signup-form__field--confirm" 
              name="confirm"
              value={confirm}
              onChange={this.onChangeConfirm}
            />
            <label htmlFor="confirm">Confirm password</label>
          </div>
          <div className="signup-form__field">
            <button className="signup-form__submit" type="submit" onClick={this.onSubmit}>Sign up</button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(Signup);