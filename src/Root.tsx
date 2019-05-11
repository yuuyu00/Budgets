import React from 'react';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppSyncConfig from './aws-exports';
import reducers from './reducers';

const store = createStore(reducers);

Amplify.configure(AppSyncConfig);

interface Props {
  children: React.ReactElement;
}

export default ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
