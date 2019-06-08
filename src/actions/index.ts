import history from '../history';
import {
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  User,
  UserActionTypes,
  UserSucceededActionTypes,
} from './types';

export const fetchUser = (): UserActionTypes => {
  return { type: FETCH_USER, payload: { path: '/users' } };
};

export const createUser = (data: User): UserActionTypes => {
  return { type: CREATE_USER, payload: { path: '/users', data } };
};

export const updateUser = (data: User): UserActionTypes => {
  return { type: UPDATE_USER, payload: { path: '/users', data } };
};

export const deleteUser = (userId: String): UserActionTypes => {
  return { type: DELETE_USER, payload: { path: '/users', userId } };
};

export const fetchUserSucceeded = (
  response: User,
): UserSucceededActionTypes => {
  return { type: FETCH_USER_SUCCEEDED, payload: { data: response } };
};

export const createUserSucceeded = (
  response: User,
): UserSucceededActionTypes => {
  return { type: CREATE_USER_SUCCEEDED, payload: { data: response } };
};

export const updateUserSucceeded = (
  response: User,
): UserSucceededActionTypes => {
  return { type: UPDATE_USER_SUCCEEDED, payload: { data: response } };
};

export const deleteUserSucceeded = (
  response: User,
): UserSucceededActionTypes => {
  return { type: DELETE_USER_SUCCEEDED, payload: { data: response } };
};
