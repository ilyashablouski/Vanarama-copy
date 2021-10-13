import dynamic from 'next/dynamic';
import { useState, useRef, useCallback } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { gql, useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import * as toast from 'core/atoms/toast/Toast';
import { useGetOrderQuery } from 'gql/storedOrder';
import {
  useStoredPersonUuidQuery,
  useSavePersonUuidMutation,
} from 'gql/storedPersonUuid';
import {
  pushAboutYouDataLayer,
  pushAuthorizationEventDataLayer,
} from '../../../utils/dataLayerHelpers';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
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
import useGetOrderId from '../../../hooks/useGetOrderId';
import { isUserAuthenticated } from '../../../utils/authentication';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

export const handleAccountFetchError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    '',
  );

const savePersonUuid = (data: IPerson) => {
  localForage.setItem('personUuid', data.uuid);
  localForage.setItem('personEmail', data.emailAddresses[0].value);
};

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { data: orderData } = useGetOrderQuery();
  const order = orderData?.storedOrder?.order;
  const orderId = useGetOrderId();

  const loginFormRef = useRef<HTMLDivElement>(null);

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const isPersonLoggedIn = isUserAuthenticated();

  const [setPersonUuid] = useSavePersonUuidMutation();
  const { data } = useStoredPersonUuidQuery();

  const { refetch } = usePersonByUuidData(data?.storedPersonUuid || '');

  const [updateOrderHandle] = useCreateUpdateOrder(() => {});
  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const { redirect } = router.query as OLAFQueryParams;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
    [router?.asPath],
  );

  const clickOnComplete = async (createUpdatePerson: IPerson) => {
    savePersonUuid(createUpdatePerson);
    await refetch({
      uuid: createUpdatePerson.uuid,
    })
      .then(resp =>
        updateOrderHandle({
          variables: {
            input: {
              personUuid: data?.storedPersonUuid || '',
              leaseType: order?.leaseType || LeaseTypeEnum.PERSONAL,
              lineItems: order?.lineItems || [
                {
                  quantity: 1,
                },
              ],
              partyUuid: resp.data?.personByUuid?.partyUuid,
              uuid: orderId,
            },
          },
        })
          .then(response =>
            localForage.setItem<string | undefined>(
              'orderId',
              response.data?.createUpdateOrder?.uuid,
            ),
          )
          .then(savedOrderId =>
            createUpdateCA({
              variables: {
                input: {
                  orderUuid: savedOrderId || '',
                  aboutDetails: createUpdatePerson,
                  creditApplicationType: CATypeEnum.B2C_PERSONAL,
                },
              },
            }),
          ),
      )
      .then(() =>
        client.writeQuery({
          query: gql`
            query WriteCachedPersonInformation {
              uuid @client
            }
          `,
          data: {
            uuid: data?.storedPersonUuid,
          },
        }),
      )
      .then(() => getUrlParam({ uuid: createUpdatePerson.uuid }))
      .then(params => redirect || `/olaf/address-history${params}`)
      .then(url => router.push(url, url))
      .then(() =>
        setTimeout(() => {
          pushAboutYouDataLayer(detailsData, derivativeData);
        }, 200),
      );
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <Heading color="black" size="xlarge" dataTestId="aboutHeading" tag="h1">
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you. This will be used for your credit check.
      </Text>
      {!isPersonLoggedIn && (
        <div ref={loginFormRef}>
          <div className="-pt-300 -pb-300">
            <Button
              label="Login For A Speedy Checkout"
              color="teal"
              onClick={() => toggleLogInVisibility(!isLogInVisible)}
            />
          </div>
          {isLogInVisible && (
            <LoginFormContainer
              onCompleted={person =>
                setPersonUuid({
                  variables: {
                    uuid: person?.uuid,
                  },
                })
                  .then(() => router.replace(router.pathname, router.asPath))
                  .finally(() => pushAuthorizationEventDataLayer())
              }
              onError={handleAccountFetchError}
            />
          )}
          <Text
            className="olaf-guest-text -label -mt-500"
            tag="p"
            size="regular"
          >
            Or continue as guest by filling out the form below:
          </Text>
        </div>
      )}
      <AboutFormContainer
        orderId={orderId}
        personLoggedIn={isPersonLoggedIn}
        onCompleted={({ createUpdatePerson }) =>
          clickOnComplete(createUpdatePerson!)
        }
        onLogInClick={handleLogInCLick}
        onRegistrationClick={handleRegistrationClick}
        personUuid={data?.storedPersonUuid || undefined}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
