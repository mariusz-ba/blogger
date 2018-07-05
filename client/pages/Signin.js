import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../actions/authActions';
import { isEmpty } from 'lodash'

class Signin extends Component {
  state = {
    identifier: '',
    password: '',
    errors: null
  }

  onChangeIdentifier = (e) => {
    this.setState({ identifier: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { identifier, password } = this.state;
    // Dispatch action responsible for signing in
    this.props.signIn({ identifier, password })
      .then(() => {
        if(isEmpty(this.props.auth.errors))
          this.props.history.push('/');
      })
  }

  render() {
    const { identifier, password } = this.state;
    const { errors } = this.props

    return (
      <section className="signin">
        <h1>Sign in</h1>
        <form className="signin-form" action="post">
          <div className="signin-form__field">
            <input 
              id="identifier"
              type="text" 
              className="signin-form__field--identifier" 
              name="identifier"
              value={identifier}
              onChange={this.onChangeIdentifier}
            />
            <label htmlFor="identifier">Login or E-Mail</label>
          </div>
          <div className="signin-form__field">
            <input
              id="password" 
              type="password" 
              className="signin-form__field--password" 
              name="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="signin-form__field">
            <button className="signin-form__submit" type="submit" onClick={this.onSubmit}>Sign in</button>
          </div>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { signIn })(Signin));