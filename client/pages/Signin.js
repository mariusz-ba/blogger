import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { signIn } from '../actions/authActions';
import { setAuthErrors } from '../actions/authActions';

class Signin extends Component {
  state = {
    identifier: '',
    password: '',
    errors: null
  }

  componentWillMount() {
    this.props.setAuthErrors(null);
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
    const { errors } = this.props.auth;

    return (
      <section className="sign">
        <div className="sign-panel">
          <h1>Sign in</h1>
          { errors &&
            <p class="sign-errors">{errors.form}</p>
          }
          <form className="sign-form" action="post">
            <div className="sign-form__field">
              <label htmlFor="identifier">Login or E-Mail</label>
              <input 
                id="identifier"
                type="text" 
                className="sign-form__field--identifier" 
                name="identifier"
                value={identifier}
                onChange={this.onChangeIdentifier}
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
              <button className="sign-form__submit" type="submit" onClick={this.onSubmit}>Sign in</button>
            </div>
          </form>
          <p className="sign-form__footer">New to blogger? <Link to="/signup">Create account</Link>.</p>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { signIn, setAuthErrors })(Signin));