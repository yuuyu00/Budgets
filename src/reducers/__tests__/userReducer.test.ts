import {
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  UserSucceededActionTypes,
  User,
} from '../../actions/types';
import userReducer from '../userReducer';

describe('userReducer', () => {
  const userArg: User = {
    id: 'userdata_test_id',
    name: 'Tony Stark',
    income: 300000,
    balance: 240000,
    created_at: new Date('2019-06-08T08:08:50.112Z'),
    updated_at: new Date('2019-06-08T08:08:50.112Z'),
  };

  it('FETCH_USER_SUCCEEDED', () => {
    const action: UserSucceededActionTypes = {
      type: FETCH_USER_SUCCEEDED,
      payload: { data: [userArg] },
    };
    expect(userReducer({}, action)).toEqual({ ...userArg, loading: false });
  });

  it('CREATE_USER_SUCCEEDED', () => {
    const action: UserSucceededActionTypes = {
      type: CREATE_USER_SUCCEEDED,
      payload: { data: [userArg] },
    };
    expect(userReducer({}, action)).toEqual({ ...userArg, loading: false });
  });

  it('UPDATE_USER_SUCCEEDED', () => {
    const action: UserSucceededActionTypes = {
      type: UPDATE_USER_SUCCEEDED,
      payload: { data: [userArg] },
    };
    expect(userReducer({}, action)).toEqual({ ...userArg, loading: false });
  });

  it('DELETE_USER_SUCCEEDED', () => {
    const action: UserSucceededActionTypes = {
      type: DELETE_USER_SUCCEEDED,
      payload: { data: [userArg] },
    };
    expect(userReducer({}, action)).toEqual({});
  });
});
