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
import { GetOlafData_orderByUuid } from '../../../../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../../../../generated/GetDerivative';
import { MyOrdersTypeEnum } from '../../../../../generated/globalTypes';
import { isUserAuthenticated } from '../../../../utils/authentication';
import useGetOrderId from '../../../../hooks/useGetOrderId';

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
  const [
    detailsData,
    setDetailsData,
  ] = useState<GetOlafData_orderByUuid | null>(null);
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
    if (!personUuid) {
      localForage.getItem('person').then(value => {
        if ((value as GetPerson)?.getPerson)
          setPersonUuid((value as GetPerson)?.getPerson?.uuid);
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
              onCompleted={() => {
                pushAuthorizationEventDataLayer();

                if (isUserAuthenticated()) {
                  getPerson();
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
