import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';

class Navbar extends Component {
  onClickSignOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const navbarActions = isAuthenticated ? 
    (
      <li className="navbar__menu--item"><Link to="/" onClick={this.onClickSignOut}>Sign out</Link></li>
    ) : 
    (
      <React.Fragment>
        <li className="navbar__menu--item"><Link to="/signin">Sign in</Link></li>
        <li className="navbar__menu--item"><Link to="/signup">Sign up</Link></li>
      </React.Fragment>
    )

    return (
      <div className="navbar">
        <nav className="navbar-nav">
          <ul className="navbar__menu">
            <li className="navbar__menu--item"><Link to="/">Home</Link></li>
            { navbarActions }
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { signOut })(Navbar);