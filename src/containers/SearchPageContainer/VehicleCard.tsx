import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
// import truncateString from '../../utils/truncateString';
import { useRouter } from 'next/router';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import { formatProductPageUrl } from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { features } from '../../components/ProductCarousel/helpers';
import Skeleton from '../../components/Skeleton';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { onSavePagePosition } from './helpers';

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

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

interface IVehicleCardProps {
  loadImage?: boolean;
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
  bodyStyle?: string | null | undefined;
  isModelPage?: boolean;
  url: string;
  derivativeId?: string | null;
  idx?: number;
}

const VehicleCard = React.memo(
  ({
    loadImage,
    url,
    derivativeId,
    title,
    isPersonalPrice,
    data,
    bodyStyle,
    isModelPage,
    idx,
  }: IVehicleCardProps) => {
    const router = useRouter();
    const { compareVehicles, compareChange } = useContext(CompareContext);

    const productPageUrl = formatProductPageUrl(url, derivativeId);

    const imageProps = !isModelPage
      ? {
          imageSrc:
            data?.imageUrl ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
        }
      : {};

    return (
      <Card
        loadImage={loadImage}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        {...imageProps}
        header={{
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="sm hydrated" />
          ) : null,
          accentText: data?.isOnOffer ? 'Hot Offer' : '',
          text: data?.leadTime || '',
        }}
        onCompare={() => {
          compareChange({
            ...data,
            bodyStyle,
            pageUrl: productPageUrl,
          });
        }}
        compared={isCompared(compareVehicles, data)}
        onWishlist={() => {}}
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
                if (idx) onSavePagePosition(idx, router.query);
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
        {data?.isOnOffer && data?.vehicleType === VehicleTypeEnum.CAR && (
          <img
            loading="eager"
            sizes="(min-width:320px) 800px, 1200px"
            alt="Free insurance"
            className="gallery-free-insurance"
            src={`${process.env.HOST_DOMAIN}/Assets/images/insurance/1-Year-Free-Insurance.png`}
          />
        )}
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
              if (idx) onSavePagePosition(idx, router.query);
              sessionStorage.setItem('capId', data.capId || '');
            }}
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
            dataTestId="view-offer"
          >
            <div className="button--inner">View Offer</div>
          </RouterLink>
        </div>
      </Card>
    );
  },
);

export default React.memo(VehicleCard);
