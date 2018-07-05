import * as TYPES from '../actions/constants/authConstants';
import { isEmpty } from 'lodash';

const initial_state = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errors: null
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.REQUEST_SIGNIN: {
      state = { ...state, isFetching: true };
      break;
    }
    case TYPES.SET_CURRENT_USER: {
      state = {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: null
      }
      break;
    }
    case TYPES.SET_AUTH_ERRORS: {
      state = { ...state, isFetching: false, errors: action.payload };
      break;
    }
    case TYPES.SIGN_OUT: {
      state = initial_state;
      break;
    }
    default: {}
  }
  return state;
}