import * as TYPES from '../actions/constants/usersConstants';
import { mapKeys, omit } from 'lodash';

const initial_state = {
  isFetching: false,
  users: null,
  errors: null
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.REQUEST_USER: {
      state = { ...state, isFetching: true };
      break;
    }
    case TYPES.REQUEST_USERS: {
      state = { ...state, isFetching: true };
      break;
    }
    case TYPES.RECEIVE_USER: {
      state = { ...state, isFetching: false, users: { ...state.users, [action.payload._id]: action.payload }};
      break;
    }
    case TYPES.RECEIVE_USERS: {
      state = { ...state, isFetching: false, users: mapKeys(action.payload, '_id') };
      break;
    }
    case TYPES.DELETE_USER: {
      // action.payload = id_of_deleted_user
      state = { ...state, users: omit(state.users, action.payload) };
      break;
    }
    case TYPES.SET_USERS_ERRORS: {
      // action.payload = errors
      state = { ...state, isFetching: false, errors: action.payload }
      break;
    }
    default: {}
  }
  return state;
}