import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';

interface Props {
  content: string;
}

const API_NAME = 'budgets';

export default ({ content = 'default' }: Props) => {
  const listUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const myInit = {
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken,
      },
    };
    const response = await API.get(API_NAME, '/users', myInit);
    console.log('List user');
    console.log(response);
  };

  const createUser = async () => {
    const myInit = {
      body: {
        id: 'askdfjnkau',
        name: 'chihiro',
        income: 100000,
        balance: 2000,
      },
    };
    const response = await API.post(API_NAME, '/users', myInit);
    console.log('Create user');
    console.log(response);
  };

  useEffect(() => {
    listUser();
  }, []);

  return <div>{content}</div>;
};
