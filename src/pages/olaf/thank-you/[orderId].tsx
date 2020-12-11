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

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const CheckmarkCircleSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Form = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/form'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const List = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/list'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Tile = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tile'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

const ThankYouPage: NextPage = () => {
  const router = useRouter();
  const { isB2b } = router.query;
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (!person) {
      localForage.getItem('person').then(value => {
        if ((value as GetPerson)?.getPerson)
          setPerson((value as GetPerson)?.getPerson as Person);
      });
    }
  }, [person]);

  const renderList = () => {
    return (
      <List>
        <li>
          <Text color="darker" tag="p">
            We’ll then send you some finance documents to sign which you can do
            straight from your phone.
          </Text>
        </li>
        <li>
          <Text color="darker" tag="p">
            Once the dealer has arranged a suitable time with you, we’ll deliver
            your brand new vehicle straight to your door - free, safe &
            contactless.
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
            Now that we&apos;ve received your order, we&apos;ll reserve your
            vehicle and get your finance sorted. We&apos;ll be in touch within
            24 business hours.
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
                router.push(
                  `/account/my-orders/[partyByUuid]?uuid=${person.uuid}`,
                  `/account/my-orders/${person.partyUuid}?uuid=${person.uuid}`,
                );
              } else {
                router.push('/');
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
            <Text color="darker" size="regular">
              Pretium facilisi etiam pretium, cras interdum enim, nullam.
            </Text>
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
            <Text color="darker" size="regular">
              Pretium facilisi etiam pretium, cras interdum enim, nullam.
            </Text>
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
            <Text color="darker" size="regular">
              Pretium facilisi etiam pretium, cras interdum enim, nullam.
            </Text>
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
            <Text color="darker" size="regular">
              Pretium facilisi etiam pretium, cras interdum enim, nullam.
            </Text>
          </Tile>
        </div>
      )}
    </>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
