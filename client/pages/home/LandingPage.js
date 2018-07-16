import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <header className="landing-header">
          <div className="container">
            <div className="landing-header-box">
              <div className="landing-header__left">
                <h1>Create Your own blog</h1>
                <h3>Creating blog was never that simple. Publish articles, get feedback from other users, discover new people. Just sign up and enjoy.</h3>
              </div>
              <div className="landing-header__right">
                <Link to="/signin">Sign in</Link>
                <span className="divider">or</span>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}