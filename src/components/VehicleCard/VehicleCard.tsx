import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';

import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
import { ICardHeaderProps } from 'core/molecules/cards/CardHeader';

import {
  FinanceTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import { FuelTypeEnum } from '../../../entities/global';

import { formatProductPageUrl } from '../../utils/url';
import { isWished } from '../../utils/wishlistHelpers';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { features } from '../ProductCarousel/helpers';
import { onSavePagePosition } from './helpers';
import useWishlist from '../../hooks/useWishlist';

import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const ProductCard = dynamic(() => import('core/molecules/cards/ProductCard'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'));
const Flame = dynamic(() => import('core/assets/icons/Flame'));

interface IVehicleCardProps {
  loadImage?: boolean;
  lazyLoad?: boolean;
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
  bodyStyle?: string | null | undefined;
  isModelPage?: boolean;
  url: string;
  derivativeId?: string | null;
  index?: number;
  customCTAColor?: string;
  customCTATextColor?: string;
  customHeader?: React.FC<ICardHeaderProps>;
  isAccentHeader?: boolean;
  dataUiTestId?: string;
}

const VehicleCard = React.memo(
  ({
    loadImage,
    lazyLoad,
    url,
    derivativeId,
    title,
    isPersonalPrice,
    data,
    bodyStyle,
    isModelPage,
    customCTAColor,
    customCTATextColor,
    customHeader,
    isAccentHeader,
    index,
    dataUiTestId,
  }: IVehicleCardProps) => {
    const router = useRouter();

    const { wishlistVehicleIds, wishlistChange } = useWishlist();
    const { compareVehicles, compareChange } = useContext(CompareContext);

    const productPageUrl = formatProductPageUrl(url, derivativeId);
    const urlWithPriceQuery = useMemo(() => {
      if (
        (isPersonalPrice && data?.vehicleType === VehicleTypeEnum.CAR) ||
        (!isPersonalPrice && data?.vehicleType === VehicleTypeEnum.LCV)
      ) {
        return productPageUrl.url;
      }
      return `${productPageUrl.url}?leaseType=${
        isPersonalPrice ? FinanceTypeEnum.PCH : FinanceTypeEnum.BCH
      }`;
    }, [data?.vehicleType, isPersonalPrice, productPageUrl.url]);
    const fuelType = useMemo(
      () => data?.keyInformation?.find(item => item?.name === 'Fuel Type'),
      [data],
    );
    const isElectricVehicle = useMemo(
      () => fuelType?.value === FuelTypeEnum.ELECTRIC,
      [fuelType?.value],
    );
    const isFreeInsuranceVehicle = useMemo(
      () => data?.freeInsurance && data?.vehicleType === VehicleTypeEnum.CAR,
      [data?.freeInsurance, data?.vehicleType],
    );

    const imageProps = !isModelPage
      ? {
          imageSrc:
            data?.imageUrl ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
        }
      : {};

    const extraStyles = {
      background: customCTAColor,
      borderColor: customCTAColor,
      color: customCTATextColor,
    };

    const extendedProductData = {
      ...data,
      bodyStyle,
      pageUrl: productPageUrl,
    };

    return (
      <ProductCard
        dataUiTestId={dataUiTestId}
        loadImage={loadImage}
        className="product"
        lazyLoad={lazyLoad}
        {...imageProps}
        customHeader={customHeader}
        header={{
          text: data?.leadTime ?? '',
          accentText: data?.isOnOffer ? 'Hot Offer' : '',
          accentStyles: isAccentHeader ? extraStyles : undefined,
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="sm hydrated" />
          ) : null,
        }}
        wished={isWished(wishlistVehicleIds, data)}
        compared={isCompared(compareVehicles, data)}
        onCompare={() => compareChange(extendedProductData)}
        onWishlist={() => wishlistChange(extendedProductData)}
        features={features(data?.keyInformation || [], data?.capId || '', Icon)}
        title={{
          title: '',
          score: data?.averageRating || undefined,
          link: (
            <RouterLink
              link={{
                href: urlWithPriceQuery,
                label: '',
              }}
              onClick={() => {
                if (index) {
                  onSavePagePosition(index, router.query);
                }
                sessionStorage.setItem('capId', data.capId || '');
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
              dataTestId="heading-link"
            >
              <Heading
                tag="span"
                size="large"
                className="-pb-100"
                dataUiTestId={
                  dataUiTestId ? `${dataUiTestId}_span_heading` : undefined
                }
              >
                {title?.title || ''}
              </Heading>
              <Heading tag="span" size="small" color="dark">
                {title?.description || ''}
              </Heading>
            </RouterLink>
          ),
        }}
        extrasRender={
          isElectricVehicle || isFreeInsuranceVehicle ? (
            <>
              {isElectricVehicle && (
                <CardLabel
                  text="Free Home charger"
                  icon={<FreeHomeCharger />}
                  dataUiTestId={
                    dataUiTestId
                      ? `${dataUiTestId}_free-home-charger`
                      : undefined
                  }
                />
              )}
              {isFreeInsuranceVehicle && (
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
            price={isPersonalPrice ? data?.personalRate : data?.businessRate}
            size="large"
            separator="."
            priceDescription={`Per Month ${
              isPersonalPrice ? 'Inc' : 'Exc'
            }.VAT`}
            dataUitestId={dataUiTestId}
          />
          <RouterLink
            link={{
              href: urlWithPriceQuery,
              label: 'View Offer',
            }}
            onClick={() => {
              if (index) {
                onSavePagePosition(index, router.query);
              }
              sessionStorage.setItem('capId', data.capId || '');
            }}
            style={extraStyles}
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
            dataTestId="view-offer"
            dataUiTestId={`${dataUiTestId}_view-offer-button`}
          >
            <div className="button--inner">View Offer</div>
          </RouterLink>
        </div>
      </ProductCard>
    );
  },
);

export default React.memo(VehicleCard);
