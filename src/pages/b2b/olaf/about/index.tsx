import React, { useState, useEffect, useRef } from 'react';
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
import { CompanyTypes } from '../../../../models/enum/CompanyTypes';
import { GetPerson } from '../../../../../generated/GetPerson';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../../utils/dataLayerHelpers';
import { GetDerivative_derivative as IDerivative } from '../../../../../generated/GetDerivative';
import { OrderInputObject } from '../../../../../generated/globalTypes';
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
    '',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const { companyUuid } = router.query as QueryParams;

  const loginFormRef = useRef<HTMLDivElement>(null);

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>();
  const [personLoggedIn, setPersonLoggedIn] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const handleRegistrationClick = () =>
    router.push(
      `/account/login-register?redirect=${router?.asPath || '/'}`,
      '/account/login-register',
    );

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
        <div className="-mb-500" ref={loginFormRef}>
          <div className="-pt-300 -pb-300">
            <Button
              label="Login For A Speedy Checkout"
              color="teal"
              onClick={() => toggleLogInVisibility(!isLogInVisible)}
            />
            <Text color="darker" size="lead" className="-mt-300" tag="p">
              Or checkout as a guest
            </Text>
          </div>
          {isLogInVisible && (
            <LoginFormContainer
              onCompleted={person => {
                pushAuthorizationEventDataLayer();
                setPersonUuid(person?.uuid);
                setPersonLoggedIn(true);
                return router.replace(router.pathname, router.asPath);
              }}
              onError={handleAccountFetchError}
            />
          )}
        </div>
      )}
      <BusinessAboutFormContainer
        orderId={orderId}
        personUuid={personUuid}
        personLoggedIn={personLoggedIn}
        onCompleted={handleCreateUpdateBusinessPersonCompletion}
        onError={handleCreateUpdateBusinessPersonError}
        onLogInCLick={() => {
          loginFormRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          toggleLogInVisibility(true);
        }}
        onRegistrationClick={handleRegistrationClick}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
