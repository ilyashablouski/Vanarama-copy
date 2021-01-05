/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import * as toast from 'core/atoms/toast/Toast';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import LoginFormContainer from '../../../../containers/LoginFormContainer/LoginFormContainer';
import BusinessAboutFormContainer from '../../../../containers/BusinessAboutFormContainer';
import { SubmitResult } from '../../../../containers/BusinessAboutFormContainer/interfaces';
import { useGetPersonLazyQuery } from '../../../olaf/about';
import { CompanyTypes } from '../../../../models/enum/CompanyTypes';
import { GetPerson } from '../../../../../generated/GetPerson';
import { useImperativeQuery } from '../../../../hooks/useImperativeQuery';
import { GET_MY_ORDERS_DATA } from '../../../../containers/OrdersInformation/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../../generated/GetCompaniesByPersonUuid';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../../utils/dataLayerHelpers';
import { GetDerivative_derivative } from '../../../../../generated/GetDerivative';
import {
  MyOrdersTypeEnum,
  OrderInputObject,
} from '../../../../../generated/globalTypes';
import useGetOrderId from '../../../../hooks/useGetOrderId';
import Skeleton from '../../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const handleCreateUpdateBusinessPersonError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'about-you-error' },
  );

const handleAccountFetchError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const { companyUuid } = router.query as QueryParams;

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>();
  const [personLoggedIn, setPersonLoggedIn] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [
    derivativeData,
    setDerivativeData,
  ] = useState<GetDerivative_derivative | null>(null);

  const getOrdersData = useImperativeQuery(GET_MY_ORDERS_DATA);
  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);

  const [getPerson] = useGetPersonLazyQuery(async data => {
    setPersonUuid(data?.getPerson?.uuid);
    await localForage.setItem('person', data);

    const companyData = await getCompaniesData({
      personUuid: data.getPerson?.uuid,
    });

    const partyUuid = [
      data.getPerson?.partyUuid,
      ...companyData.data?.companiesByPersonUuid?.map(
        (companies: CompaniesByPersonUuid) => companies.partyUuid,
      ),
    ];

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
    router.replace(router.pathname, router.asPath);
  }, handleAccountFetchError);

  const handleRegistrationClick = () =>
    router.push(`/account/login-register?redirect=${router?.asPath || '/'}`);

  const handleCreateUpdateBusinessPersonCompletion = async (
    result: SubmitResult,
  ) => {
    pushAboutYouDataLayer(detailsData, derivativeData);

    const slug =
      result.companyType === CompanyTypes.limited ||
      result.companyType === CompanyTypes.partnership
        ? ''
        : 'sole-trader/';
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/${slug}summary/[companyUuid]`
        : `/b2b/olaf/${slug}company-details/[personUuid]`;

    const personId = personUuid || result.businessPersonUuid || '';

    router.push(
      url,
      url
        .replace('[companyUuid]', companyUuid || '')
        .replace('[personUuid]', personId),
    );
  };

  useEffect(() => {
    Promise.all([
      localForage.getItem<GetPerson>('person'),
      localForage.getItem<string>('personUuid'),
    ]).then(([person, savedPersonUuid]) => {
      if (person?.getPerson && !personUuid) {
        setPersonUuid(person.getPerson?.uuid);
        setPersonLoggedIn(true);
      } else if (savedPersonUuid && !personUuid) {
        setPersonUuid(savedPersonUuid);
        setPersonLoggedIn(false);
      }
    });
  }, [personUuid]);

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <Heading
        color="black"
        dataTestId="about-you_heading"
        size="xlarge"
        tag="h1"
      >
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you and your company.
      </Text>
      {!personLoggedIn && (
        <div className="-mb-500">
          <div className="-pt-300 -pb-300">
            <Button
              label="Login For A Speedy Checkout"
              color="teal"
              onClick={() => toggleLogInVisibility(!isLogInVisible)}
            />
          </div>
          {isLogInVisible && (
            <LoginFormContainer
              onCompleted={() => {
                pushAuthorizationEventDataLayer();
                getPerson();
                setPersonLoggedIn(true);
              }}
            />
          )}
        </div>
      )}
      <BusinessAboutFormContainer
        personUuid={personUuid}
        orderId={orderId}
        personLoggedIn={personLoggedIn}
        onCompleted={handleCreateUpdateBusinessPersonCompletion}
        onError={handleCreateUpdateBusinessPersonError}
        onLogInCLick={() => toggleLogInVisibility(true)}
        onRegistrationClick={handleRegistrationClick}
        isEdited={router.query.redirect === 'summary'}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
