import React, { useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import { useSavePersonUuidMutation } from '../../../../gql/storedPersonUuid';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import LoginFormContainer from '../../../../containers/LoginFormContainer/LoginFormContainer';
import BusinessAboutFormContainer from '../../../../containers/BusinessAboutFormContainer';
import { SubmitResult } from '../../../../containers/BusinessAboutFormContainer/interfaces';
import { CompanyTypes } from '../../../../models/enum/CompanyTypes';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../../utils/dataLayerHelpers';
import { GetDerivative_derivative as IDerivative } from '../../../../../generated/GetDerivative';
import { OrderInputObject } from '../../../../../generated/globalTypes';
import Skeleton from '../../../../components/Skeleton';
import { isUserAuthenticated } from '../../../../utils/authentication';
import { GetPerson } from '../../../../../generated/GetPerson';
import { useStoredOLAFDataQuery } from '../../../../gql/storedOLAFData';
import ErrorMessages from '../../../../models/enum/ErrorMessages';

const Heading = dynamic(() => import('core/atoms/heading'), {
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
  toast.error(ErrorMessages.requestIssue, '');

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, redirect } = router.query as QueryParams;

  const loginFormRef = useRef<HTMLDivElement>(null);

  const isPersonLoggedIn = isUserAuthenticated();

  const [savePersonUuid] = useSavePersonUuidMutation();
  const { data: storedData } = useStoredOLAFDataQuery();

  const personUuid = useMemo(
    () =>
      storedData?.storedPersonUuid ||
      storedData?.storedPerson?.uuid ||
      undefined,
    [storedData?.storedPersonUuid, storedData?.storedPerson?.uuid],
  );

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const handleLogInCLick = useCallback(() => {
    loginFormRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    toggleLogInVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFormRef?.current]);

  const handleLogInCompletion = useCallback<
    (data?: GetPerson['getPerson']) => Promise<Boolean>
  >(
    person =>
      savePersonUuid({
        variables: {
          uuid: person?.uuid,
        },
      })
        .then(() => router.replace(router.pathname, router.asPath))
        .finally(() => pushAuthorizationEventDataLayer()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname, router.asPath],
  );

  const handleRegistrationClick = useCallback(
    () =>
      router.push(
        `/account/login-register?redirect=${router?.asPath || '/'}`,
        '/account/login-register',
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  const handleCreateUpdateBusinessPersonCompletion = useCallback<
    (result: SubmitResult) => Promise<boolean>
  >(
    result => {
      const slug =
        result.companyType === CompanyTypes.limited ||
        result.companyType === CompanyTypes.partnership
          ? ''
          : 'sole-trader/';
      const url = redirect || `/b2b/olaf/${slug}company-details`;

      return router
        .push(url, url.replace('[companyUuid]', companyUuid || ''))
        .finally(() =>
          setTimeout(() => {
            pushAboutYouDataLayer(detailsData, derivativeData);
          }, 200),
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redirect, companyUuid, detailsData, derivativeData],
  );

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
      {!isPersonLoggedIn && isLogInVisible && (
        <div ref={loginFormRef}>
          <LoginFormContainer
            onCompleted={handleLogInCompletion}
            onError={handleAccountFetchError}
          />
        </div>
      )}
      <BusinessAboutFormContainer
        personUuid={personUuid}
        personLoggedIn={isPersonLoggedIn}
        onCompleted={handleCreateUpdateBusinessPersonCompletion}
        onError={handleCreateUpdateBusinessPersonError}
        onLogInCLick={handleLogInCLick}
        onRegistrationClick={handleRegistrationClick}
      />
    </OLAFLayout>
  );
};

export default BusinessAboutPage;
