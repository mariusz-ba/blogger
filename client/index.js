import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import jwt from 'jsonwebtoken';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';

const token = localStorage.getItem('jwtToken');

if(token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);