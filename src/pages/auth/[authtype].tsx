import { useRouter } from 'next/router';

import Layout from '../../components/Layout';

import Tabs from "../../components/Tabs/tabs"
import { Tab } from "../../components/Tabs/tab"


const AuthenticationPage = () => {

  const router = useRouter();
  const { authtype } = router.query;

return (
  <Layout title={`${authtype}`}>

    <Tabs defaultActiveTabIndex={authtype === 'register'? 1 : 0}>
      <Tab tabTitle="Login">

        <div className="Tab__Content" id="tab-content-login">
          This is content for Tab 1
        </div>

      </Tab>

      <Tab tabTitle="Register">
        <div className="Tab__Content" id="tab-content-register">
          This is content for Tab 2
        </div>
      </Tab>

    </Tabs>

  </Layout>
)




}


export default AuthenticationPage;
