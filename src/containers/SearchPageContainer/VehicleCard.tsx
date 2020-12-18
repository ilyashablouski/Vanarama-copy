/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
import truncateString from '../../utils/truncateString';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import { formatProductPageUrl } from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { features } from '../../components/ProductCarousel/helpers';
import Skeleton from '../../components/Skeleton';

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
  }: IVehicleCardProps) => {
    const { compareVehicles, compareChange } = useContext(CompareContext);

    const productPageUrl = formatProductPageUrl(url, derivativeId);

    const imageProps = !isModelPage
      ? {
          imageSrc: data?.imageUrl || '/vehiclePlaceholder.jpg',
        }
      : {};

    return (
      <Card
        loadImage={loadImage}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        {...imageProps}
        header={{
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ) : null,
          accentText: data?.isOnOffer ? 'Hot Deal' : '',
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
                sessionStorage.setItem('capId', data.capId || '');
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
              dataTestId="heading-link"
            >
              <Heading tag="span" size="large" className="-pb-100">
                {truncateString(`${data?.manufacturerName} ${data?.rangeName}`)}
              </Heading>
              <Heading tag="span" size="small" color="dark">
                {title?.description || ''}
              </Heading>
            </RouterLink>
          ),
        }}
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
              href: productPageUrl.url,
              label: 'View Offer',
            }}
            onClick={() => {
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

export default VehicleCard;
