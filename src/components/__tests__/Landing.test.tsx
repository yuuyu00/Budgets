import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Auth } from 'aws-amplify';
import history from '../../history';

import Landing from '../Landing';

describe('<Landing />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  it('正常にレンダリングされる', () => {
    expect(wrapper).toBeTruthy();
  });

  it('クイックサインアップボタンが存在する', () => {
    expect(wrapper.find('#quick_signup_button')).toHaveLength(1);
  });

  it('サインアップボタンが存在する', () => {
    expect(wrapper.find('#signup_button')).toHaveLength(1);
  });

  it('クイックサインアップボタンクリック', () => {
    const signUpSpy = jest
      .spyOn(Auth, 'signUp')
      .mockImplementation(() => Promise.resolve());

    jest.spyOn(Auth, 'signIn').mockReturnValue(Promise.resolve());

    wrapper.find('#quick_signup_button').simulate('click');
    expect(signUpSpy).toHaveBeenCalled();
  });

  it('サインアップボタンクリック', () => {
    const historySpy = jest
      .spyOn(history, 'push')
      .mockImplementation(path => path);

    wrapper.find('#signup_button').simulate('click');
    expect(historySpy).toHaveBeenCalledWith('/signup');
  });
});
