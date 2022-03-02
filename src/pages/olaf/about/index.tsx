import dynamic from 'next/dynamic';
import { useState, useRef, useCallback, useMemo } from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import Cookies from 'js-cookie';
import { ApolloError } from '@apollo/client';
import { useSavePersonUuidMutation } from '../../../gql/storedPersonUuid';
import { useSaveOrderMutation } from '../../../gql/storedOrder';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../utils/dataLayerHelpers';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { CreateUpdatePersonMutation_createUpdatePerson as IPerson } from '../../../../generated/CreateUpdatePersonMutation';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { usePersonByUuidData } from '../../../gql/person';
import { useCreateUpdateOrder } from '../../../gql/order';
import {
  LeaseTypeEnum,
  CreditApplicationTypeEnum as CATypeEnum,
  OrderInputObject,
} from '../../../../generated/globalTypes';
import { GetDerivative_derivative as IDerivative } from '../../../../generated/GetDerivative';
import Skeleton from '../../../components/Skeleton';
import { isUserAuthenticated } from '../../../utils/authentication';
import { GetPerson } from '../../../../generated/GetPerson';
import { useStoredOLAFDataQuery } from '../../../gql/storedOLAFData';
import { useSavePersonEmailMutation } from '../../../gql/storedPersonEmail';
import ErrorMessages from '../../../models/enum/ErrorMessages';
import {
  addHeapUserIdentity,
  addHeapUserProperties,
} from '../../../utils/addHeapProperties';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

export const handleAccountFetchError = () =>
  toast.error(ErrorMessages.requestIssue, '');

const DEFAULT_LINE_ITEMS = [
  {
    quantity: 1,
  },
];

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const { redirect } = router.query as OLAFQueryParams;

  const loginFormRef = useRef<HTMLDivElement>(null);

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const isPersonLoggedIn = isUserAuthenticated();

  const [setPersonUuid] = useSavePersonUuidMutation();
  const [saveOrderMutation] = useSaveOrderMutation();
  const [savePersonEmailMutation] = useSavePersonEmailMutation();
  const {
    data: storedData,
    refetch: refetchStoredOLAFData,
  } = useStoredOLAFDataQuery();
  const order = storedData?.storedOrder?.order;

  const personUuid = useMemo(
    () => storedData?.storedPerson?.uuid || storedData?.storedPersonUuid || '',
    [storedData?.storedPerson, storedData?.storedPersonUuid],
  );

  const { refetch } = usePersonByUuidData(personUuid);

  const [updateOrderHandle] = useCreateUpdateOrder();
  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const handleLogInCLick = useCallback(() => {
    loginFormRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    toggleLogInVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFormRef?.current]);

  const handleRegistrationClick = useCallback(
    () =>
      router.push(
        `/account/login-register?redirect=${router?.asPath || '/'}`,
        '/account/login-register',
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router?.asPath],
  );

  const handleLogInCompletion = useCallback<
    (data?: GetPerson['getPerson']) => Promise<Boolean>
  >(
    person =>
      setPersonUuid({
        variables: {
          uuid: person?.uuid,
        },
      })
        .then(() => refetchStoredOLAFData())
        .then(() => router.replace(router.pathname, router.asPath))
        .finally(() => pushAuthorizationEventDataLayer()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname, router.asPath],
  );

  const savePersonDataInLocalStorage = (data: IPerson) => {
    setPersonUuid({
      variables: {
        uuid: data.uuid,
      },
    });
    savePersonEmailMutation({
      variables: {
        email: data.emailAddresses[0].value,
      },
    });
  };

  const clickOnComplete = (createUpdatePerson: IPerson) => {
    savePersonDataInLocalStorage(createUpdatePerson);
    return refetch({
      uuid: createUpdatePerson.uuid,
    })
      .then(resp =>
        updateOrderHandle({
          variables: {
            input: {
              personUuid,
              leaseType: order?.leaseType || LeaseTypeEnum.PERSONAL,
              lineItems: order?.lineItems || DEFAULT_LINE_ITEMS,
              partyUuid: resp.data?.personByUuid?.partyUuid,
              uuid: order?.uuid,
            },
          },
        })
          .then(response =>
            saveOrderMutation({
              variables: {
                order: {
                  ...(order! || {}),
                  uuid: response?.data?.createUpdateOrder?.uuid,
                },
                rating: storedData?.storedOrder?.rating,
              },
            }),
          )
          .then(result =>
            createUpdateCA({
              variables: {
                input: {
                  orderUuid: result.data?.saveOrder?.order?.uuid || '',
                  aboutDetails: createUpdatePerson,
                  creditApplicationType: CATypeEnum.B2C_PERSONAL,
                },
              },
            }),
          ),
      )
      .then(() => getUrlParam({ uuid: createUpdatePerson.uuid }))
      .then(params => redirect || `/olaf/address-history${params}`)
      .then(url => router.push(url, url))
      .finally(() => {
        addHeapUserIdentity(createUpdatePerson?.emailAddresses?.[0]?.value);
        addHeapUserProperties({
          uuid: createUpdatePerson?.uuid,
          bcuid: Cookies.get('BCSessionID') || 'undefined',
        });
        pushAboutYouDataLayer(detailsData, derivativeData);
      });
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <Heading
        color="black"
        size="xlarge"
        dataTestId="aboutHeading"
        tag="h1"
        dataUiTestId="olaf_about_heading"
      >
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you. This will be used for your credit check.
      </Text>
      {!isPersonLoggedIn && isLogInVisible && (
        <div ref={loginFormRef}>
          <LoginFormContainer
            onCompleted={handleLogInCompletion}
            onError={handleAccountFetchError}
          />
        </div>
      )}
      <SecureModalLayout>
        <AboutFormContainer
          isEdit={!!redirect}
          orderId={order?.uuid || ''}
          personUuid={personUuid}
          onCompleted={data => clickOnComplete(data?.createUpdatePerson!)}
          onLogInClick={handleLogInCLick}
          onRegistrationClick={handleRegistrationClick}
        />
      </SecureModalLayout>
    </OLAFLayout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IOlafPageProps>> {
  const client = createApolloClient({}, context);

  try {
    const { serviceBanner } = await getServiceBannerData(client);

    return {
      props: {
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default AboutYouPage;
