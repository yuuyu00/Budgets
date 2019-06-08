import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchUser, createUser } from '../actions';
import CreateUserWizard from './CreateUserWizard';
import { User } from '../actions/types';

interface Props {
  fetchUser: Function;
  createUser: Function;
  user: User;
  store?: Object;
}

interface State {
  user: User;
}

const Budgets = (props: Props) => {
  useEffect(() => {
    console.log(props.user);
  }, [props.user]);

  useEffect(() => {
    (async () => {
      await props.fetchUser();
    })();
  }, []);

  const renderUserData = (userData: User) => {
    return (
      <div>
        <div id="user_id">{userData.id}</div>
        <div id="user_name">{userData.name}</div>
        <div id="user_income">{userData.income}</div>
        <div id="user_balance">{userData.balance}</div>
      </div>
    );
  };

  const renderCreateUserWizard = () => {
    return <CreateUserWizard />;
  };

  if (props.user.loading) return <Loader active>Loading...</Loader>;
  if ('name' in props.user) {
    return <>{renderUserData(props.user)}</>;
  } else {
    return <>{renderCreateUserWizard()}</>;
  }
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, createUser },
)(Budgets);
