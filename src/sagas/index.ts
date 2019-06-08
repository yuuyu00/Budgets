import { call, put, all, takeEvery } from 'redux-saga/effects';
import { API, Auth, Hub } from 'aws-amplify';

import awsconfig from '../aws-exports';

import {
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USER_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED,
  UserActionTypes,
} from '../actions/types';
import {
  fetchUserSucceeded,
  createUserSucceeded,
  updateUserSucceeded,
  deleteUserSucceeded,
} from '../actions';

const API_NAME = 'budgets';
API.configure(awsconfig);

let user: any = null;

interface MyInit {
  headers: {
    Authorization: {};
  };
  body?: Object;
}

Auth.currentAuthenticatedUser().then((res: any) => {
  user = res;
});
Hub.listen('auth', ({ payload }: any) => {
  if (payload.event === 'signIn') {
    user = payload.data;
  }
});

const getHeaders = () => {
  if (!user) {
    throw new Error('User not logined');
  }

  return {
    Authorization: user.signInUserSession.idToken.jwtToken,
  };
};

export function* fetchUser(action: UserActionTypes) {
  const myInit = {
    headers: getHeaders(),
  };
  const res = yield call([API, API.get], API_NAME, action.payload.path, myInit);
  yield put(fetchUserSucceeded(res));
}

export function* createUser(action: UserActionTypes) {
  if ('data' in action.payload) {
    const myInit = {
      headers: getHeaders(),
      body: {
        ...action.payload.data,
      },
    };
    const res = yield call(
      [API, API.post],
      API_NAME,
      action.payload.path,
      myInit,
    );
    yield put(fetchUserSucceeded(res));
  }
}

export function* handlefetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}

export function* handleCreateUsers() {
  yield takeEvery(CREATE_USER, createUser);
}

export default function* rootSaga() {
  yield all([handlefetchUser(), handleCreateUsers()]);
}
