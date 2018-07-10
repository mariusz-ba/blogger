import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import AuthRequiredRoute from './components/auth/AuthRequiredRoute';

import Home from './pages/home';
import Navbar from './components/navbar';
import Posts from './pages/post';
import Profile from './pages/profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default () => (
  <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <AuthRequiredRoute path="/profile" component={Profile}/>
        <AuthRequiredRoute path="/posts" component={Posts}/>
      </Switch>
    </div>
  </Router>
)