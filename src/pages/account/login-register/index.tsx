import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkSharp';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
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
  useGetPersonLazyQuery,
  handleAccountFetchError,
} from '../../olaf/about';
import { GET_ORDERS_BY_PARTY_UUID_DATA } from '../../../containers/OrdersInformation/gql';
import { useImperativeQuery } from '../../../hooks/useImperativeQuery';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../generated/GetCompaniesByPersonUuid';

interface IProps {
  query: ParsedUrlQuery;
}

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

  const getOrdersData = useImperativeQuery(GET_ORDERS_BY_PARTY_UUID_DATA);
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
      excludeStatuses: ['quote', 'expired', 'new'],
      statuses: null,
    }).then(response => {
      localForage.setItem(
        'ordersLength',
        response.data?.ordersByPartyUuid.length,
      );
    });
    getOrdersData({
      partyUuid,
      statuses: ['quote', 'new'],
      excludeStatuses: ['expired'],
    }).then(response => {
      localForage.setItem(
        'quotesLength',
        response.data?.ordersByPartyUuid.length,
      );
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
              <LoginFormContainer onCompleted={() => getPerson()} />
            </TabPanel>
            <TabPanel index={2}>
              <RegisterFormContainer
                onCompleted={() => setRegistrationSuccess(true)}
                onError={handleRegisterError}
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
