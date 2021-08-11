import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
import { useRouter } from 'next/router';
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

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(
  () => import('core/molecules/cards/ProductCard/ProductCard'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
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
  idx?: number;
  customCTAColor?: string;
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
    idx,
  }: IVehicleCardProps) => {
    const router = useRouter();

    const { wishlistVehicleIds, wishlistChange } = useWishlist();
    const { compareVehicles, compareChange } = useContext(CompareContext);

    const productPageUrl = formatProductPageUrl(url, derivativeId);
    // TODO: Should be uncommented in the future when we are going to use product card banners.
    // const fuelType = useMemo(
    //   () => data?.keyInformation?.find(item => item?.name === 'Fuel Type'),
    //   [data],
    // );

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
      <Card
        loadImage={loadImage}
        lazyLoad={lazyLoad}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
                href: productPageUrl.url,
                label: '',
              }}
              onClick={() => {
                if (idx) {
                  onSavePagePosition(idx, router.query);
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
      >
        {/* TODO: Should be uncommented in the future when we are going to use product card banners. */}
        {/* <div className="gallery-promotion-container"> */}
        {/*  {fuelType?.value === FuelTypeEnum.ELECTRIC && !isModelPage && ( */}
        {/*    <ElectricVehicleBanner /> */}
        {/*  )} */}
        {/*  {data?.isOnOffer && */}
        {/*    data?.vehicleType === VehicleTypeEnum.CAR && */}
        {/*    !isModelPage && <FreeInsuranceBanner />} */}
        {/* </div> */}
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
              href: productPageUrl.url,
              label: 'View Offer',
            }}
            onClick={() => {
              if (idx) {
                onSavePagePosition(idx, router.query);
              }
              sessionStorage.setItem('capId', data.capId || '');
            }}
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
            dataTestId="view-offer"
          >
            <div className="button--inner" style={extraStyles}>
              View Offer
            </div>
          </RouterLink>
        </div>
      </Card>
    );
  },
);

export default React.memo(VehicleCard);
