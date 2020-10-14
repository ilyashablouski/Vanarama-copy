/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';
import LoginFormContainer from '../../../../containers/LoginFormContainer/LoginFormContainer';
import BusinessAboutFormContainer from '../../../../containers/BusinessAboutFormContainer';
import { SubmitResult } from '../../../../containers/BusinessAboutFormContainer/interfaces';
import { usePersonByTokenLazyQuery } from '../../../olaf/about';
import { CompanyTypes } from '../../../../models/enum/CompanyTypes';
import { PersonByToken } from '../../../../../generated/PersonByToken';
import { useImperativeQuery } from '../../../../hooks/useImperativeQuery';
import { GET_ORDERS_BY_PARTY_UUID_DATA } from '../../../../containers/OrdersInformation/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../../generated/GetCompaniesByPersonUuid';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../../utils/dataLayerHelpers';
import { GetOlafData_orderByUuid } from '../../../../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../../../../generated/GetDerivative';

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
  const { orderId, companyUuid } = router.query as QueryParams;

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>();
  const [
    detailsData,
    setDetailsData,
  ] = useState<GetOlafData_orderByUuid | null>(null);
  const [
    derivativeData,
    setDerivativeData,
  ] = useState<GetDerivative_derivative | null>(null);

  const getOrdersData = useImperativeQuery(GET_ORDERS_BY_PARTY_UUID_DATA);
  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);

  const [getPersonByToken] = usePersonByTokenLazyQuery(async data => {
    setPersonUuid(data?.personByToken?.uuid);
    await localForage.setItem('person', data);

    const companyData = await getCompaniesData({
      personUuid: data.personByToken?.uuid,
    });

    const partyUuid = [
      data.personByToken?.partyUuid,
      ...companyData.data?.companiesByPersonUuid?.map(
        (companies: CompaniesByPersonUuid) => companies.partyUuid,
      ),
    ];

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
    router.replace(router.pathname, router.asPath);
  }, handleAccountFetchError);

  const handleCreateUpdateBusinessPersonCompletion = async (
    result: SubmitResult,
  ) => {
    pushAboutYouDataLayer(detailsData, derivativeData);
    const params = getUrlParam({ orderId });
    const slug =
      result.companyType === CompanyTypes.limited ||
      result.companyType === CompanyTypes.partnership
        ? ''
        : 'sole-trader/';
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/${slug}summary/[companyUuid]${params}`
        : `/b2b/olaf/${slug}company-details/[personUuid]${params}`;

    const personId = personUuid || result.businessPersonUuid || '';

    router.push(
      url,
      url
        .replace('[companyUuid]', companyUuid || '')
        .replace('[personUuid]', personId)
        .replace('[orderId]', orderId || ''),
    );
  };

  useEffect(() => {
    if (!personUuid) {
      localForage.getItem('person').then(value => {
        if ((value as PersonByToken)?.personByToken)
          setPersonUuid((value as PersonByToken)?.personByToken?.uuid);
      });
    }
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
      {!personUuid && (
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
              onCompleted={data => {
                pushAuthorizationEventDataLayer();
                // request person account after login
                if (data.login !== null) {
                  getPersonByToken({
                    variables: {
                      token: data.login,
                    },
                  });
                }
              }}
            />
          )}
        </div>
      )}
      <BusinessAboutFormContainer
        personUuid={personUuid}
        orderId={orderId}
        onCompleted={handleCreateUpdateBusinessPersonCompletion}
        onError={handleCreateUpdateBusinessPersonError}
        onLogInCLick={() => toggleLogInVisibility(true)}
        isEdited={router.query.redirect === 'summary'}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
