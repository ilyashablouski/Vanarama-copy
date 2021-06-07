import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { gql, useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import * as toast from 'core/atoms/toast/Toast';
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
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { usePersonByUuidData } from '../../../gql/person';
import { useCreateUpdateOrder } from '../../../gql/order';
import {
  LeaseTypeEnum,
  CreditApplicationTypeEnum as CATypeEnum,
  OrderInputObject,
} from '../../../../generated/globalTypes';
import { GetDerivative_derivative as IDerivative } from '../../../../generated/GetDerivative';
import Skeleton from '../../../components/Skeleton';
import useGetOrder from '../../../hooks/useGetOrder';
import useGetOrderId from '../../../hooks/useGetOrderId';
import usePerson from '../../../hooks/usePerson';

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
  const order = useGetOrder();
  const orderId = useGetOrderId();

  const loginFormRef = useRef<HTMLDivElement>(null);

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const {
    personUuid,
    setPersonUuid,
    personLoggedIn,
    setPersonLoggedIn,
  } = usePerson();
  const { refetch } = usePersonByUuidData(personUuid || '');

  const [updateOrderHandle] = useCreateUpdateOrder(() => {});
  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const creditApplicationQuery = useGetCreditApplicationByOrderUuid(orderId);
  const creditApplication =
    creditApplicationQuery.data?.creditApplicationByOrderUuid;
  const { redirect } = router.query as OLAFQueryParams;
  const isEdit =
    Object.values(creditApplication?.aboutDetails || {}).length > 0;

  const clickOnComplete = async (createUpdatePerson: IPerson) => {
    savePersonUuid(createUpdatePerson);
    pushAboutYouDataLayer(detailsData, derivativeData);
    await refetch({
      uuid: createUpdatePerson.uuid,
    })
      .then(resp =>
        updateOrderHandle({
          variables: {
            input: {
              personUuid: personUuid || '',
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
            uuid: personUuid,
          },
        }),
      )
      .then(() => getUrlParam({ uuid: createUpdatePerson.uuid }))
      .then(params => redirect || `/olaf/address-history${params}`)
      .then(url => router.push(url, url));
  };

  const handleRegistrationClick = () =>
    router.push(
      `/account/login-register?redirect=${router?.asPath || '/'}`,
      '/account/login-register',
    );

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
      <AboutFormContainer
        isEdit={isEdit}
        personLoggedIn={personLoggedIn}
        onCompleted={({ createUpdatePerson }) =>
          clickOnComplete(createUpdatePerson!)
        }
        onLogInClick={() => {
          loginFormRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          toggleLogInVisibility(true);
        }}
        onRegistrationClick={handleRegistrationClick}
        personUuid={personUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
