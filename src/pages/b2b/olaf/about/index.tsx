import React, { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';
import LoginFormContainer from '../../../../containers/LoginFormContainer/LoginFormContainer';
import BusinessAboutFormContainer from '../../../../containers/BusinessAboutFormContainer';
import { usePersonByTokenLazyQuery } from '../../../olaf/about';

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
  uuid: string;
};

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const { derivativeId, orderId, uuid } = router.query as QueryParams;

  const [getPersonByToken] = usePersonByTokenLazyQuery(data => {
    if (data?.personByToken?.uuid) {
      const currentUrl = '/b2b/olaf/about/[uuid]';
      const redirectUrl = currentUrl.replace('[uuid]', data.personByToken.uuid);
      // reddirect on the same page, with users uuid
      router.push(currentUrl, redirectUrl, { shallow: true });
    }
  }, handleAccountFetchError);

  return (
    <OLAFLayout>
      <Heading color="black" dataTestId="about-you_heading" size="xlarge">
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you and your company.
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
      <BusinessAboutFormContainer
        onCompleted={({ createUpdateBusinessPerson }) => {
          const companyUuid = createUpdateBusinessPerson!.uuid!;
          const params = getUrlParam({ derivativeId, orderId });
          const url = `/b2b/olaf/company-details/[companyUuid]${params}`;
          router.push(url, url.replace('[companyUuid]', companyUuid));
        }}
        onError={handleCreateUpdateBusinessPersonError}
        personUuid={uuid}
        onLogInCLick={() => toggleLogInVisibility(true)}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
