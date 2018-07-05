import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="navbar-nav">
          <ul className="navbar__menu">
            <li className="navbar__menu--item"><Link to="/">Home</Link></li>
            <li className="navbar__menu--item"><Link to="/signin">Sign in</Link></li>
            <li className="navbar__menu--item"><Link to="/signup">Sign up</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
