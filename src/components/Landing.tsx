import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import uuid from 'uuidv4';
import { Header, Icon, Button } from 'semantic-ui-react';

import history from '../history';

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUpAndSignIn = async (email: string, password: string) => {
    setIsLoading(true);

    await Auth.signUp({
      username: email,
      password,
    });
    Auth.signIn(email, password);
  };

  return (
    <Header as="h1" icon textAlign="center" style={{ paddingTop: '50px' }}>
      <Icon name="tasks" />
      <Header.Content>Let&apos;s Todo.</Header.Content>
      <Header.Subheader style={{ padding: '20px' }}>タイトル</Header.Subheader>
      <Button
        size="large"
        style={{ marginTop: '20px' }}
        color="teal"
        onClick={() => signUpAndSignIn(`${uuid()}@${uuid()}.com`, uuid())}
        loading={isLoading}
        id="quick_signup_button"
      >
        ログインせずに始める
      </Button>
      <Button
        size="large"
        style={{ marginTop: '20px' }}
        color="grey"
        onClick={() => history.push('/signup')}
        id="signup_button"
      >
        サインアップ
      </Button>
    </Header>
  );
};
