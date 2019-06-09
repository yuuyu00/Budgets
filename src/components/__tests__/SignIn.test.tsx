import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Auth } from 'aws-amplify';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import history from '../../history';

import SignIn from '../SignIn';

describe('<SignIn />', () => {
  describe('コンポーネントの存在', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<SignIn />);
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });

    it('<Form />', () => {
      expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('<Form.Field />', () => {
      expect(wrapper.find(Form.Field)).toHaveLength(2);
    });

    it('<Header />', () => {
      expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('<Message />', () => {
      expect(wrapper.find(Message)).toHaveLength(3);
    });

    it('<Button />', () => {
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('ユーザー名を入力', () => {
      wrapper
        .find('#email_input')
        .simulate('change', { target: { value: 'Tony Stark' } });
      wrapper.update();
      expect(wrapper.find('#email_input').prop('value')).toBe('Tony Stark');
    });

    it('パスワードを入力', () => {
      wrapper
        .find('#password_input')
        .simulate('change', { target: { value: 'StarkIndustries' } });
      wrapper.update();
      expect(wrapper.find('#password_input').prop('value')).toBe(
        'StarkIndustries',
      );
    });
  });
});
