import * as React from 'react';
import { connect } from 'react-redux';

import Tabs from '@vanarama/uibook/src/components/molecules/tabs';
import Heading from '@vanarama/uibook/src/components/atoms/heading';

import { RootState } from '../../../services/redux/rootState';
import { login } from '../../../services/redux/account/login/actions';
import { register } from '../../../services/redux/account/register/actions';
import {
  registerSuccessMessage,
  registerErrorMessage,
} from '../../../services/redux/account/selectors';
import Login from '../../../components/account/login';
import Register from '../../../components/account/register';

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
      <div className="heading">
        <Heading size="xlarge">Login / Register</Heading>
      </div>
      <Tabs tabs={['Login', 'Register']}>
        <div>
          <Login login={login} authenticated={authenticated} token={token} />
        </div>

        <div>
          <Register register={register} />
        </div>
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
