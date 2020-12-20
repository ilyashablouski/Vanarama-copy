/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../RouterLink/RouterLink';
import { formatProductPageUrl, getLegacyUrl } from '../../utils/url';
import {
  GetProductCard,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import truncateString from '../../utils/truncateString';
import useSliderProperties from '../../hooks/useSliderProperties';
import { features } from './helpers';

// Dynamic component loading.
const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Carousel = dynamic(() => import('core/organisms/carousel'));
const ProductCard = dynamic(() =>
  import('core/molecules/cards/ProductCard/ProductCard'),
);
const Heading = dynamic(() => import('core/atoms/heading'));
const Price = dynamic(() => import('core/atoms/price'));
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

interface IProductCarouselProps {
  leaseType: string;
  countItems?: number;
  data: GetProductCard;
  dataTestIdBtn: string;
  productType?: string;
}

const ProductCarousel: React.FC<IProductCarouselProps> = ({
  leaseType,
  countItems,
  data,
  dataTestIdBtn,
  productType,
}) => {
  const { slidesToShow } = useSliderProperties();

  const { compareVehicles, compareChange } = useContext(CompareContext);

  const getBodyStyle = (product: GetProductCard_productCard | null) => {
    const vehicle = data.derivatives?.find(
      derivative => derivative.id === product?.capId,
    );
    return vehicle ? vehicle.bodyStyle?.name : '';
  };

  return (
    <Carousel className="-mh-auto" countItems={countItems || 6}>
      {data.productCard?.map(
        (product, inx) =>
          product && (
            <ProductCard
              // loadImage
              alt={`${product?.manufacturerName} ${product?.rangeName} ${product?.derivativeName}`}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={`${product.capId}_${inx}` || ''}
              header={
                product.leadTime || product.isOnOffer
                  ? {
                      text: product.leadTime || '',
                      accentIcon:
                        slidesToShow > 2 && product.isOnOffer ? (
                          <Icon icon={<Flame />} color="white" />
                        ) : (
                          ''
                        ),
                      accentText:
                        slidesToShow > 2 && product.isOnOffer ? 'Hot Deal' : '',
                    }
                  : undefined
              }
              features={features(
                product?.keyInformation || [],
                product.capId || '',
                Icon,
              )}
              onCompare={() => {
                compareChange({
                  pageUrl: formatProductPageUrl(
                    getLegacyUrl(data?.vehicleList?.edges, product.capId),
                    product.capId,
                  ),
                  bodyStyle: productType || getBodyStyle(product),
                  ...product,
                });
              }}
              compared={isCompared(compareVehicles, product)}
              imageSrc={product.imageUrl || '/vehiclePlaceholder.jpg'}
              onWishlist={() => true}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{
                      href: getLegacyUrl(
                        data.vehicleList?.edges,
                        product?.capId,
                      ),
                      label: '',
                    }}
                    onClick={() =>
                      sessionStorage.setItem('capId', product.capId || '')
                    }
                    className="heading"
                    classNames={{ size: 'large', color: 'black' }}
                  >
                    <Heading tag="span" size="large" className="-pb-100">
                      {truncateString(
                        `${product?.manufacturerName} ${product?.rangeName}`,
                      )}
                    </Heading>
                    <Heading tag="span" size="small" color="dark">
                      {product?.derivativeName || ''}
                    </Heading>
                  </RouterLink>
                ),
                score: product.averageRating || 5,
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
                <RouterLink
                  link={{
                    href: getLegacyUrl(data.vehicleList?.edges, product?.capId),
                    label: 'View Offer',
                  }}
                  onClick={() =>
                    sessionStorage.setItem('capId', product.capId || '')
                  }
                  classNames={{ color: 'teal', solid: true, size: 'regular' }}
                  className="button"
                  dataTestId={dataTestIdBtn}
                >
                  <div className="button--inner">View Offer</div>
                </RouterLink>
              </div>
            </ProductCard>
          ),
      )}
    </Carousel>
  );
};

export default ProductCarousel;
