import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Modal,
  Button,
  Step,
  Icon,
  Container,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import { reducerTypes } from '../reducers';
import { createUser } from '../actions';
import * as Types from '../actions/types';
import history from '../history';

export default () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const NAME_PAGE_NO = 0;
  const CATEGORY_PAGE_NO = 1;
  const BALANCE_PAGE_NO = 2;

  const [name, setName] = useState('');

  // ユーザー登録
  const handleCreateUser = (userInfo?: Types.User) => {
    console.log('handleCreateUser called');
    // dispatch(createUser(userInfo));
  };

  // ステップを進めたり戻したり完了したりするボタン
  const renderStepButtons = (pageNumber: number) => {
    const nextButton = (
      <Button floated="right" onClick={() => setPage(page + 1)}>
        次へ
      </Button>
    );

    const prevButton = (
      <Button floated="right" onClick={() => setPage(page - 1)}>
        前へ
      </Button>
    );

    const completeButton = (
      <Button floated="right" primary onClick={() => handleCreateUser()}>
        完了
      </Button>
    );

    return (
      <div id="setup_button">
        {pageNumber < BALANCE_PAGE_NO ? nextButton : completeButton}
        {pageNumber !== NAME_PAGE_NO ? prevButton : <></>}
      </div>
    );
  };

  const renderSetupName = (_name: string, _setName: Function) => {
    return (
      <div id="setup_form">
        <Header>名前</Header>
        <Form>
          <Form.Field>
            <input
              type="text"
              value={_name}
              onChange={e => _setName(e.target.value)}
            />
          </Form.Field>
        </Form>
      </div>
    );
  };
  // ページ番号でフォームのコンポーネントを振り分ける
  const renderContent = (pageNumber: number) => {
    switch (pageNumber) {
      case NAME_PAGE_NO:
        return renderSetupName(name, setName);
      case CATEGORY_PAGE_NO:
        return <SetupCategory />;
      case BALANCE_PAGE_NO:
        return <SetupBalance />;
      default:
        return null;
    }
  };

  // ステップのバー
  const Steps = () => {
    return (
      <Step.Group widths="8" size="tiny" unstackable>
        <Step active={page === NAME_PAGE_NO}>
          <Icon name="truck" size="tiny" />
        </Step>

        <Step
          active={page === CATEGORY_PAGE_NO}
          disabled={page < CATEGORY_PAGE_NO}
        >
          <Icon name="payment" />
        </Step>

        <Step
          active={page === BALANCE_PAGE_NO}
          disabled={page < BALANCE_PAGE_NO}
        >
          <Icon name="info" />
        </Step>
      </Step.Group>
    );
  };

  const SetupForm = () => {
    return (
      <div id="setup_form">
        <Header>名前</Header>
        <Form>
          <Form.Field>
            <input type="text" />
          </Form.Field>
        </Form>
      </div>
    );
  };

  const SetupCategory = () => {
    return (
      <div>
        <SetupForm />
      </div>
    );
  };

  const SetupBalance = () => {
    return (
      <div>
        <SetupForm />
      </div>
    );
  };

  return (
    <>
      <Segment id="setup_user_segment">
        <Steps />
        {renderContent(page)}
        {renderStepButtons(page)}
      </Segment>
    </>
  );
};
