import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import HomePage from './HomePage';

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    
    // Check if user is signed in and render appropiate page
    if(isAuthenticated)
      return <HomePage/>;
    return <LandingPage/>;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);