import * as TYPES from './constants/authConstants';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

export const requestSignin = (credentials) => ({
  type: TYPES.REQUEST_SIGNIN,
  payload: credentials
})

export const signIn = (credentials) => {
  return dispatch => {
    dispatch(requestSignin(credentials));
    return axios.post('/api/auth', credentials)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        // set authorization token
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      })
      .catch(err => dispatch(setAuthErrors(err.response.data.errors)));
  }
}

export const setCurrentUser = (user) => ({
  type: TYPES.SET_CURRENT_USER,
  payload: user
})

export const setAuthErrors = (errors) => ({
  type: TYPES.SET_AUTH_ERRORS,
  payload: errors
})

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    // set authorization token
    setAuthorizationToken(null);
    dispatch(onSignOut());
  }
}

export const onSignOut = () => ({
  type: TYPES.SIGN_OUT
})