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

  const getOrdersData = useImperativeQuery(GET_ORDERS_BY_PARTY_UUID_DATA);
  const getQuotesData = useImperativeQuery(GET_ORDERS_BY_PARTY_UUID_DATA);

  const [getPersonByToken] = usePersonByTokenLazyQuery(async data => {
    setPersonUuid(data?.personByToken?.uuid);
    await localForage.setItem('person', data);
    getOrdersData({
      partyUuid: data.personByToken?.partyUuid,
      excludeStatuses: ['quote', 'expired'],
    }).then(response => {
      localForage.setItem(
        'ordersLength',
        response.data?.ordersByPartyUuid.length,
      );
    });
    getQuotesData({
      partyUuid: data.personByToken?.partyUuid,
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

  const handleCreateUpdateBusinessPersonCompletion = (result: SubmitResult) => {
    const params = getUrlParam({ orderId });
    const journeyUrl =
      result.companyType === CompanyTypes.limited
        ? `company-details/[personUuid]/${params}`
        : 'sole-trader/company-details/[orderId]';
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/summary/[companyUuid]${params}`
        : `/b2b/olaf/${journeyUrl}`;

    router.push(
      url,
      url
        .replace('[companyUuid]', companyUuid || result.companyUuid || '')
        .replace('[personUuid]', personUuid || '')
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
    <OLAFLayout>
      <Heading color="black" dataTestId="about-you_heading" size="xlarge">
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
