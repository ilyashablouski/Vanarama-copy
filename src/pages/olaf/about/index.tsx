/* eslint-disable @typescript-eslint/camelcase */
import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { gql, useLazyQuery, useApolloClient } from '@apollo/client';
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
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
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

const PERSON_BY_TOKEN_QUERY = gql`
  query PersonByToken($token: String!) {
    personByToken(token: $token) {
      uuid
    }
  }
`;

const handleAccountFetchError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

type QueryParams = OLAFQueryParams & {
  uuid?: string;
};

const AboutYouPage: NextPage = () => {
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const router = useRouter();
  const client = useApolloClient();
  const { orderId, uuid } = router.query as QueryParams;

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  const [getPersonByToken] = useLazyQuery<
    PersonByToken,
    PersonByTokenVariables
  >(PERSON_BY_TOKEN_QUERY, {
    onCompleted: response => {
      if (response?.personByToken?.uuid) {
        const currentUrl = '/olaf/about/[orderId]';
        const redirectUrl =
          currentUrl + getUrlParam({ uuid: response.personByToken.uuid });
        // reddirect on the same page, with users uuid
        router.push(currentUrl, redirectUrl, { shallow: true });
      }
    },
    onError: handleAccountFetchError,
  });

  const clickOnComplete = (
    createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson,
  ) => {
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
        uuid,
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
      {!uuid && (
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
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
