import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CarouselSwiper from 'core/organisms/carousel';
import ProductCard from 'core/molecules/cards/ProductCard';
import { useMediaQuery } from 'react-responsive';
import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';
import { SwiperSlide } from 'swiper/react';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../RouterLink/RouterLink';
import { formatProductPageUrl, getLegacyUrl } from '../../utils/url';
import {
  GetProductCard,
  GetProductCard_derivatives,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import truncateString from '../../utils/truncateString';

import { features } from './helpers';
import useWishlist from '../../hooks/useWishlist';
import { FuelTypeEnum } from '../../../entities/global';

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

  console.log('data.productCard', data.productCard);

  return (
    <CarouselSwiper
      className="-product -mh-auto"
      countItems={countItems || 6}
      key={carouselKey}
    >
      {data.productCard?.map(
        (product, index) =>
          product && (
            <SwiperSlide key={`${product.capId}_${index}` || ''}>
              <ProductCard
                // loadImage
                style={{ maxHeight: 600 }}
                alt={`${product?.manufacturerName} ${product?.modelName} ${product?.derivativeName}`}
                lazyLoad={index !== 0}
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
                extrasRender={
                  getVehicle(product, data.derivatives)?.fuelType?.name ===
                    FuelTypeEnum.ELECTRIC ||
                  (product?.isOnOffer &&
                    product.vehicleType === VehicleTypeEnum.CAR) ? (
                    <>
                      {getVehicle(product, data.derivatives)?.fuelType?.name ===
                        FuelTypeEnum.ELECTRIC && (
                        <CardLabel
                          text="Free Home charger"
                          icon={<FreeHomeCharger />}
                        />
                      )}
                      {product?.isOnOffer &&
                        product.vehicleType === VehicleTypeEnum.CAR && (
                          <CardLabel
                            text="1yr Free Insurance"
                            icon={<FreeInsuranceCardLabelIcon />}
                          />
                        )}
                    </>
                  ) : null
                }
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
                      href: getLegacyUrl(
                        data.vehicleList?.edges,
                        product?.capId,
                      ),
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
            </SwiperSlide>
          ),
      )}
    </CarouselSwiper>
  );
};

export default React.memo(ProductCarousel);
