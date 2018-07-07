import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthRequiredRoute extends Route {
  render() {
    const match = this.state;
    const { isAuthenticated } = this.props.auth;

    if(match) {
      if(isAuthenticated)
        return <this.props.component/>;
      return <Redirect to="/signin"></Redirect>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(AuthRequiredRoute));