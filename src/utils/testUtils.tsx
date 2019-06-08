import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

export const createWrapper = (Component: any, initialState: Object) => {
  const store = createStore(() => initialState);
  return shallow(<Component store={store} />);
};

export const wrapperFactory = (Component: any) => (initialState: Object = {}) =>
  createWrapper(Component, initialState);
