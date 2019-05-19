import React from 'react';
import Amplify from 'aws-amplify';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Auth } from 'aws-amplify';

import AppSyncConfig from './aws-exports';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(sagas);

Amplify.configure(AppSyncConfig);

interface Props {
  children: React.ReactElement;
}

export default ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
