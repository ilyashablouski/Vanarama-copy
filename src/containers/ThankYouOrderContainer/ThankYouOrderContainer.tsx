import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import usePerson from '../../hooks/usePerson';
import useGetOrderId from '../../hooks/useGetOrderId';
import Skeleton from '../../components/Skeleton';

import { useGetCreditApplicationByOrderUuid } from '../../gql/creditApplication';
import { IThankYouOrderContainer } from './interface';
import { getFunderName } from './helpers';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const List = dynamic(() => import('core/atoms/list'), {
  loading: () => <Skeleton count={5} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={5} />,
});
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const CheckmarkCircleSharp = dynamic(
  () => import('core/assets/icons/CheckmarkCircleSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});

const renderList = () => (
  <List>
    <li>
      <Text color="darker" tag="p">
        We&apos;ll then send you some finance documents to sign which you can do
        straight from your phone.
      </Text>
    </li>
    <li>
      <Text color="darker" tag="p">
        Once we&apos;ve arranged a suitable time for you via our dealer
        partners, we&apos;ll deliver your brand new vehicle straight to your
        door – free, safe & contactless.
      </Text>
    </li>
  </List>
);

function ThankYouOrderContainer({ isB2b }: IThankYouOrderContainer) {
  const router = useRouter();
  const orderId = useGetOrderId();

  const { personLoggedIn } = usePerson();
  const { data, loading, error } = useGetCreditApplicationByOrderUuid(orderId);

  const funderName = getFunderName(data)?.toUpperCase();

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <Form>
      <Heading
        color="black"
        dataTestId="thank-you_heading"
        size="xlarge"
        tag="h1"
      >
        Great News...
      </Heading>
      <Text color="black" size="large" className="-v-align-icon">
        <Icon icon={<CheckmarkCircleSharp />} color="success" />
        We&apos;ve Received Your Order
      </Text>
      {funderName === 'ALD' ? (
        <Text color="darker" tag="p">
          Thanks for your order! Our team of dedicated experts is reviewing it
          now. Credit checks by the funders can take between 7 and 21 days. As
          soon as yours is done we&apos;ll be in touch to discuss the next steps
          & delivery of your brand-new vehicle.
        </Text>
      ) : (
        <Text color="darker" tag="p">
          Thanks for your order! Our team of dedicated experts is reviewing it
          now. Credit checks by the funders can take between 24 hrs and 7 days.
          As soon as yours is done we&apos;ll be in touch to discuss the next
          steps & delivery of your brand-new vehicle.
        </Text>
      )}
      <Heading color="black" tag="h2" size="lead">
        {isB2b ? `What's Next?` : `What Happens Next?`}
      </Heading>
      <Text color="darker" tag="p">
        Once your order has been processed:
      </Text>
      {renderList()}
      <Text color="darker" tag="p">
        If you need anything else in the meantime, you can login to your online
        account or feel free to give us a call on&nbsp;
        <a
          href="tel:01442838195"
          className="link -teal InfinityNumber clickable"
        >
          01442 838 195
        </a>
        .
      </Text>
      <Text color="darker" tag="p">
        We&apos;ve also sent an order confirmation to your inbox outlining your
        next steps.
      </Text>
      <Button
        type="button"
        color="teal"
        label="View order"
        onClick={() => {
          if (personLoggedIn) {
            router.push(`/account/my-orders`);
          } else {
            router.push(
              '/account/login-register?redirect=/account/my-orders',
              '/account/login-register',
            );
          }
        }}
      />
    </Form>
  );
}

export default ThankYouOrderContainer;
