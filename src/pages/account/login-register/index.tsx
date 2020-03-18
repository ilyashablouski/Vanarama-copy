import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'services/redux/rootState';
import {
  Tabs,
  Tab,
  TabContent,
} from '@vanarama/uibook/packages/ui-components/src/css/molecules/Tabs';
import Heading from '@vanarama/uibook/packages/ui-components/src/css/atoms/Heading';
import Login from 'components/account/login';
import Register from 'components/account/register';
import { login } from 'services/redux/account/login/actions';
import { register } from 'services/redux/account/register/actions';
import {
  registerSuccessMessage,
  registerErrorMessage,
} from 'services/redux/account/selectors';
import { registerStatusMessage } from './utils';

interface Props {
  authenticated: boolean;
  token: string;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  successMessage: string;
  errorMessage: string;
}

export const IndexPage: React.FC<Props> = ({
  login,
  register,
  successMessage,
  errorMessage,
  authenticated,
  token,
}) => {
  return (
    <>
      <div
        className="heading"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Heading size="xlarge">Login / Register</Heading>
      </div>
      {registerStatusMessage(successMessage, errorMessage)}
      <Tabs defaultActiveTabIndex={0}>
        <Tab title="Login">
          <TabContent id="tab-content-login">
            <Login login={login} authenticated={authenticated} token={token} />
          </TabContent>
        </Tab>
        <Tab title="Register">
          <TabContent id="tab-content-register">
            <Register register={register} />
          </TabContent>
        </Tab>
      </Tabs>
    </>
  );
};

const mapStateToProps = ({
  register: { success, error },
  auth: { authenticated, data },
}: RootState) => {
  return {
    authenticated,
    token: data && data.token,
    successMessage: registerSuccessMessage(success),
    errorMessage: registerErrorMessage(error),
  };
};

const mapDispatchToProps = {
  login,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
