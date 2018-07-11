import * as TYPES from '../actions/constants/postsConstants';
import { mapKeys, omit } from 'lodash';

const initial_state = {
  isFetching: false,
  posts: null,
  errors: null
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.REQUEST_POST:
    case TYPES.REQUEST_POSTS: {
      state = { ...state, isFetching: true };
      break;
    }
    case TYPES.RECEIVE_POST: {
      state = { ...state, isFetching: false, posts: { ...state.posts, [action.payload._id]: action.payload }};
      break;
    }
    case TYPES.RECEIVE_POSTS: {
      state = { ...state, isFetching: false, posts: mapKeys(action.payload, '_id') };
      break;
    }
    case TYPES.DELETE_POST: {
      // action.payload = id_of_deleted_post
      state = { ...state, posts: omit(state.posts, action.payload) };
      break;
    }
    case TYPES.SET_POSTS_ERRORS: {
      // action.payload = errors
      state = { ...state, errors: action.payload };
      break;
    }
    default: {}
  }
  return state;
}