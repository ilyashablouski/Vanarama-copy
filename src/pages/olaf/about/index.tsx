import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { gql, useLazyQuery } from '@apollo/client';
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
  uuid: string;
};

const AboutYouPage: NextPage = () => {
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;
  const [getPersonByToken] = useLazyQuery<
    PersonByToken,
    PersonByTokenVariables
  >(PERSON_BY_TOKEN_QUERY, {
    onCompleted: data => {
      if (data?.personByToken?.uuid) {
        const currentUrl = '/olaf/about/[uuid]';
        const redirectUrl = currentUrl.replace(
          '[uuid]',
          data.personByToken.uuid,
        );
        // reddirect on the same page, with users uuid
        router.push(currentUrl, redirectUrl, { shallow: true });
      }
    },
    onError: handleAccountFetchError,
  });

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
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const params = getUrlParam({ derivativeId, orderId });
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${params}`
              : `/olaf/address-history/[uuid]${params}`;

          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
