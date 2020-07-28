import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkSharp';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import Message from '../../../core/components/Message';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import withApollo from '../../../hocs/withApollo';
import {
  usePersonByTokenLazyQuery,
  handleAccountFetchError,
} from '../../olaf/about';

interface IProps {
  query: ParsedUrlQuery;
}

export const LoginRegisterPage: NextPage<IProps> = (props: IProps) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [getPersonByToken] = usePersonByTokenLazyQuery(
    data => localForage.setItem('person', data),
    handleAccountFetchError,
  );
  const { query } = props;
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();

  return (
    <>
      <div className="row:title">
        <Heading
          tag="span"
          size="xlarge"
          color="black"
          dataTestId="login-register-heading"
        >
          Login / Register
        </Heading>
        {query.status === 'success' && (
          <Message message="Email successfully verified." />
        )}

        {registrationSuccess && (
          <Message message="Registration successful. Please verify your email." />
        )}

        {query.hasResetPassword && (
          <Message message="Password Successfully Reset">
            <Icon icon={<CheckmarkSharp />} size="regular" color="teal" />
          </Message>
        )}
      </div>
      <div className="row:tabbed-left">
        <Tabs activeIndex={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab index={1} dataTestId="login-tab">
              Login
            </Tab>
            <Tab index={2} dataTestId="register-tab">
              Register
            </Tab>
          </TabList>
          <TabPanels className="-pv-400">
            <TabPanel index={1}>
              <LoginFormContainer
                onCompleted={async data => {
                  if (data.login !== null) {
                    // Put the token in localStorage
                    await localForage.setItem('token', data.login);

                    getPersonByToken({
                      variables: {
                        token: data.login,
                      },
                    });
                  }

                  // Redirect to the user's previous route or homepage.
                  const { redirect } = router.query;
                  const nextUrl =
                    typeof redirect === 'string' && redirect !== '/_error'
                      ? redirect
                      : '/';

                  router.push(nextUrl);
                }}
              />
            </TabPanel>
            <TabPanel index={2}>
              <RegisterFormContainer
                onCompleted={() => setRegistrationSuccess(true)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

LoginRegisterPage.getInitialProps = ({ query }) => {
  return { query };
};

export default withApollo(LoginRegisterPage);
