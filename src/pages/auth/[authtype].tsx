import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { Box } from 'react-raster';

import Tabs from "@vanarama/uibook/src/atomic/molecules/Tabs/Tabs";
import { Tab } from "@vanarama/uibook/src/atomic/molecules/Tabs/Tab";

import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegistrationForm';

const AuthenticationPage = () => {

  const router = useRouter();
  const { authtype } = router.query;

return (
  <Layout title={`Vanarama ${authtype}`}>

    <Box cols={6} alignX='center' alignY='center'>
      <Tabs defaultActiveTabIndex={authtype === 'register'? 1 : 0}>
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
    </Box>

  </Layout>
)




}


export default AuthenticationPage;
