import * as TYPES from './constants/commentsConstants';
import axios from 'axios';

// Fetching comments
export const fetchComments = (filter) => {
  return dispatch => {
    dispatch(requestComments(filter));
    return axios.get('/api/comments', { params: { ...filter }})
      .then(res => dispatch(receiveComments(res.data)))
      .catch(err => dispatch(setCommentsErrors(err.response.data)))
  }
}

export const requestComments = (filter) => ({
  type: TYPES.REQUEST_COMMENTS,
  payload: filter
})

export const receiveComments = (comments) => ({
  type: TYPES.RECEIVE_COMMENTS,
  payload: comments
})

//Fetching comment
export const fetchComment = (id) => {
  return dispatch => {
    dispatch(requestComment(id));
    return axios.get(`/api/comments/${id}`)
      .then(res => dispatch(receiveComment(res.data)))
      .catch(err => dispatch(setCommentsErrors(err.response.data)))
  }
}

export const requestComment = (id) => ({
  type: TYPES.REQUEST_COMMENT,
  payload: id
})

export const receiveComment = (comment) => ({
  type: TYPES.RECEIVE_COMMENT,
  payload: comment
})

// Creating comment
export const createComment = (data) => {
  return dispatch => {
    return axios.post(`/api/comments`, data)
      .then(res => dispatch(receiveComment(res.data)))
      .catch(err => dispatch(setCommentsErrors(err.response.data)));
  }
}

// Updating comment
export const updateComment = (id, data) => {
  return dispatch => {
    return axios.put(`/api/comments/${id}`, data)
      .then(res => dispatch(receiveComment(res.data)))
      .catch(err => dispatch(setCommentsErrors(err.response.data)));
  }
}

// Deleting comment
export const deleteComment = (id) => {
  return dispatch => {
    return axios.delete(`/api/comments/${id}`)
      .then(res => {
        if(res.data.n === 1 && res.data.ok === 1)
          dispatch(deletedComment(id));
      })
      .catch(err => dispatch(setCommentsErrors(err.response.data)));
  }
}

export const deletedComment = (id) => ({
  type: TYPES.DELETE_COMMENT,
  payload: id
})

// Set comments errors
export const setCommentsErrors = (errors) => ({
  type: TYPES.SET_COMMENTS_ERRORS,
  payload: errors
})