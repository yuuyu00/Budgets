import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import history from '../history';

export default () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInSucceed, setSignInSucceed] = useState(true);
  const [validationResult, setValidationResult] = useState({
    username: true,
    email: true,
    validEmail: true,
    password: true,
    validPassword: true,
  });

  const handleSignIn = async () => {
    setLoading(true);
    Auth.signIn(username, password)
      .then(() => history.push('/'))
      .catch(() => setSignInSucceed(false));
  };

  const formValidation = () => {
    const result = {
      username: true,
      email: true,
      validEmail: true,
      password: true,
      validPassword: true,
    };
    if (username === '') {
      result.username = false;
    }
    if (!password) {
      result.password = false;
    } else if (password.length < 8) {
      result.validPassword = false;
    }

    const isValidationPassed = Object.values(result).reduce(
      (acc, cur) => acc && cur,
    );
    isValidationPassed ? handleSignIn() : setValidationResult(result);
  };

  const renderSignUp = () => {
    return (
      <>
        <Form
          style={{ marginRight: '15%', marginLeft: '15%', marginTop: '15vh' }}
          error
        >
          <Header as="h1" style={{ marginBottom: '10%' }}>
            サインイン
          </Header>
          <Form.Field required>
            <label>メールアドレス</label>
            <Form.Input
              id="email_input"
              onChange={e => setUsername(e.target.value)}
              placeholder="address@example.com"
              value={username}
            />
            <Message
              error
              hidden={validationResult.username}
              content="ユーザー名は必須です"
            />
          </Form.Field>
          <Form.Field required>
            <label>パスワード</label>
            <Form.Input
              id="password_input"
              onChange={e => setPassword(e.target.value)}
              type="password"
              value={password}
            />
            <Message
              error
              hidden={validationResult.password}
              content="パスワードは必須です"
            />
          </Form.Field>
          <Button
            loading={loading}
            type="submit"
            onClick={() => formValidation()}
          >
            サインイン
          </Button>
          <Message
            error
            hidden={signInSucceed}
            content="サインインに失敗しました。"
          />
        </Form>
      </>
    );
  };

  return renderSignUp();
};
