import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Route, Router, Switch } from 'react-router-dom';
import { Menu, Button, Icon, Container } from 'semantic-ui-react';
import { withAuthenticator } from 'aws-amplify-react';

import history from './history';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Landing from './components/Landing';
import Budget from './components/Budget';
import CreateUserWizard from './components/CreateUserWizard';

const App = () => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    const gotUser = await Auth.currentAuthenticatedUser();
    if (gotUser) {
      setUser(gotUser);
    } else {
      setUser(null);
    }
  };

  const onHubCapsule = (capsule: any) => {
    switch (capsule.payload.event) {
      case 'signIn':
        getUserData();
        break;
      case 'signOut':
        setUser(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getUserData();
    Hub.listen('auth', onHubCapsule);
  }, []);

  const renderMenu = (isSignedIn: boolean) => {
    if (isSignedIn) {
      return (
        <Menu fixed="top" borderless style={{ backgroundColor: '#f2711c' }}>
          <Menu.Item>
            <Icon name="bars" style={{ color: 'white' }} />
          </Menu.Item>
          <Menu.Item>
            <Icon name="checkmark" size="large" style={{ color: 'white' }} />
            <span style={{ fontSize: '18px', color: 'white' }}>Budgets</span>
          </Menu.Item>
          <Menu.Item position="right" style={{ paddingRight: '10%' }} />
          <Menu.Item>
            <Button
              onClick={async () => {
                await Auth.signOut();
                history.push('/');
              }}
            >
              サインアウト
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu fixed="top" borderless style={{ backgroundColor: '#00b5ad' }}>
          <Menu.Item onClick={() => history.push('/')}>
            <span style={{ fontSize: '18px', color: 'white' }}>Todo</span>
          </Menu.Item>
          <Menu.Item position="right" style={{ paddingRight: '10%' }} />
          <Menu.Item>
            <Button onClick={() => history.push('/signin')}>サインイン</Button>
          </Menu.Item>
        </Menu>
      );
    }
  };

  if (user) {
    return (
      <Router history={history}>
        {renderMenu(true)}
        <Container id="wrap_container">
          <Switch>
            <Route path="/" exact component={Budget} />
            <Route path="/setup" component={CreateUserWizard} />
          </Switch>
        </Container>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        {renderMenu(false)}
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signin" exact user={user} component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Router>
    );
  }
};

export default withAuthenticator(App);
