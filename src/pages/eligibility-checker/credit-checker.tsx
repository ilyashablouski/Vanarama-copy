import React from 'react';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import truncateString from '../../utils/truncateString';
import getIconMap from '../../utils/getIconMap';
import { useProductCard } from '../../gql/productCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import useSliderProperties from '../../hooks/useSliderProperties';

const CreditChecker: NextPage = () => {
  const router = useRouter();
  const scoreParam = router.query.score as string;
  const score = parseInt(scoreParam, 10) || 0;
  const { slidesToShow } = useSliderProperties();

  const { data: productsCar, loading, error } = useProductCard('CAR', 9, true);

  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Eligibility Checker', href: '/' },
      { label: 'Your Result', href: '/' },
    ],
  };

  const setText = () => {
    // Average.
    let text = {
      heading: 'Congratulations!',
      body: `This means you’re likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.`,
      buttonLabel: 'Choose Your Vehicle',
    };
    // Poor.
    if (score <= 50)
      text = {
        heading: 'Don’t worry!',
        body:
          'Your score doesn’t necessarily mean you won’t be accepted for credit to lease a vehicle. Get in touch and we’ll look into this for you and see what we can do.',
        buttonLabel: 'Get In Touch',
      };
    // Good.
    if (score >= 90)
      text = {
        heading: 'Congratulations!',
        body:
          'This means you’re extremely likely to be accepted for credit to lease with us. So, what are you waiting for? Take a look at the latest deals on brand-new vehicles now.',
        buttonLabel: 'Choose Your Vehicle',
      };

    return text;
  };

  const contentForCurrentScore = setText();

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbProps.items} />
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
          <Text tag="p">
            Not sure? We can <Link>help you choose</Link>
          </Text>
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
                <Carousel
                  className="-mh-auto"
                  countItems={productsCar?.productCarousel?.length || 6}
                >
                  {productsCar?.productCarousel?.map((item, idx) => {
                    const iconMap = getIconMap(item?.keyInformation || []);
                    return (
                      <ProductCard
                        key={item?.capId || idx}
                        header={{
                          accentIcon:
                            slidesToShow > 2 ? (
                              <Icon icon={<Flame />} color="white" />
                            ) : (
                              ''
                            ),
                          accentText: slidesToShow > 2 ? 'Hot Deal' : '',
                          text: 'In Stock - 14-21 Days Delivery',
                        }}
                        features={item?.keyInformation?.map(info => ({
                          icon: iconMap.get(info?.name?.replace(/\s+/g, '')),
                          label: info?.value || '',
                        }))}
                        imageSrc={item?.imageUrl || '/vehiclePlaceholder.jpg'}
                        onCompare={() => true}
                        onWishlist={() => true}
                        title={{
                          title: '',
                          link: (
                            <RouterLink
                              link={{
                                href: `/cars/car-details/${item?.capId}`,
                                label: truncateString(
                                  `${item?.manufacturerName} ${item?.rangeName}`,
                                ),
                              }}
                              className="heading"
                              classNames={{ size: 'large', color: 'black' }}
                            />
                          ),
                          description: item?.derivativeName || '',
                          score: item?.averageRating || 0,
                        }}
                      >
                        <div className="-flex-h">
                          <Price
                            price={item?.businessRate}
                            size="large"
                            separator="."
                            priceDescription="Per Month Exc.VAT"
                          />
                          <Button
                            color="teal"
                            fill="solid"
                            label="View Offer"
                            dataTestId="car-view-offer"
                            onClick={() =>
                              Router.push(`/cars/car-details/${item?.capId}`)
                            }
                            size="regular"
                          />
                        </div>
                      </ProductCard>
                    );
                  })}
                </Carousel>
                <div className="-justify-content-row -pt-500">
                  <Button
                    label="View All Cars"
                    color="teal"
                    onClick={() => {
                      Router.push(`/car-leasing`);
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
