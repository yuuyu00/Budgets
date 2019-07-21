import { ReactWrapper } from 'enzyme';
import { Loader } from 'semantic-ui-react';

import history from '../../history';
import Budgets from '../Budget';
import { useCreateWrapper } from '../../utils/testUtils';

const createWrapper = useCreateWrapper(Budgets);

describe('<Budgets />', () => {
  describe('ユーザデータがフェッチされない間', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = createWrapper({ user: { loading: true } });
    });

    it('ユーザデータがフェッチされない間Loaderが表示される', () => {
      expect(wrapper.find(Loader)).toHaveLength(1);
    });
  });

  describe('ユーザデータが存在する場合', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = createWrapper({
        user: {
          id: 'userdata_test_id',
          name: 'Tony Stark',
          income: 300000,
          balance: 240000,
        },
      });
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
    let wrapper: ReactWrapper;
    const historySpy = jest.spyOn(history, 'push');

    beforeEach(() => {
      wrapper = createWrapper({ user: { loading: false } });
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });

    it('/setupに移動する', () => {
      expect(historySpy).toBeCalledWith('/setup');
    });
  });
});
