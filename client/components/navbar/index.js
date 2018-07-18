import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      dropdownOpen: false,
      search: ''
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if(this.dropdownNode && this.dropdownButton && !this.dropdownNode.contains(e.target) && !this.dropdownButton.contains(e.target)) {
      this.setState({ dropdownOpen: false });
    }
  }

  toggleMobileMenu = e => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  inputKeyPress = e => {
    if(e.key === 'Enter') {
      // Redirect to search page
      this.props.history.push(`/search?query=${e.target.value}`)
    }
  }

  toggleDropdown = (e) => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  onClickSignOut = (e) => {
    e.preventDefault();
    this.props.signOut();
    this.setState({ dropdownOpen: false });
  }

  onChangeSearch = e => {
    this.setState({ search: e.target.value });
  }

  onSearch = e => {
    e.preventDefault();
    // Redirect to search page
    this.props.history.push(`/search?query=${this.state.search}`)
  }

  render() {
    const dropdownStyle = this.state.dropdownOpen ? { display: 'block' } : { display: 'none' };
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const { pathname } = this.props.location;

    if(!isAuthenticated)
      return null;

    if(['/signup', '/signin'].indexOf(pathname) > -1)
      return null;

    const navbarActions = (
      <React.Fragment>
        <li className="navbar__menu-item">
          <div className="navbar__dropdown">
            <button onClick={this.toggleDropdown} ref={(node) => {this.dropdownButton = node}}>
              <img src={user.meta.avatar} alt="avatar"/>
            </button>
            <ul className="navbar__dropdown-menu" style={{...dropdownStyle}} ref={(node) => { this.dropdownNode = node; }}>
              <li className="navbar__dropdown-item navbar__dropdown-item--heading">Actions</li>
              <li className="navbar__dropdown-item">
                <Link to="/posts/new" onClick={this.toggleDropdown}>New post</Link>
              </li>
              <li className="navbar__dropdown-item navbar__dropdown-item--heading">Profile</li>
              <li className="navbar__dropdown-item">
                <Link to="/profile" onClick={this.toggleDropdown}>Profile</Link>
              </li>
              <li className="navbar__dropdown-item">
                <Link to="/profile/settings" onClick={this.toggleDropdown}>Settings</Link>
              </li>
              <li className="navbar__dropdown-item navbar__dropdown-item--spacer"></li>
              <li className="navbar__dropdown-item">
                <Link to="/" onClick={this.onClickSignOut}>Sign out</Link>
              </li>
            </ul>
          </div>
        </li>
      </React.Fragment>
    )

    return (
      <div className="navbar">
        <div className="container">
          <nav className="navbar-nav">
            <div className="navbar__branding">
              <Link className="navbar-brand" to="/">
                <img src="https://www.freeiconspng.com/uploads/facebook-text-logo-transparent-10.png" alt="Brand"/>
              </Link>
              <form>
                <input name="search" type="text" placeholder="Search" onKeyPress={this.inputKeyPress} onChange={this.onChangeSearch} value={this.state.search}/>
                <button type="submit" onClick={this.onSearch}><i class="fas fa-search"></i></button>
              </form>
            </div>
            <ul className="navbar__menu">
              { navbarActions }
            </ul>
          </nav>
        </div>
        <input className="navbar__hamburger" type="checkbox" onClick={this.toggleMobileMenu} checked={this.state.mobileOpen}/>
        <div className="navbar-mobile">
          <nav className="navbar-mobile-nav">
            <ul className="navbar-mobile__menu" onClick={this.toggleMobileMenu}>
              <li className="navbar-mobile__menu-item">
                <Link to="/posts/new">New post</Link>
              </li>
              <li className="navbar-mobile__menu-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="navbar-mobile__menu-item">
                <Link to="/profile/settings">Settings</Link>
              </li>
              <li className="navbar-mobile__menu-item">
                <Link to="/" onClick={this.onClickSignOut}>Sign out</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { signOut })(Navbar));