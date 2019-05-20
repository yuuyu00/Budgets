import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import uuid from 'uuidv4';

import { fetchUsers, createUser } from '../actions';

interface Props {
  fetchUsers: Function;
  createUser: Function;
}

interface State {
  users: Object[];
}

const Budgets = (props: Props) => {
  const [createUserName, setCreateUserName] = useState('');
  const [createUserIncome, setCreateUserIncome] = useState(0);
  const [createUserBalance, setCreateUserBalance] = useState(0);

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

  const renderCreateUser = () => {
    return (
      <div>
        <input
          type="text"
          value={createUserName}
          onChange={e => setCreateUserName(e.target.value)}
        />
        <input
          type="text"
          value={createUserIncome}
          onChange={e => setCreateUserIncome(parseInt(e.target.value))}
        />
        <input
          type="text"
          value={createUserBalance}
          onChange={e => setCreateUserBalance(parseInt(e.target.value))}
        />
        <button
          onClick={() =>
            props.createUser({
              name: createUserName,
              income: createUserIncome,
              balance: createUserBalance,
            })
          }
        >
          CreateUser
        </button>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => props.fetchUsers()}>fetchUsers</button>
      {renderCreateUser()}
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
  { fetchUsers, createUser },
)(Budgets);
