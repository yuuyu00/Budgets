export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
export const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED';
export const UPDATE_USER_SUCCEEDED = 'UPDATE_USER_SUCCEEDED';
export const CREATE_USER_SUCCEEDED = 'CREATE_USER_SUCCEEDED';
export const DELETE_USER_SUCCEEDED = 'DELETE_USER_SUCCEEDED';

export interface User {
  id: String;
  name: String;
  income: Number;
  balance: Number;
  created_at: Date | null;
  updated_at: Date | null;
  loading?: Boolean;
}

export interface FetchUser {
  type: typeof FETCH_USER;
  payload: {
    path: String;
  };
}

export interface CreateUser {
  type: typeof CREATE_USER;
  payload: {
    path: String;
    data: User;
  };
}

export interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: {
    path: String;
    data: User;
  };
}

export interface DeleteUser {
  type: typeof DELETE_USER;
  payload: {
    path: String;
    userId: String;
  };
}

export type UserActionTypes = FetchUser | CreateUser | UpdateUser | DeleteUser;

export interface FetchUserSucceeded {
  type: typeof FETCH_USER_SUCCEEDED;
  payload: {
    data: any;
  };
}

export interface CreateUserSucceeded {
  type: typeof CREATE_USER_SUCCEEDED;
  payload: {
    data: any;
  };
}

export interface UpdateUserSucceeded {
  type: typeof UPDATE_USER_SUCCEEDED;
  payload: {
    data: any;
  };
}

export interface DeleteUserSucceeded {
  type: typeof DELETE_USER_SUCCEEDED;
  payload: {
    data: any;
  };
}

export type UserSucceededActionTypes =
  | FetchUserSucceeded
  | CreateUserSucceeded
  | UpdateUserSucceeded
  | DeleteUserSucceeded;
