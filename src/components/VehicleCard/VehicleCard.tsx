import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
import { useRouter } from 'next/router';
import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../RouterLink/RouterLink';
import { formatProductPageUrl } from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { features } from '../ProductCarousel/helpers';
import Skeleton from '../Skeleton';
import { onSavePagePosition } from './helpers';
import useWishlist from '../../hooks/useWishlist';
import { isWished } from '../../utils/wishlistHelpers';
import { FuelTypeEnum } from '../../../entities/global';
import {
  FinanceTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';

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
        header={{
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="sm hydrated" />
          ) : null,
          accentText: data?.isOnOffer ? 'Hot Offer' : '',
          text: data?.leadTime || '',
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
              <Heading tag="span" size="large" className="-pb-100">
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
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
            dataTestId="view-offer"
            dataUiTestId={`${dataUiTestId}_view-offer-button`}
          >
            <div className="button--inner" style={extraStyles}>
              View Offer
            </div>
          </RouterLink>
        </div>
      </ProductCard>
    );
  },
);

export default React.memo(VehicleCard);
