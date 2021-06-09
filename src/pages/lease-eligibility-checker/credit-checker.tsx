import React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import { useProductCard } from '../../gql/productCard';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
// const Link = dynamic(() => import('core/atoms/link'), {
//   loading: () => <Skeleton count={1} />,
// });
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Score = dynamic(() => import('core/atoms/score'), {
  loading: () => <Skeleton count={1} />,
});
const ProductCarousel = dynamic(
  () => import('../../components/ProductCarousel/ProductCarousel'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const CreditChecker: NextPage = () => {
  const router = useRouter();
  const scoreParam = router.query.score as string;
  const score = parseInt(scoreParam, 10) || 0;

  const { data: productsCar, loading, error } = useProductCard(
    VehicleTypeEnum.CAR,
    9,
    true,
  );

  const aproductsCarCapIds = productsCar?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productCarDerivatives } = useCarDerivativesData(
    aproductsCarCapIds,
    VehicleTypeEnum.CAR,
  );
  const vehicleListUrlQuery = useVehicleListUrl(aproductsCarCapIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, aproductsCarCapIds);

  const setText = () => {
    // Average.
    let text = {
      heading: 'Congratulations!',
      body: `This means you’re likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.`,
      buttonLabel: 'Choose Your Vehicle',
    };
    // Poor.
    if (score <= 50) {
      text = {
        heading: 'Don’t worry!',
        body:
          'Your score doesn’t necessarily mean you won’t be accepted for credit to lease a vehicle. Get in touch and we’ll look into this for you and see what we can do.',
        buttonLabel: 'Get In Touch',
      };
    }
    // Good.
    if (score >= 90) {
      text = {
        heading: 'Congratulations!',
        body:
          'This means you’re extremely likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.',
        buttonLabel: 'Choose Your Vehicle',
      };
    }

    return text;
  };

  const contentForCurrentScore = setText();

  return (
    <>
      <div className="row:title">
        <Heading tag="h1" color="black" size="xlarge">
          Your Result
        </Heading>
      </div>
      <div className="row:featured-left">
        <Score score={score} />
        <div>
          <Heading tag="span" size="large">
            {contentForCurrentScore.heading}
          </Heading>
          <Text tag="p" size="regular" color="darker">
            {contentForCurrentScore.body}
          </Text>
          <Button
            color="teal"
            size="regular"
            fill="solid"
            onClick={() => {
              if (
                contentForCurrentScore.buttonLabel === 'Choose Your Vehicle'
              ) {
                Router.push('/car-leasing/');
              } else {
                Router.push('/contact-us/');
              }
            }}
            label={contentForCurrentScore.buttonLabel}
            role="button"
          />
          {/* <Text tag="p">
            Not sure? We can <Link>help you choose</Link>
          </Text> */}
        </div>
      </div>

      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Top Offers
            </span>
          </Heading>
          {error ? (
            <div>{error.message}</div>
          ) : (
            (loading && <Loading size="xlarge" />) || (
              <>
                <ProductCarousel
                  leaseType={LeaseTypeEnum.PERSONAL}
                  data={{
                    derivatives: productCarDerivatives?.derivatives || null,
                    productCard: productsCar?.productCarousel || null,
                    vehicleList: vehicleListUrlQuery.data?.vehicleList!,
                  }}
                  countItems={productsCar?.productCarousel?.length || 6}
                  dataTestIdBtn="car-view-offer"
                />
                <div className="-justify-content-row -pt-500">
                  <Button
                    label="View All Cars"
                    color="teal"
                    onClick={() => {
                      Router.push(`/car-leasing/search`);
                    }}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(CreditChecker);
