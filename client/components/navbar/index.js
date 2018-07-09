import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';

class Navbar extends Component {
  onClickSignOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { pathname } = this.props.location;

    if(['/signup', '/signin'].indexOf(pathname) > -1)
      return null;

    const navbarActions = isAuthenticated ? 
    (
      <li className="navbar__menu-item"><Link to="/" onClick={this.onClickSignOut}>Sign out</Link></li>
    ) : 
    (
      <React.Fragment>
        <li className="navbar__menu-item"><Link to="/signin">Sign in</Link></li>
        <li className="navbar__menu-item"><Link to="/signup">Sign up</Link></li>
      </React.Fragment>
    )

    return (
      <div className="navbar">
        <div className="container">
          <nav className="navbar-nav">
            <ul className="navbar__menu">
              <li className="navbar__menu-item"><Link to="/">Home</Link></li>
              { navbarActions }
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { signOut })(Navbar));