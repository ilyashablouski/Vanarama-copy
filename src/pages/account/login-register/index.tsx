import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'services/redux/rootState';
//import { Tabs } from  '@vanarama/uibook/src/components/molecules/Tabs';
import Heading from '@vanarama/uibook/src/components/atoms/heading';
import Login from 'components/account/login';
import { login } from 'services/redux/account/login/actions';

interface Props {
  authenticated: boolean,
  token: string,
  login: (email: string, password: string) => void;
}

export const IndexPage: React.FC<Props> = ({ login, authenticated, token }) => {
  return (
    <>
      <div className="heading"><Heading size="xlarge">Login / Register</Heading></div>
      {/* <Tabs defaultActiveTabIndex={0}>
        <Tab title="Login">
          <TabContent id="tab-content-login">
            <Login login={ login } authenticated={ authenticated } token= { token } />
          </TabContent>
        </Tab>
        <Tab title="Register">
          <TabContent id="tab-content-register">
            This is content for register page
          </TabContent>
        </Tab>
      </Tabs> */}
    </>
  )
};

const mapStateToProps = ({ auth: { authenticated, data } }: RootState) => {
  return {
    authenticated,
    token: data && data.token,
  }
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
