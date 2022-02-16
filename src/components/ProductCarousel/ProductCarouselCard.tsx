import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';
import ProductCard from 'core/molecules/cards/ProductCard';
import React, { FC, useContext, memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { features } from './helpers';
import {
  formatProductPageUrl,
  getLegacyUrl,
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { isWished } from '../../utils/wishlistHelpers';
import RouterLink from '../RouterLink';
import truncateString from '../../utils/truncateString';
import { FuelTypeEnum } from '../../../entities/global';
import {
  FinanceTypeEnum,
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  GetProductCard_derivatives,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import useWishlist from '../../hooks/useWishlist';
import { CompareContext } from '../../utils/comparatorTool';
import { IProductCarouselCard } from './interface';

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

const ProductCarouselCard: FC<IProductCarouselCard> = props => {
  const {
    product,
    cardIndex,
    leaseType,
    data,
    dataTestIdBtn,
    dataUiTestIdMask,
    productType,
    customCTABackground,
    lazyLoadForCarouselImages,
  } = props;

  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const { vehicles: migratedManufacturers } = useContext(
    ManufacturersSlugContext,
  );

  const isMigrated = useMemo(
    () =>
      isManufacturerMigrated(
        (product.vehicleType === VehicleTypeEnum.CAR
          ? migratedManufacturers?.car?.manufacturers
          : migratedManufacturers?.lcv?.manufacturers) || [],
        product.manufacturerName || '',
      ),
    [
      migratedManufacturers?.car?.manufacturers,
      migratedManufacturers?.lcv?.manufacturers,
      product.manufacturerName,
      product.vehicleType,
    ],
  );

  const urlWithPriceQuery = useMemo(() => {
    if (
      (leaseType === LeaseTypeEnum.PERSONAL &&
        product.vehicleType === VehicleTypeEnum.CAR) ||
      (leaseType === LeaseTypeEnum.BUSINESS &&
        product.vehicleType === VehicleTypeEnum.LCV)
    ) {
      return getLegacyUrl(data.vehicleList?.edges, product?.capId, isMigrated);
    }
    return `${getLegacyUrl(
      data.vehicleList?.edges,
      product?.capId,
      isMigrated,
    )}?leaseType=${
      leaseType === LeaseTypeEnum.PERSONAL
        ? FinanceTypeEnum.PCH
        : FinanceTypeEnum.BCH
    }`;
  }, [
    data.vehicleList?.edges,
    leaseType,
    product?.capId,
    product.vehicleType,
    isMigrated,
  ]);

  return (
    <ProductCard
      // loadImage
      dataUiTestId={
        dataUiTestIdMask ? `${dataUiTestIdMask}-card_${cardIndex}` : undefined
      }
      style={{ maxHeight: 600 }}
      alt={`${product?.manufacturerName} ${product?.modelName} ${product?.derivativeName}`}
      lazyLoad={lazyLoadForCarouselImages || cardIndex !== 0}
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
          bodyStyle: getBodyStyle(product, data.derivatives, productType),
          ...product,
        });
      }}
      compared={isCompared(compareVehicles, product)}
      imageSrc={
        product.imageUrl || `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
      }
      placeholderImage={`${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`}
      onWishlist={() =>
        wishlistChange({
          pageUrl: formatProductPageUrl(
            getLegacyUrl(data?.vehicleList?.edges, product.capId),
            product.capId,
          ),
          bodyStyle: getBodyStyle(product, data.derivatives, productType),
          ...product,
        })
      }
      wished={isWished(wishlistVehicleIds, product)}
      title={{
        title: '',
        link: (
          <RouterLink
            link={{
              href: urlWithPriceQuery,
              label: '',
            }}
            onClick={() => sessionStorage.setItem('capId', product.capId || '')}
            className="heading"
            classNames={{ size: 'large', color: 'black' }}
          >
            <Heading tag="span" size="large" className="-pb-100">
              {truncateString(
                `${product?.manufacturerName} ${product?.modelName}`,
              )}
            </Heading>
            <Heading
              tag="span"
              size="small"
              color="dark"
              dataUiTestId={
                dataUiTestIdMask
                  ? `${dataUiTestIdMask}_product-carousel-card_derivative-name`
                  : undefined
              }
            >
              {product?.derivativeName || ''}
            </Heading>
          </RouterLink>
        ),
        score: product.averageRating ?? 0,
      }}
      extrasRender={
        getVehicle(product, data.derivatives)?.fuelType?.name ===
          FuelTypeEnum.ELECTRIC ||
        (product?.freeInsurance &&
          product.vehicleType === VehicleTypeEnum.CAR) ? (
          <>
            {getVehicle(product, data.derivatives)?.fuelType?.name ===
              FuelTypeEnum.ELECTRIC && (
              <CardLabel
                text="Free Home charger"
                dataUiTestId={
                  dataUiTestIdMask
                    ? `${dataUiTestIdMask}_product-carousel-card_free-home-charger`
                    : undefined
                }
                icon={<FreeHomeCharger />}
              />
            )}
            {product?.freeInsurance &&
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
          dataUitestId={dataUiTestIdMask}
        />
        <RouterLink
          link={{
            href: urlWithPriceQuery,
            label: 'View Offer',
          }}
          onClick={() => sessionStorage.setItem('capId', product.capId || '')}
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
          dataTestId={dataTestIdBtn}
          dataUiTestId={
            dataUiTestIdMask
              ? `${dataUiTestIdMask}-view-offer_${cardIndex}`
              : undefined
          }
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
  );
};

export default memo(ProductCarouselCard);
