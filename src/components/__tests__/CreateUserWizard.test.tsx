import { ReactWrapper } from 'enzyme';
import { Loader } from 'semantic-ui-react';

import { useCreateWrapper } from '../../utils/testUtils';
import CreateUserWizard from '../CreateUserWizard';

const createWrapper = useCreateWrapper(CreateUserWizard);

describe('<CreateUserWizard />', () => {
  describe('', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = createWrapper({});
    });

    it('正常にレンダリングされる', () => {
      expect(wrapper).toBeTruthy();
    });
  });
});
