import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchUser } from '../actions';
import { User } from '../actions/types';
import history from '../history';

interface Props {
  fetchUser: Function;
  createUser: Function;
  user: User;
  store?: Object;
}

interface State {
  user: User;
}

export default () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: State) => state.user);

  // ユーザーデータをフェッチ
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  // ユーザデータが存在しなければ初期設定コンポーネントに移動
  useEffect(() => {
    if (!user.loading && !('name' in user)) {
      history.push('/setup');
    }
  }, [user]);

  const renderUserData = (userData: User) => {
    return (
      <div>
        <div id="user_id">{userData.id}</div>
        <div id="user_name">{userData.name}</div>
        <div id="user_income">{userData.income}</div>
        <div id="user_balance">{userData.balance}</div>
        <div>{userData.created_at}</div>
        <div>{userData.updated_at}</div>
      </div>
    );
  };

  if (user.loading) return <Loader active>Loading...</Loader>;
  return <>{renderUserData(user)}</>;
};
