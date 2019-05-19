import { call, put, all, takeEvery } from 'redux-saga/effects';
import { API, Auth } from 'aws-amplify';

import {
  FETCH_USERS,
  FETCH_USER,
  FETCH_USERS_SUCCEEDED,
  FETCH_USER_SUCCEEDED,
} from '../actions/types';
import { IFetchUsers, fetchUsersSucceeded } from '../actions';

const API_NAME = 'budgets';

interface MyInit {
  headers: {
    Authorization: {};
  };
  body?: Object;
}
const myInit: MyInit = {
  headers: {
    Authorization: {},
  },
};

Auth.currentAuthenticatedUser().then((res: any) => {
  myInit.headers.Authorization = res.signInUserSession.idToken.jwtToken;
});

export function* fetchUsers(action: IFetchUsers) {
  const res = yield call([API, API.get], API_NAME, action.payload.path, myInit);
  yield put(fetchUsersSucceeded(res));
}

export function* handleFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsers);
}

export default function* rootSaga() {
  yield all([handleFetchUsers()]);
}
