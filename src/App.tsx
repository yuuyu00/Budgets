import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';

import Budget from './components/Budget';
import Root from './Root';

const App = () => {
  return (
    <Root>
      <div className="App">
        <div>App</div>
        <Budget content="aaaa" />
      </div>
    </Root>
  );
};

export default withAuthenticator(App);
