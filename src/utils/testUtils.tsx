import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export const useCreateWrapper = (Component: React.FC) => (
  initialValue: object = {},
) => {
  const store = createStore(() => initialValue);
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>,
  );
};
