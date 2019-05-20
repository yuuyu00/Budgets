import history from '../history';
import {
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS_SUCCEEDED,
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  Users,
  UserActionTypes,
  UserSucceededActionTypes,
} from './types';

export const fetchUsers = (): UserActionTypes => {
  return { type: FETCH_USERS, payload: { path: '/users' } };
};

export const fetchUser = (userId: String): UserActionTypes => {
  return { type: FETCH_USER, payload: { path: `/users/${userId}` } };
};

export const createUser = (data: Users): UserActionTypes => {
  return { type: CREATE_USER, payload: { path: '/users', data } };
};

export const updateUser = (data: Users): UserActionTypes => {
  return { type: UPDATE_USER, payload: { path: '/users', data } };
};

export const deleteUser = (userId: String): UserActionTypes => {
  return { type: DELETE_USER, payload: { path: '/users', userId } };
};

export const fetchUsersSucceeded = (
  response: Object,
): UserSucceededActionTypes => {
  return { type: FETCH_USERS_SUCCEEDED, payload: { data: response } };
};

export const fetchUserSucceeded = (
  response: Object,
): UserSucceededActionTypes => {
  return { type: FETCH_USER_SUCCEEDED, payload: { data: response } };
};

export const createUserSucceeded = (
  response: Object,
): UserSucceededActionTypes => {
  return { type: CREATE_USER_SUCCEEDED, payload: { data: response } };
};

export const updateUserSucceeded = (
  response: Object,
): UserSucceededActionTypes => {
  return { type: UPDATE_USER_SUCCEEDED, payload: { data: response } };
};

export const deleteUserSucceeded = (
  response: Object,
): UserSucceededActionTypes => {
  return { type: DELETE_USER_SUCCEEDED, payload: { data: response } };
};
