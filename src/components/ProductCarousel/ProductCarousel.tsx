import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Carousel from 'core/organisms/carousel';
import ProductCard from 'core/molecules/cards/ProductCard';
import { useMediaQuery } from 'react-responsive';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../RouterLink/RouterLink';
import { formatProductPageUrl, getLegacyUrl } from '../../utils/url';
import {
  GetProductCard,
  GetProductCard_derivatives,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import truncateString from '../../utils/truncateString';
// import useSliderProperties from '../../hooks/useSliderProperties';
import { features } from './helpers';
import useWishlist from '../../hooks/useWishlist';

// Dynamic component loading.
const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Heading = dynamic(() => import('core/atoms/heading'));
const Price = dynamic(() => import('core/atoms/price'));
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

const getVehicle = (
  product: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
) => derivatives?.find(derivative => derivative.id === product?.capId);

const getBodyStyle = (
  product: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
  productType?: string,
) => productType || getVehicle(product, derivatives)?.bodyStyle?.name || '';

interface IProductCarouselProps {
  leaseType: string;
  countItems?: number;
  data: GetProductCard;
  dataTestIdBtn: string;
  productType?: string;
  customCTABackground?: string;
}

const ProductCarousel: React.FC<IProductCarouselProps> = ({
  leaseType,
  countItems,
  data,
  dataTestIdBtn,
  productType,
  customCTABackground,
}) => {
  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);

  const isLargeScreen = useMediaQuery({ minWidth: 1216 });
  const isMediumScreen = useMediaQuery({ minWidth: 568, maxWidth: 1215 });
  const isSmallScreen = useMediaQuery({ maxWidth: 567 });

  // handle change device orientation for recalculate carousel height
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const carouselKey = useMemo(() => new Date().getTime(), [
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  ]);

  return (
    <Carousel
      className="-product -mh-auto"
      countItems={countItems || 6}
      key={carouselKey}
      initialSlideHeight={567}
    >
      {data.productCard?.map(
        (product, index) =>
          product && (
            <ProductCard
              // loadImage
              style={{ maxHeight: 600 }}
              alt={`${product?.manufacturerName} ${product?.modelName} ${product?.derivativeName}`}
              lazyLoad={index !== 0}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={`${product.capId}_${index}` || ''}
              header={
                product.leadTime || product.isOnOffer
                  ? {
                      text: product.leadTime || '',
                      accentIcon: product.isOnOffer ? (
                        <Icon icon={<Flame />} color="white" />
                      ) : (
                        ''
                      ),
                      accentText: product.isOnOffer ? 'Hot Offer' : '',
                    }
                  : undefined
              }
              features={features(
                product.keyInformation || [],
                product.capId || '',
                Icon,
              )}
              onCompare={() => {
                compareChange({
                  pageUrl: formatProductPageUrl(
                    getLegacyUrl(data?.vehicleList?.edges, product.capId),
                    product.capId,
                  ),
                  bodyStyle: getBodyStyle(
                    product,
                    data.derivatives,
                    productType,
                  ),
                  ...product,
                });
              }}
              compared={isCompared(compareVehicles, product)}
              imageSrc={
                product.imageUrl ||
                `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
              }
              placeholderImage={`${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`}
              onWishlist={() =>
                wishlistChange({
                  pageUrl: formatProductPageUrl(
                    getLegacyUrl(data?.vehicleList?.edges, product.capId),
                    product.capId,
                  ),
                  bodyStyle: getBodyStyle(
                    product,
                    data.derivatives,
                    productType,
                  ),
                  ...product,
                })
              }
              wished={isWished(wishlistVehicleIds, product)}
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
                        `${product?.manufacturerName} ${product?.modelName}`,
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
              {/* TODO: Should be uncommented in the future when we are going to use product card banners. */}
              {/* <div className="gallery-promotion-container"> */}
              {/*  {getVehicle(product, data.derivatives)?.fuelType?.name === */}
              {/*    FuelTypeEnum.ELECTRIC && <ElectricVehicleBanner />} */}
              {/*  {product?.isOnOffer && */}
              {/*    product.vehicleType === VehicleTypeEnum.CAR && ( */}
              {/*      <FreeInsuranceBanner /> */}
              {/*    )} */}
              {/* </div> */}
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
                  <div
                    className="button--inner"
                    style={{
                      backgroundColor: customCTABackground,
                      borderColor: customCTABackground,
                    }}
                  >
                    View Offer
                  </div>
                </RouterLink>
              </div>
            </ProductCard>
          ),
      )}
    </Carousel>
  );
};

export default React.memo(ProductCarousel);
