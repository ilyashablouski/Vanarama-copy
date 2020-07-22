import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import List from '@vanarama/uibook/lib/components/atoms/list';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';

const ThankYouPage: NextPage = () => {
  const router = useRouter();
  return (
    <OLAFLayout>
      <Form>
        <Heading color="black" tag="h1" size="xlarge">
          Great News - Your Application Is On Its Way
        </Heading>
        <Text color="darker" tag="p">
          Thank you for that, we’ve now sent your application over to the funder
          and you should hear back from us within 24 hours.
        </Text>
        <Heading color="black" tag="h2" size="lead">
          What Happens Next?
        </Heading>
        <Text color="darker" tag="p">
          Once your application has been approved:
        </Text>
        <List>
          <li>
            <Text color="darker" tag="p">
              We’ll call you to take a refundable £500 holding deposit. We’ll
              use this to order your vehicle from the dealer.
            </Text>
          </li>
          <li>
            <Text color="darker" tag="p">
              We’ll send you some finance documents to sign, which you can do on
              your smartphone.
            </Text>
          </li>
          <li>
            <Text color="darker" tag="p">
              We’ll arrange everything to get your car delivered straight to
              your door, free of charge!
            </Text>
          </li>
          <li>
            <Text color="darker" tag="p">
              Once your vehicle has been delivered, we’ll refund your £500
              holding deposit, minus our £198 admin fee.
            </Text>
          </li>
        </List>
        <Text color="darker" tag="p">
          If you need anything in the meantime, you can login to your online
          account or give us a call on{' '}
          <a href="tel:01442838195">01442 838 195</a>.
        </Text>
        <Button
          type="button"
          color="teal"
          label="View order"
          onClick={() => {
            router.push('/');
          }}
        />
      </Form>
    </OLAFLayout>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
