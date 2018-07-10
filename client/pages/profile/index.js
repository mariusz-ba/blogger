import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Profile from './Profile';
import ProfileSettings from './ProfileSettings';

export default withRouter (class extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={Profile}/>
        <Route path={`${this.props.match.path}/settings`} component={ProfileSettings}/>
        <Route path={`${this.props.match.path}/:id`} component={Profile}/>
      </Switch>
    )
  }
})