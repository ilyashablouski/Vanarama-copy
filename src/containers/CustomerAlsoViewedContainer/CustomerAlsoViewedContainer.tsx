/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { NextRouter } from 'next/router';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useProductCardData } from './gql';

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  router: NextRouter;
  vehicleType?: VehicleTypeEnum;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  leaseType,
  vehicleType,
  router,
}) => {
  const { data, loading, error } = useProductCardData(capsId, vehicleType);

  const offerNewPath = (capId: string) => {
    if (router.pathname.match(/(capId)/)) {
      return router.pathname.replace('[capId]', capId);
    }
    return `${router.pathname}/${capId}`;
  };

  const offerPath = () => {
    if (router.pathname.match(/(capId)/)) {
      return router.pathname;
    }
    return `${router.pathname}/[capId]`;
  };

  const features = (keyInformation: any[]): TIcon[] => {
    return keyInformation.map(information => ({
      icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
      label: information.name,
    }));
  };

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

  if (!data?.productCard?.length) {
    return null;
  }

  return (
    <div className="row:bg-lighter ">
      <div className="row:carousel">
        <Heading tag="h3" color="black" size="large">
          Customers Also Viewed
        </Heading>
        <div style={{ width: '100%' }}>
          <Carousel className="-mh-auto" countItems={data.productCard.length}>
            {data.productCard.slice(0, 6).map(
              product =>
                product && (
                  <ProductCard
                    key={product.capId || ''}
                    header={
                      product.leadTime || product.isOnOffer
                        ? {
                            text: product.leadTime || '',
                            accentIcon: product.isOnOffer ? (
                              <Icon icon={<Flame />} color="white" />
                            ) : (
                              ''
                            ),
                            accentText: product.isOnOffer ? 'Hot Deal' : '',
                          }
                        : undefined
                    }
                    features={
                      (!!product.keyInformation?.length &&
                        features(product.keyInformation)) ||
                      []
                    }
                    imageSrc={product.imageUrl || ''}
                    onCompare={() => true}
                    onWishlist={() => true}
                    title={{
                      title: '',
                      link: (
                        <RouterLink
                          link={{
                            href: offerPath(),
                            label: `${product.manufacturerName} ${product.rangeName}`,
                          }}
                          as={offerNewPath(product.capId || '')}
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
                        price={
                          leaseType === LeaseTypeEnum.BUSINESS
                            ? product.businessRate
                            : product.personalRate
                        }
                        size="large"
                        separator="."
                        priceDescription={`Per Month ${
                          leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
                        }.VAT`}
                      />
                      <Button
                        color="teal"
                        fill="solid"
                        label="View Offer"
                        onClick={() => {}}
                        size="regular"
                      />
                    </div>
                  </ProductCard>
                ),
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
