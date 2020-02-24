import { useRouter } from 'next/router';

import Tabs from '@vanarama/uibook/src/atomic/molecules/Tabs/Tabs';
import { Tab } from '@vanarama/uibook/src/atomic/molecules/Tabs/Tab';

import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegistrationForm';

const AuthenticationPage = () => {
  const router = useRouter();
  const { authtype } = router.query;

  return (
    <Tabs defaultActiveTabIndex={authtype === 'register' ? 1 : 0}>
      <Tab tabTitle="Login">
        <div className="Tab__Content" id="tab-content-login">
          <LoginForm />
        </div>
      </Tab>

      <Tab tabTitle="Register">
        <div className="Tab__Content" id="tab-content-register">
          <RegisterForm />
        </div>
      </Tab>
    </Tabs>
  );
};

export default AuthenticationPage;
