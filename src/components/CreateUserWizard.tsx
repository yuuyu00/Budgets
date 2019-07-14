import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Step,
  Icon,
  Segment,
  Header,
  Message,
  Container,
  Label,
  List,
} from 'semantic-ui-react';
import uuid from 'uuidv4';

import { reducerTypes } from '../reducers';
import { createUser } from '../actions';
import * as Types from '../actions/types';
import { formatMoneyToNum, formatNumToMoney } from '../utils/utils';

export default () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const NAME_PAGE_NO = 0;
  const INCOME_PAGE_NO = 1;
  const CATEGORY_PAGE_NO = 2;
  const SPENT_PAGE_NO = 3;
  const CONFIRM_PAGE_NO = 4;

  const [error, setError] = useState('');
  const [isEmptyRequiredForm, setIsEmptyRequiredForm]: any = useState({
    [NAME_PAGE_NO]: true,
    [CATEGORY_PAGE_NO]: true,
  });
  const [name, setName] = useState('');
  const [income, setIncome] = useState(0);
  const [categories, setCategories]: [Types.Category[], Function] = useState([
    {
      id: uuid(),
      owner: '',
      name: '',
      reserved: 0,
      spent: 0,
    },
  ]);

  /**
   * ユーザデータの初期登録を行います。
   * @param userInfo 登録するユーザデータ
   */
  const handleCreateUser = (userInfo?: Types.User) => {
    setIsLoading(true);
    console.log('handleCreateUser called');
    console.log(userInfo);
    // dispatch(createUser(userInfo));
  };

  /**
   * 必須項目の入力値が変更された場合に必須項目が空かどうかの値をセットする
   * @param inputValue input要素のe.target.value
   * @param pageNumber 現在のページ番号
   */
  const handleIsEmptyChange = (inputValue: string, pageNumber: number) => {
    if (inputValue) {
      setIsEmptyRequiredForm({
        ...isEmptyRequiredForm,
        [pageNumber]: false,
      });
    } else {
      setIsEmptyRequiredForm({
        ...isEmptyRequiredForm,
        [pageNumber]: true,
      });
    }
  };

  /**
   * ユーザデータ初期登録ウィザードのステップのコンポーネントを移動するボタンを返却します。
   * @param pageNumber 表示中のページ番号
   */
  const renderStepButtons = (pageNumber: number) => {
    const nextButton = (
      <Button
        floated="right"
        primary
        disabled={
          isEmptyRequiredForm[pageNumber] &&
          [NAME_PAGE_NO, CATEGORY_PAGE_NO, SPENT_PAGE_NO].indexOf(
            pageNumber,
          ) !== -1
        }
        onClick={() => {
          console.log(isEmptyRequiredForm);
          setPage(page + 1);
        }}
      >
        次へ
      </Button>
    );

    const prevButton = (
      <Button floated="right" onClick={() => setPage(page - 1)}>
        前へ
      </Button>
    );

    const completeButton = (
      <Button
        floated="right"
        loading={isLoading}
        positive
        onClick={() => handleCreateUser()}
      >
        登録
      </Button>
    );

    return (
      <div id="setup_button">
        {pageNumber < CONFIRM_PAGE_NO ? nextButton : completeButton}
        {pageNumber !== NAME_PAGE_NO ? prevButton : <></>}
      </div>
    );
  };

  /**
   * 名前を設定するステップのコンポーネントを返却します。
   * @param _name state
   * @param _setIncome setState
   */
  const renderSetupName = (_name: string, _setName: Function) => {
    return (
      <div className="setup-form">
        <Header as="h2">
          名前
          <Header.Subheader>あなたの名前を設定してください。</Header.Subheader>
        </Header>

        <Form error>
          <Form.Field>
            <input
              type="text"
              value={_name}
              onChange={e => {
                setError('');
                _setName(e.target.value);
                if (e.target.value) {
                  setIsEmptyRequiredForm({
                    ...isEmptyRequiredForm,
                    [page]: false,
                  });
                } else {
                  setIsEmptyRequiredForm({
                    ...isEmptyRequiredForm,
                    [page]: true,
                  });
                }
              }}
            />
          </Form.Field>
        </Form>
      </div>
    );
  };

  /**
   * 収入を設定するステップのコンポーネントを返却します。
   * @param _income state
   * @param _setIncome setState
   */
  const renderSetupIncome = (_income: number, _setIncome: Function) => {
    return (
      <div className="setup-form">
        <Header as="h2">
          収入
          <Header.Subheader>毎月の収入を設定してください。</Header.Subheader>
        </Header>
        <Form>
          <Form.Field>
            <input
              style={{ textAlign: 'right' }}
              type="tel"
              value={formatNumToMoney(_income)}
              onChange={e => _setIncome(formatMoneyToNum(e.target.value))}
            />
          </Form.Field>
        </Form>
      </div>
    );
  };

  /**
   * 予算カテゴリーを設定するステップのコンポーネントを返却します。
   * @param _categories state
   * @param _setCategories setState
   */
  const renderSetupCategory = (
    _categories: Types.Category[],
    _setCategories: Function,
  ) => {
    console.log(_categories);
    return (
      <div className="setup-form">
        <Header as="h2">
          カテゴリー
          <Header.Subheader>
            毎月の予算を管理するカテゴリーを入力してください。
          </Header.Subheader>
        </Header>

        <Form error>
          {_categories.map((elm: Types.Category) => (
            <Form.Field key={elm.id} style={{ marginBottom: '30px' }}>
              <label>カテゴリ名</label>
              <input
                type="text"
                value={elm.name}
                style={{ marginBottom: '10px' }}
                onChange={e => {
                  setError('');
                  _setCategories(
                    categories.map(category => {
                      if (category.id === elm.id) {
                        return { ...category, name: e.target.value };
                      } else {
                        return category;
                      }
                    }),
                  );
                  // 複数のカテゴリー欄のうちに一つでも名前が未入力のものがあれば「次へ」ボタンをDisabled
                  if (
                    !e.target.value &&
                    _categories.find(category => category.name === '')
                  ) {
                    handleIsEmptyChange('', CATEGORY_PAGE_NO);
                  } else {
                    handleIsEmptyChange(e.target.value, CATEGORY_PAGE_NO);
                  }
                }}
              />

              <label>月の予算</label>
              <input
                type="tel"
                value={formatNumToMoney(elm.reserved)}
                onChange={e => {
                  _setCategories(
                    categories.map(category => {
                      if (category.id === elm.id) {
                        return {
                          ...category,
                          reserved: formatMoneyToNum(e.target.value),
                        };
                      } else {
                        return category;
                      }
                    }),
                  );
                }}
              />
            </Form.Field>
          ))}
          <Form.Field>
            <Button
              onClick={() => {
                _setCategories([
                  ...categories,
                  { id: uuid(), name: '', reserved: 0, spent: 0 },
                ]);
                handleIsEmptyChange('', CATEGORY_PAGE_NO);
              }}
            >
              +
            </Button>
          </Form.Field>
        </Form>
      </div>
    );
  };

  const renderSetupCategorySpent = (
    _categories: Types.Category[],
    _setCategories: Function,
  ) => {
    return (
      <div className="setup-form">
        <Header as="h2">
          使った金額
          <Header.Subheader>
            カテゴリごとに今月消費済みの金額を入力してください。
          </Header.Subheader>
        </Header>

        <Form>
          {_categories.map((elm: Types.Category, idx: number) => (
            <Form.Field key={elm.id}>
              <label>{elm.name}</label>
              <input
                type="tel"
                value={formatNumToMoney(elm.spent)}
                onChange={e => {
                  _setCategories(
                    categories.map(category => {
                      if (category.id === elm.id) {
                        return {
                          ...category,
                          spent: formatMoneyToNum(e.target.value),
                        };
                      } else {
                        return category;
                      }
                    }),
                  );
                }}
              />
            </Form.Field>
          ))}
        </Form>
      </div>
    );
  };

  /**
   * 登録を確認するステップのコンポーネントを返却します。
   * @param _name 名前
   * @param _income 月の収入
   * @param _categories 支出カテゴリー
   */
  const renderConfirmRegistration = (
    _name: string,
    _income: number,
    _categories: Types.Category[],
  ) => {
    return (
      <div className="setup-form">
        <Header as="h2">
          登録
          <Header.Subheader>以下の内容で登録します。</Header.Subheader>
        </Header>
        <List size="large">
          <List.Item className="confirmation-item">
            <List.Header>名前</List.Header>
            {name}
          </List.Item>
          <List.Item className="confirmation-item">
            <List.Header>収入</List.Header>
            {formatNumToMoney(income)}
          </List.Item>
          <List.Item>
            <List.Header>カテゴリーの予算と使った金額</List.Header>
            <List>
              {categories.map(category => (
                <List.Item key={category.id} className="confirmation-item">
                  <List.Header>{category.name}</List.Header>
                  {`${formatNumToMoney(category.spent)}/${formatNumToMoney(
                    category.reserved,
                  )}`}
                </List.Item>
              ))}
            </List>
          </List.Item>
        </List>
      </div>
    );
  };

  /**
   * ページ番号に紐づいたステップのコンポーネントを返却します。
   * 一つ前のステップのコンポーネントのバリデーションに失敗した場合、nullが返却されます。
   * @param pageNumber コンポーネントのページ番号
   * @param setPageNumber ページ番号のsetter
   */
  const renderContent = (pageNumber: number, setPageNumber: Function) => {
    console.log(error);
    switch (pageNumber) {
      case NAME_PAGE_NO:
        return renderSetupName(name, setName);
      case INCOME_PAGE_NO:
        if (name) {
          return <>{renderSetupIncome(income, setIncome)}</>;
        } else {
          setPageNumber(page - 1);
          setError('name');
          return null;
        }
      case CATEGORY_PAGE_NO:
        return <>{renderSetupCategory(categories, setCategories)}</>;
      case SPENT_PAGE_NO:
        if (categories.filter(elm => elm.name === '').length === 0) {
          return <>{renderSetupCategorySpent(categories, setCategories)}</>;
        } else {
          setPageNumber(page - 1);
          categories.forEach(elm => {
            if (elm.name === '') {
              setError(error + elm.id);
            }
          });
          return null;
        }
      case CONFIRM_PAGE_NO:
        return <>{renderConfirmRegistration(name, income, categories)}</>;
      default:
        return null;
    }
  };

  /**
   * ウィザードの進捗を示すコンポーネントを返却します。
   */
  const Steps = () => {
    return (
      <Step.Group widths="8" size="tiny" unstackable>
        <Step active={page === NAME_PAGE_NO}>
          <i className="fas fa-user" />
        </Step>

        <Step active={page === INCOME_PAGE_NO} disabled={page < INCOME_PAGE_NO}>
          <i className="fas fa-yen-sign" />
        </Step>

        <Step
          active={page === CATEGORY_PAGE_NO}
          disabled={page < CATEGORY_PAGE_NO}
        >
          <i className="fas fa-chart-pie" />
        </Step>

        <Step active={page === SPENT_PAGE_NO} disabled={page < SPENT_PAGE_NO}>
          <i className="fas fa-wallet" />
        </Step>

        <Step
          active={page === CONFIRM_PAGE_NO}
          disabled={page < CONFIRM_PAGE_NO}
        >
          <i className="fas fa-check" />
        </Step>
      </Step.Group>
    );
  };

  return (
    <>
      <Segment id="setup_user_segment">
        <Steps />
        {renderContent(page, setPage)}
        {renderStepButtons(page)}
      </Segment>
    </>
  );
};
