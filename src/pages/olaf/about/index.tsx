/* eslint-disable @typescript-eslint/camelcase */
import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import {
  gql,
  useLazyQuery,
  useApolloClient,
  ApolloError,
} from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFB2CQueryParams } from '../../../utils/url';
import {
  PersonByToken,
  PersonByTokenVariables,
} from '../../../../generated/PersonByToken';
import { CreateUpdatePersonMutation_createUpdatePerson } from '../../../../generated/CreateUpdatePersonMutation';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import { usePersonByUuidData } from '../../../gql/person';
import { useCreateUpdateOrder } from '../../../gql/order';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';

const PERSON_BY_TOKEN_QUERY = gql`
  query PersonByToken($token: String!) {
    personByToken(token: $token) {
      uuid
    }
  }
`;

export function usePersonByTokenLazyQuery(
  onCompleted: (data: PersonByToken) => void,
  onError: (error: ApolloError) => void,
) {
  return useLazyQuery<PersonByToken, PersonByTokenVariables>(
    PERSON_BY_TOKEN_QUERY,
    { onCompleted, onError },
  );
}

const handleAccountFetchError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { orderId, uuid } = router.query as OLAFB2CQueryParams;

  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>();

  const [updateOrderHandle] = useCreateUpdateOrder(() => {});
  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const [getPersonByToken] = usePersonByTokenLazyQuery(
    data => setPersonUuid(data?.personByToken?.uuid),
    handleAccountFetchError,
  );
  const { refetch } = usePersonByUuidData(personUuid || uuid || '');
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  const clickOnComplete = async (
    createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson,
  ) => {
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
          },
        },
      });
    });
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...creditApplication.data?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          emailAddresses: createUpdatePerson.emailAddresses?.slice(-1)[0],
          telephoneNumbers: createUpdatePerson.telephoneNumbers?.slice(-1)[0],
        }),
      },
    });

    client.writeQuery({
      query: gql`
        query WriteCachedPersonInformation {
          uuid
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

  return (
    <OLAFLayout>
      <Heading color="black" size="xlarge" dataTestId="aboutHeading">
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
              onCompleted={response => {
                // request person account after login
                if (response.login !== null) {
                  getPersonByToken({
                    variables: {
                      token: response.login,
                    },
                  });
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
