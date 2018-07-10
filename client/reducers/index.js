import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer
});