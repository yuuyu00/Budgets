import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

interface Props {
  content: string;
}

const API_NAME = 'budgets';

export default ({ content = 'default' }: Props) => {
  const listUser = async () => {
    const response = await API.get(API_NAME, '/users');
    console.log(response);
  };

  useEffect(() => {
    listUser();
  }, []);

  return <div>{content}</div>;
};
