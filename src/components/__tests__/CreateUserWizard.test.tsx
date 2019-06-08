import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createStore } from 'redux';
import { Loader } from 'semantic-ui-react';

import CreateUserWizard from '../CreateUserWizard';

describe('<CreateUserWizard />', () => {
  describe('', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const store = createStore(() => ({}));
      wrapper = shallow(<CreateUserWizard store={store} />)
        .dive()
        .dive();
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });
  });
});
