import * as actions from '..';
import * as actionsTypes from '../types';

describe('UserActionTypes', () => {
  const userArg = {
    id: 'userdata_test_id',
    name: 'Tony Stark',
    income: 300000,
    balance: 240000,
    created_at: new Date('2019-06-08T08:08:50.112Z'),
    updated_at: new Date('2019-06-08T08:08:50.112Z'),
  };

  it('fetchUser', () => {
    expect(actions.fetchUser()).toEqual({
      type: actionsTypes.FETCH_USER,
      payload: { path: '/users' },
    });
  });

  it('createUser', () => {
    expect(actions.createUser(userArg)).toEqual({
      type: actionsTypes.CREATE_USER,
      payload: { path: '/users', data: userArg },
    });
  });

  it('updateUser', () => {
    expect(actions.updateUser(userArg)).toEqual({
      type: actionsTypes.UPDATE_USER,
      payload: { path: '/users', data: userArg },
    });
  });

  it('deleteUser', () => {
    expect(actions.deleteUser('userdata_test_id')).toEqual({
      type: actionsTypes.DELETE_USER,
      payload: { path: '/users', userId: 'userdata_test_id' },
    });
  });
});

describe('UserSucceededActionTypes', () => {
  const userArg = {
    id: 'userdata_test_id',
    name: 'Tony Stark',
    income: 300000,
    balance: 240000,
    created_at: new Date('2019-06-08T08:08:50.112Z'),
    updated_at: new Date('2019-06-08T08:08:50.112Z'),
  };

  it('fetchUserSucceeded', () => {
    expect(actions.fetchUserSucceeded(userArg)).toEqual({
      type: actionsTypes.FETCH_USER_SUCCEEDED,
      payload: { data: userArg },
    });
  });

  it('createUserSucceeded', () => {
    expect(actions.createUserSucceeded(userArg)).toEqual({
      type: actionsTypes.CREATE_USER_SUCCEEDED,
      payload: { data: userArg },
    });
  });

  it('updateUserSucceeded', () => {
    expect(actions.updateUserSucceeded(userArg)).toEqual({
      type: actionsTypes.UPDATE_USER_SUCCEEDED,
      payload: { data: userArg },
    });
  });

  it('deleteUserSucceeded', () => {
    expect(actions.deleteUserSucceeded(userArg)).toEqual({
      type: actionsTypes.DELETE_USER_SUCCEEDED,
      payload: { data: userArg },
    });
  });
});
