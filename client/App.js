import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/navbar';
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
      </Switch>
    </div>
  </Router>
)