/* eslint-disable @typescript-eslint/camelcase */
import { useState, useEffect } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import {
  gql,
  useLazyQuery,
  useApolloClient,
  ApolloError,
} from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import {
  pushAboutYouDataLayer,
  pushPageData,
} from '../../../utils/dataLayerHelpers';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFB2CQueryParams } from '../../../utils/url';
import { GetPerson } from '../../../../generated/GetPerson';
import { CreateUpdatePersonMutation_createUpdatePerson } from '../../../../generated/CreateUpdatePersonMutation';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import { usePersonByUuidData } from '../../../gql/person';
import { useCreateUpdateOrder } from '../../../gql/order';
import {
  LeaseTypeEnum,
  CreditApplicationTypeEnum as CATypeEnum,
} from '../../../../generated/globalTypes';
import { useImperativeQuery } from '../../../hooks/useImperativeQuery';
import { GET_ORDERS_BY_PARTY_UUID_DATA } from '../../../containers/OrdersInformation/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../generated/GetCompaniesByPersonUuid';
import { GetOlafData_orderByUuid } from '../../../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../../../generated/GetDerivative';
import { isUserAuthenticated } from '../../../utils/authentication';

const GET_PERSON_QUERY = gql`
  query GetPerson {
    getPerson {
      uuid
      firstName
      lastName
      partyUuid
      emailAddresses {
        value
        partyId
      }
    }
  }
`;

export function useGetPersonLazyQuery(
  onCompleted: (data: GetPerson) => void,
  onError: (error: ApolloError) => void,
) {
  return useLazyQuery<GetPerson>(GET_PERSON_QUERY, {
    onCompleted,
    onError,
  });
}

export const handleAccountFetchError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { orderId, uuid } = router.query as OLAFB2CQueryParams;

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>(uuid);
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

  const [updateOrderHandle] = useCreateUpdateOrder(() => {});
  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const [getPerson] = useGetPersonLazyQuery(async data => {
    setPersonUuid(data?.getPerson?.uuid);
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
    router.replace(router.pathname, router.asPath);
  }, handleAccountFetchError);
  const { refetch } = usePersonByUuidData(personUuid || uuid || '');
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  const clickOnComplete = async (
    createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson,
  ) => {
    pushAboutYouDataLayer(detailsData, derivativeData, 'Car');
    await refetch({
      uuid: createUpdatePerson.uuid,
    }).then(resp => {
      const partyUuidDate = resp.data?.personByUuid?.partyUuid;
      updateOrderHandle({
        variables: {
          input: {
            leaseType: LeaseTypeEnum.PERSONAL,
            lineItems: [
              {
                quantity: 1,
              },
            ],
            partyUuid: partyUuidDate,
            uuid: orderId,
          },
        },
      });
    });
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...creditApplication.data?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          aboutDetails: createUpdatePerson,
          creditApplicationType: CATypeEnum.B2C_PERSONAL,
        }),
      },
    });

    client.writeQuery({
      query: gql`
        query WriteCachedPersonInformation {
          uuid @client
        }
      `,
      data: {
        uuid: personUuid,
      },
    });
    const params = getUrlParam({ uuid: createUpdatePerson.uuid });
    const url =
      router.query.redirect === 'summary'
        ? `/olaf/summary/[orderId]${params}`
        : `/olaf/address-history/[orderId]${params}`;

    router.push(url, url.replace('[orderId]', orderId));
  };

  useEffect(() => {
    pushPageData('Checkout Pages', 'Cars');
  }, []);

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
      <Heading color="black" size="xlarge" dataTestId="aboutHeading" tag="h1">
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you and your company. This will be used for your credit check.
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
                if (isUserAuthenticated()) {
                  getPerson();
                }
              }}
            />
          )}
        </div>
      )}
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) =>
          clickOnComplete(createUpdatePerson!)
        }
        onLogInClick={() => toggleLogInVisibility(true)}
        personUuid={personUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
