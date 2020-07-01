import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const AboutYouPage: NextPage = () => {
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;

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
        <>
          <div className="form">
            <div className="-pt-300 -pb-300">
              <Button
                label="Login For A Speedy Checkout"
                color="teal"
                onClick={() => toggleLogInVisibility(!isLogInVisible)}
              />
            </div>
          </div>
          {isLogInVisible && <LoginFormContainer />}
        </>
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
