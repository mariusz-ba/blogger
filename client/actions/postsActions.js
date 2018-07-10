import * as TYPES from './constants/postsConstants';
import axios from 'axios';

/**
 * Use this action to fetch posts
 * @param {Object} filter 
 */
export const fetchPosts = (filter) => {
  return dispatch => {
    dispatch(requestPosts(filter));
    return axios.get('/api/posts', { params: { ...filter }} )
      .then(res => dispatch(receivePosts(res.data)))
      .catch(err => dispatch(setPostsErrors(err.response.data)))
  }
}

/**
 * Action dispatched every time posts
 * are requested from the server
 * @param {Object} filter 
 */
export const requestPosts = (filter) => ({
  type: TYPES.REQUEST_POSTS,
  payload: filter
})

/**
 * Action dispatched every time posts
 * are successfully fetched
 * @param {Array} posts - array of posts
 */
export const receivePosts = (posts) => ({
  type: TYPES.RECEIVE_POSTS,
  payload: posts
})


/**
 * Use this action to fetch single post
 * @param {String} id - post id 
 */
export const fetchPost = (id) => {
  return dispatch => {
    dispatch(requestPost(id));
    return axios.get(`/api/posts/${id}`)
      .then(res => dispatch(receivePost(res.data)))
      .catch(err => dispatch(setPostsErrors(err.response.data)))
  }
}

/**
 * Action dispatched every time post
 * id requested from the server
 * @param {String} id - post id
 */
export const requestPost = (id) => ({
  type: TYPES.REQUEST_POST,
  payload: id
})

/**
 * Action dispatched every time post
 * is successfully fetched
 * @param {Object} post - Post received from the server
 */
export const receivePost = (post) => ({
  type: TYPES.RECEIVE_POST,
  payload: post
})


export const deletePost = (id) => {
  return dispatch => {
    return axios.delete(`/api/posts/${id}`)
      .then(res => {
        if(res.n === 1 && res.ok === 1)
          dispatch(deletedPost(id));
      })
      .catch(err => dispatch(setPostsErrors(err.response.data)))
  }
}

export const deletedPost = (id) => ({
  type: TYPES.DELETE_POST,
  payload: id
})

/**
 * Use this action to set posts errors.
 * @param {Object} errors - errors
 */
export const setPostsErrors = (errors) => ({
  type: TYPES.SET_POSTS_ERRORS,
  payload: errors
})