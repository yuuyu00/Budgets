import {
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  UserSucceededActionTypes,
  User,
} from '../actions/types';

export default (state: User | {} = {}, action: UserSucceededActionTypes) => {
  switch (action.type) {
    case FETCH_USER_SUCCEEDED:
      return { ...action.payload.data[0], loading: false };
    case CREATE_USER_SUCCEEDED:
      return { ...action.payload.data[0], loading: false };
    case UPDATE_USER_SUCCEEDED:
      return { ...action.payload.data[0], loading: false };
    case DELETE_USER_SUCCEEDED:
      return state;
  }
};
