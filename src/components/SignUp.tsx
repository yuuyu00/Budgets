import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import uuid from 'uuidv4';

import history from '../history';

export default () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerSucceed, setRegisterSucceed] = useState(true);
  const [validationResult, setValidationResult] = useState({
    email: true,
    validEmail: true,
    password: true,
    validPassword: true,
  });

  const handleSignUp = () => {
    setLoading(true);
    Auth.signUp({
      username: email,
      password,
    })
      .then(async () => {
        await Auth.signIn(email, password);
        history.push('/');
      })
      .catch(() => {
        setRegisterSucceed(false);
        setLoading(false);
      });
  };

  const formValidation = () => {
    const result = {
      email: true,
      validEmail: true,
      password: true,
      validPassword: true,
    };
    if (!email) {
      result.email = false;
    } else if (email.indexOf('@') === -1) {
      result.validEmail = false;
    }
    if (!password) {
      result.password = false;
    } else if (password.length < 8) {
      result.validPassword = false;
    }

    const isValidationPassed = Object.values(result).reduce(
      (acc, cur) => acc && cur,
    );
    isValidationPassed ? handleSignUp() : setValidationResult(result);
  };

  const renderSignUp = () => {
    return (
      <>
        <Form
          style={{ marginRight: '15%', marginLeft: '15%', marginTop: '15vh' }}
          error
        >
          <Header as="h1" style={{ marginBottom: '10%' }}>
            サインアップ
          </Header>
          <Form.Field required>
            <label>Eメールアドレス</label>
            <Form.Input
              onChange={e => setEmail(e.target.value)}
              placeholder="youremailaddress@example.com"
              value={email}
              id="email_input"
            />
            <Message
              error
              hidden={validationResult.email}
              content="Eメールアドレスは必須です"
            />
            <Message
              error
              hidden={validationResult.validEmail}
              content="Eメールアドレスが不正です"
            />
          </Form.Field>
          <Form.Field required>
            <label>パスワード</label>
            <Form.Input
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="8文字以上"
              value={password}
              id="password_input"
            />
            <Message
              error
              hidden={validationResult.password}
              content="パスワードは必須です"
            />
            <Message
              error
              hidden={validationResult.validPassword}
              content="パスワードは8文字以上を設定してください"
            />
          </Form.Field>
          <Button
            loading={loading}
            type="submit"
            onClick={() => formValidation()}
          >
            登録
          </Button>
          <Message
            error
            hidden={registerSucceed}
            content="登録に失敗しました。"
          />
        </Form>
      </>
    );
  };

  return renderSignUp();
};
