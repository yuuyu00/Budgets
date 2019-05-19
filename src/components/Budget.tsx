import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

interface Props {
  fetchUsers: Function;
}

interface State {
  users: Object[];
}

const Budgets = (props: Props) => {
  const createUser = async () => {
    const myInit = {
      body: {
        id: 'askdfjnkau',
        name: 'chihiro',
        income: 100000,
        balance: 2000,
      },
    };
  };

  return (
    <div>
      <button onClick={() => props.fetchUsers()}>fetchUsers</button>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    users: state.users,
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers },
)(Budgets);
