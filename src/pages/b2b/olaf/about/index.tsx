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

const handleError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'about-you-error' },
  );

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const [personUuid, setPersonUuid] = useState<string | undefined>();

  const { derivativeId, orderId } = router.query as OLAFQueryParams;

  return (
    <OLAFLayout>
      <Heading color="black" dataTestId="about-you_heading" size="xlarge">
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you and your company.
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
              onCompleted={data => {
                // request person account after login
                if (data.login !== null) {
                  // getPersonByToken({
                  //   variables: {
                  //     token: data.login,
                  //   },
                  // });
                }
              }}
            />
          )}
        </div>
      )}
      <BusinessAboutFormContainer
        onCompleted={({ createUpdateBusinessPerson }) => {
          const companyUuid = createUpdateBusinessPerson!.companies?.[0].uuid!;
          const params = getUrlParam({ derivativeId, orderId });
          const url = `/b2b/olaf/company-details/[companyUuid]${params}`;
          router.push(url, url.replace('[companyUuid]', companyUuid));
        }}
        onError={handleError}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
