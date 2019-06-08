import React from 'react';
import Amplify from 'aws-amplify';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import awsconfig from './aws-exports';
import reducers from './reducers';
import sagas from './sagas';

Amplify.configure(awsconfig);

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(sagas);

interface Props {
  children: React.ReactElement;
}

export default ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
