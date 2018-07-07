import * as TYPES from './constants/usersConstants';
import axios from 'axios';

/**
 * Use this action to fetch many users datas.
 * @param {Object} filter - not used yet
 */
export const fetchUsers = (filter) => {
  return dispatch => {
    dispatch(requestUsers(filter));
    return axios.get('/api/users', { params: { ...filter }} )
      .then(res => dispatch(receiveUsers(res.data)))
      .catch(err => dispatch(setUsersErrors(err.response.data)))
  }
}

/**
 * Action dispatched avery time a users list
 * is requested from the server
 * @param {Object} filter 
 */
export const requestUsers = (filter) => ({
  type: TYPES.REQUEST_USERS,
  payload: filter
})

/**
 * Action dispatched every time a users list
 * is successfully fetched
 * @param {Array} users - array of users
 */
export const receiveUsers = (users) => ({
  type: TYPES.RECEIVE_USERS,
  payload: users
})


/**
 * Use this action to fetch user data.
 * @param {String} identifier - User id or username
 */
export const fetchUser = (identifier) => {
  return dispatch => {
    dispatch(requestUser(identifer));
    return axios.get(`/api/users/${identifier}`)
      .then(res => dispatch(receiveUser(res.data)))
      .catch(err => dispatch(setUsersErrors(err.response.data)))
  }
}

/**
 * Action dispatched every time a user data
 * is requested from the server
 * @param {String} identifier - User id or username
 */
export const requestUser = (identifier) => ({
  type: TYPES.REQUEST_USER,
  payload: identifier
})

/**
 * Action dispatched every time a user data
 * is successfully fetched
 * @param {Object} user - User received from the server
 */
export const receiveUser = (user) => ({
  type: TYPES.RECEIVE_USER,
  payload: user
})


/**
 * Use this action to delete user
 * @param {String} identifier - User id
 */
export const deleteUser = (identifier) => {
  return dispatch => {
    return axios.delete(`/api/users/${identifier}`)
      .then(res => {
        if(res.n === 1 && res.ok === 1)
          dispatch(deletedUser(identifier));
      })
      .catch(err => dispatch(setUsersErrors(err.response.data)));
  }
}

/**
 * Action dispatched every time user
 * is successfully deleted
 * @param {String} identifier - User id
 */
export const deletedUser = (identifier) => ({
  type: TYPES.DELETE_USER,
  payload: identifier
})

f
/**
 * Use this action to set users errors.
 * @param {Object} errors - errors
 */
export const setUsersErrors = (errors) => ({
  type: TYPES.SET_USERS_ERRORS,
  payload: errors
})