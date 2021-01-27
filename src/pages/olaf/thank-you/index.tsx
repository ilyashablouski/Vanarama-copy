import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import { getDataFromTree } from '@apollo/react-ssr';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import {
  GetPerson_getPerson as Person,
  GetPerson,
} from '../../../../generated/GetPerson';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
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
const List = dynamic(() => import('core/atoms/list'), {
  loading: () => <Skeleton count={5} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={5} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={3} />,
});

const ThankYouPage: NextPage = () => {
  const router = useRouter();
  const { isB2b } = router.query;
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (!person) {
      localForage.getItem<GetPerson>('person').then(value => {
        if (value) {
          setPerson(value.getPerson);
        }
      });
    }
  }, [person]);

  const renderList = () => {
    return (
      <List>
        <li>
          <Text color="darker" tag="p">
            We&apos;ll then send you some finance documents to sign which you
            can do straight from your phone.
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
  };

  return (
    <>
      <OLAFLayout>
        <Form>
          <Heading color="black" tag="h1" size="xlarge">
            Great News...
          </Heading>
          <Text color="black" size="large">
            <Icon icon={<CheckmarkCircleSharp />} color="success" />
            We&apos;ve Received Your Order
          </Text>
          <Text color="darker" tag="p">
            As soon as your application has been approved with the finance
            company, we&apos;ll reserve your vehicle and process your order.
            We&apos;ll be in touch within 24 business hours.
          </Text>
          <Heading color="black" tag="h2" size="lead">
            {isB2b ? `What's Next?` : `What Happens Next?`}
          </Heading>
          <Text color="darker" tag="p">
            Once your order has been processed:
          </Text>
          {renderList()}
          <Text color="darker" tag="p">
            If you need anything else in the meantime, you can login to your
            online account or feel free to give us a call on&nbsp;
            <a href="tel:01442838195" className="link -teal">
              01442 838 195
            </a>
            .
          </Text>
          <Button
            type="button"
            color="teal"
            label="View order"
            onClick={() => {
              if (person) {
                router.push(`/account/my-orders`);
              } else {
                router.push(
                  '/account/login-register?redirect=/account/my-orders',
                );
              }
            }}
          />
        </Form>
      </OLAFLayout>
      {isB2b && (
        <div className="row:features-4col">
          <Tile plain className="-align-center -button">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=40347"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Free, Safe & Contactless Delivery Direct To Your Door
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center -button">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=403419"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Rated Excellent On TrustPilot
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center -button">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=403430"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Free 30-Day Returns
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center -button">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=40347"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                The Best Price Or We&apos;ll Give You £100*
              </Heading>
            </span>
          </Tile>
        </div>
      )}
    </>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
