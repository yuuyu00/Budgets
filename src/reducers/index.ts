import { combineReducers } from 'redux';

import userReducer from './userReducer';
import * as actionTypes from '../actions/types';

export default combineReducers({
  user: userReducer,
});

export interface reducerTypes {
  user: actionTypes.User;
}
