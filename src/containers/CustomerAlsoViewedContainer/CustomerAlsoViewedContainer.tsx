/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import useSliderProperties from '../../hooks/useSliderProperties';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useProductCardsData } from './gql';

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  vehicleType?: VehicleTypeEnum;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  vehicleType,
}) => {
  const { itemWidth, slidesToShow } = useSliderProperties(345, 345, 310);
  const { data, loading, error } = useProductCardsData(capsId, vehicleType);

  if (loading) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  const features = (keyInformation: any[]): TIcon[] => {
    return keyInformation.map(information => ({
      icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
      label: information.name,
    }));
  };

  if (!data?.productCards?.length) {
    return null;
  }

  return (
    <div className="row:bg-lighter ">
      <div className="row:carousel">
        <Heading tag="h3" color="black" size="large">
          Customers Also Viewed
        </Heading>
        <div style={{ width: '100%' }}>
          <Slider className="-mh-auto" gutter={16} slidesToShow={slidesToShow}>
            {data.productCards.map(
              product =>
                product && (
                  <div
                    key={product.capId || ''}
                    style={{ width: itemWidth, textAlign: 'center' }}
                  >
                    <ProductCard
                      header={
                        product.leadTime
                          ? {
                              text: product.leadTime || '',
                            }
                          : undefined
                      }
                      features={features(product.keyInformation || [])}
                      imageSrc={product.imageUrl || ''}
                      onCompare={() => true}
                      onWishlist={() => true}
                      title={{
                        title: '',
                        link: (
                          <RouterLink
                            link={{
                              href: '#',
                              label: `${product.manufacturerName} ${product.rangeName}`,
                            }}
                            className="heading"
                            classNames={{ size: 'large', color: 'black' }}
                          />
                        ),
                        description: product.derivativeName || '',
                        score: product.averageRating || undefined,
                      }}
                    >
                      <div className="-flex-h">
                        <Price
                          price={product.businessRate || product.personalRate}
                          size="large"
                          separator="."
                          priceDescription="Per Month Exc.VAT"
                        />
                        <Button
                          color="teal"
                          fill="solid"
                          label="View Offer"
                          onClick={() => true}
                          size="regular"
                        />
                      </div>
                    </ProductCard>
                  </div>
                ),
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
