import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';

import { createUser } from '../actions';

interface Props {
  createUser: Function;
  store?: Object;
}

const CreateUserWizard = (props: Props) => {
  return (
    <div>
      <div>CreateUserWizard</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { createUser },
)(CreateUserWizard);
