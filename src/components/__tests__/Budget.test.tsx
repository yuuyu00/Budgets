import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Loader } from 'semantic-ui-react';
import { createStore } from 'redux';

import Budgets from '../Budget';
import CreateUserWizard from '../CreateUserWizard';

// const createWrapper = (initialState: Object = {}) => {
//   const store = createStore(() => initialState);
//   return shallow(<Budgets store={store} />);
// };

describe('<Budgets />', () => {
  describe('ユーザデータがフェッチされない間', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const store = createStore(() => ({ user: { loading: true } }));
      wrapper = shallow(<Budgets store={store} />)
        .dive()
        .dive();
    });

    it('ユーザデータがフェッチされない間Loaderが表示される', () => {
      expect(wrapper.find(Loader)).toHaveLength(1);
    });
  });

  describe('ユーザデータが存在する場合', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const store = createStore(() => ({
        user: {
          id: 'userdata_test_id',
          name: 'Tony Stark',
          income: 300000,
          balance: 240000,
        },
      }));
      wrapper = shallow(<Budgets store={store} />)
        .dive()
        .dive();
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });

    it('ユーザデータが表示される', () => {
      expect(wrapper.find('#user_id').text()).toBe('userdata_test_id');
      expect(wrapper.find('#user_name').text()).toBe('Tony Stark');
      expect(wrapper.find('#user_income').text()).toBe('300000');
      expect(wrapper.find('#user_balance').text()).toBe('240000');
    });
  });

  describe('ユーザデータが存在しない場合', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const store = createStore(() => ({ user: {} }));
      wrapper = shallow(<Budgets store={store} />)
        .dive()
        .dive();
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });

    it('ユーザデータ作成コンポーネントが表示される', () => {
      expect(wrapper.find(CreateUserWizard)).toHaveLength(1);
    });
  });
});
