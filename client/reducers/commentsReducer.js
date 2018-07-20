import * as TYPES from '../actions/constants/commentsConstants';
import { mapKeys, omit } from 'lodash';

const initial_state = {
  isFetching: false,
  comments: {},
  errors: null
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.REQUEST_COMMENT:
    case TYPES.REQUEST_COMMENTS: {
      state = { ...state, isFetching: true }
      break;
    }
    case TYPES.RECEIVE_COMMENT: {
      state = { 
        ...state,
         isFetching: false,
         comments: { ...state.comments, [action.payload._id]: action.payload }
      };
      break;
    }
    case TYPES.RECEIVE_COMMENTS: {
      state = { ...state, isFetching: false, comments: mapKeys(action.payload, '_id') };
      break;
    }
    case TYPES.DELETE_COMMENT: {
      state = { ...state, comments: omit(state.comments, action.payload )};
      break;
    }
    case TYPES.SET_COMMENTS_ERRORS: {
      state = { ...state, errors: action.payload };
      break;
    }
    default: {}
  }
  return state;
}