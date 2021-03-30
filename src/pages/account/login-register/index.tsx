import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { NextPage, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { handleAccountFetchError } from '../../olaf/about';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import withApollo from '../../../hocs/withApollo';
import { pushAuthorizationEventDataLayer } from '../../../utils/dataLayerHelpers';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';

const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const CheckmarkSharp = dynamic(
  () => import('core/assets/icons/CheckmarkSharp'),
  {
    ssr: false,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Tabs = dynamic(() => import('core/molecules/tabs'), {
  loading: () => <Skeleton count={1} />,
});
const Tab = dynamic(() => import('core/molecules/tabs/Tab'), {
  loading: () => <Skeleton count={1} />,
});
const TabList = dynamic(() => import('core/molecules/tabs/TabList'));
const TabPanel = dynamic(() => import('core/molecules/tabs/TabPanel'), {
  loading: () => <Skeleton count={1} />,
});
const TabPanels = dynamic(() => import('core/molecules/tabs/TabPanels'), {
  loading: () => <Skeleton count={3} />,
});
const Message = dynamic(() => import('../../../core/components/Message'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  query: ParsedUrlQuery;
}

const metaData = {
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: 'Log in | Vanarama',
  schema: null,
  breadcrumbs: null,
};

const handleRegisterError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'You can not be registered now. Please try submitting the form again.',
  );

interface IQueryParams {
  redirect?: string;
}

export const LoginRegisterPage: NextPage<IProps> = (props: IProps) => {
  const { query } = props;
  const router = useRouter();
  const { redirect } = router.query as IQueryParams;

  const [activeTab, setActiveTab] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleLoginComplete = useCallback(() => {
    // Redirect to the user's previous route or homepage.
    const nextUrl =
      typeof redirect === 'string' && redirect !== '/_error' ? redirect : '/';

    pushAuthorizationEventDataLayer();

    return router.push(nextUrl);
  }, []);

  return (
    <>
      <div className="row:title">
        <Heading
          tag="h1"
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
                onCompleted={handleLoginComplete}
                onError={handleAccountFetchError}
              />
            </TabPanel>
            <TabPanel index={2}>
              <RegisterFormContainer
                redirectUrl={redirect}
                onCompleted={() => {
                  pushAuthorizationEventDataLayer(true);
                  setRegistrationSuccess(true);
                }}
                onError={handleRegisterError}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  return { props: { query } };
}

export default withApollo(LoginRegisterPage);
