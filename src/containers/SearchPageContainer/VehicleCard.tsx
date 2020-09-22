/* eslint-disable @typescript-eslint/camelcase */
import React, { memo, useContext } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import { ICardTitleProps } from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import { formatProductPageUrl } from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

interface IVehicleCardProps {
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
  viewOffer: (productPageUrl: IProductPageUrl) => void;
  bodyStyle?: string | null | undefined;
  isModelPage?: boolean;
  url: string;
  derivativeId?: string | null;
}

const VehicleCard = memo(
  ({
    url,
    derivativeId,
    title,
    isPersonalPrice,
    data,
    viewOffer,
    bodyStyle,
    isModelPage,
  }: IVehicleCardProps) => {
    const { compareVehicles, compareChange } = useContext(CompareContext);

    const features = (keyInformation: any[]): TIcon[] => {
      return keyInformation.map(information => ({
        icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
        label: information.value,
        index: `${data.capId}_${information.name}`,
      }));
    };

    const productPageUrl = formatProductPageUrl(url, derivativeId);

    const imageProps = !isModelPage
      ? {
          imageSrc: data?.imageUrl || '',
        }
      : {};

    return (
      <Card
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
        features={features(data?.keyInformation || [])}
        title={{
          ...title,
          score: data?.averageRating || undefined,
          link: (
            <RouterLink
              link={{
                href: productPageUrl.href,
                label: `${data?.manufacturerName} ${data?.rangeName}`,
              }}
              as={productPageUrl.url}
              onClick={() => {
                sessionStorage.setItem('capId', data.capId || '');
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
              dataTestId="heading-link"
            />
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
              href: productPageUrl.href,
              label: 'View Offer',
            }}
            as={productPageUrl.url}
            onClick={() => viewOffer(productPageUrl)}
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
