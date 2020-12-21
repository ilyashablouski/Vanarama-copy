import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { NextPage, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import withApollo from '../../../hocs/withApollo';
import {
  useGetPersonLazyQuery,
  handleAccountFetchError,
} from '../../olaf/about';
import { GET_MY_ORDERS_DATA } from '../../../containers/OrdersInformation/gql';
import { useImperativeQuery } from '../../../hooks/useImperativeQuery';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../generated/GetCompaniesByPersonUuid';
import { pushAuthorizationEventDataLayer } from '../../../utils/dataLayerHelpers';
import { MyOrdersTypeEnum } from '../../../../generated/globalTypes';
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

export const LoginRegisterPage: NextPage<IProps> = (props: IProps) => {
  const { query } = props;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const getOrdersData = useImperativeQuery(GET_MY_ORDERS_DATA);
  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);

  const [getPerson] = useGetPersonLazyQuery(async data => {
    await localForage.setItem('person', data);
    const partyUuid = [data.getPerson?.partyUuid];
    await getCompaniesData({
      personUuid: data.getPerson?.uuid,
    }).then(resp => {
      resp.data?.companiesByPersonUuid?.forEach(
        (companies: CompaniesByPersonUuid) =>
          partyUuid.push(companies.partyUuid),
      );
    });
    getOrdersData({
      partyUuid,
      filter: MyOrdersTypeEnum.ALL_ORDERS,
    }).then(response => {
      localForage.setItem('ordersLength', response.data?.myOrders.length);
    });
    getOrdersData({
      partyUuid,
      filter: MyOrdersTypeEnum.ALL_QUOTES,
    }).then(response => {
      localForage.setItem('quotesLength', response.data?.myOrders.length);
    });

    // Redirect to the user's previous route or homepage.
    const { redirect } = router.query;
    const nextUrl =
      typeof redirect === 'string' && redirect !== '/_error' ? redirect : '/';

    router.push(nextUrl);
  }, handleAccountFetchError);

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
                onCompleted={() => {
                  pushAuthorizationEventDataLayer();
                  getPerson();
                }}
              />
            </TabPanel>
            <TabPanel index={2}>
              <RegisterFormContainer
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
