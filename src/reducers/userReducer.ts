import {
  FETCH_USERS_SUCCEEDED,
  FETCH_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
} from '../actions/types';
import { UnionedAction } from '../actions';

const assertNever = (x: never) => {
  throw new Error(`Unexptected type ${x}`);
};

export default (state: Object = {}, action: UnionedAction) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED:
      console.log(action.payload);
      return state;
    case FETCH_USER_SUCCEEDED:
      return state;
    case UPDATE_USER_SUCCEEDED:
      return state;
    default:
      return state;
  }
};
