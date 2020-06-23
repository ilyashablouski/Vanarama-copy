import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as jwt from 'jsonwebtoken';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import AboutFormContainer from '../../../containers/AboutFormContainer/AboutFormContainer';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam } from '../../../utils/url';

const AboutYouPage: NextPage = () => {
  const [isLogInVisible, toggleLogInVisibility] = useState(false);
  const router = useRouter();
  const {
    query: { uuid, derivativeId, orderId },
  } = router;

  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <Heading color="black" size="xlarge" dataTestId="aboutHeading">
        About You
      </Heading>
      <Text color="darker" size="lead">
        To get you your brand new vehicle, firstly we’ll just need some details
        about you and your company. This will be used for your credit check.
      </Text>
      <div className="form">
        <div className="-pt-300 -pb-300">
          <Button
            label="Login For A Speedy Checkout"
            color="teal"
            onClick={() => toggleLogInVisibility(!isLogInVisible)}
          />
        </div>
      </div>
      {isLogInVisible && (
        <LoginFormContainer
          onCompleted={data => {
            if (data.login !== null) {
              const decodedData = jwt.decode(data.login, { json: true });
              const currentUrl = '/olaf/about/[uuid]';
              const redirectUrl = currentUrl.replace(
                '/[uuid]',
                `/${decodedData?.username || ''}`,
              );
              router.push(currentUrl, redirectUrl, { shallow: true });
            }
          }}
        />
      )}
      <AboutFormContainer
        onCompleted={({ createUpdatePerson }) => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${getUrlParam({ orderId, derivativeId })}`
              : `/olaf/address-history/[uuid]${getUrlParam({
                  orderId,
                  derivativeId,
                })}`;

          router.push(url, url.replace('[uuid]', createUpdatePerson!.uuid));
        }}
        personUuid={uuid as string}
      />
    </OLAFLayout>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
