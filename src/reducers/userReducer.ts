import {
  FETCH_USERS_SUCCEEDED,
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  UserSucceededActionTypes,
} from '../actions/types';

export default (state: Object = {}, action: UserSucceededActionTypes) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED:
      console.log(action.payload);
      return state;
    case FETCH_USER_SUCCEEDED:
      return state;
    case CREATE_USER_SUCCEEDED:
      console.log(action);
      return state;
    case UPDATE_USER_SUCCEEDED:
      return state;
    case DELETE_USER_SUCCEEDED:
      return state;
    default:
      return state;
  }
};
