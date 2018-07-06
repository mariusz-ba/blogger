import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
      <section className="sign">
        <div className="sign-panel">
          <h1>Sign up</h1>
          { errors &&
            Object.keys(errors).map((error, index) => <p key={index} class="sign-errors">{errors[error]}</p>)
          }
          <form className="sign-form" action="post">
            <div className="sign-form__field">
              <label htmlFor="username">Username</label>
              <input 
                id="username" 
                type="text" 
                className="sign-form__field--username" 
                name="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="sign-form__field">
              <label htmlFor="email">E-Mail</label>
              <input 
                id="email" 
                type="email" 
                className="sign-form__field--email" 
                name="email"
                value={email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="sign-form__field">
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                className="sign-form__field--password" 
                name="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="sign-form__field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm" 
                type="password" 
                className="sign-form__field--confirm" 
                name="confirm"
                value={confirm}
                onChange={this.onChangeConfirm}
              />
            </div>
            <div className="sign-form__field">
              <button className="sign-form__submit" type="submit" onClick={this.onSubmit}>Sign up</button>
            </div>
          </form>
          <p class="sign-form__footer">
            Already have account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </section>
    )
  }
}

export default withRouter(Signup);