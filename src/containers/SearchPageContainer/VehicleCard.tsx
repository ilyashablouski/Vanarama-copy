import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import { ICardTitleProps } from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

type ICardData = ICard & {
  bodyStyleName: string;
  slug: string;
};

export interface IProductPageUrl {
  url: string;
  manufacturer: string;
  range: string;
  bodyStyle?: string;
  derivative: string;
  capId: string;
}

interface IVehicleCardProps {
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICardData;
  viewOffer: (productPageUrl: IProductPageUrl) => void;
}

const VehicleCard = memo(
  ({ title, isPersonalPrice, data, viewOffer }: IVehicleCardProps) => {
    const features = (keyInformation: any[]): TIcon[] => {
      return keyInformation.map(information => ({
        icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
        label: information.value,
      }));
    };

    const productPageUrl = () => {
      const leasing =
        data.vehicleType === VehicleTypeEnum.CAR
          ? 'car-leasing'
          : 'van-leasing';
      const manufacturer =
        data.manufacturerName
          ?.toLocaleLowerCase()
          .split(' ')
          .join('-') || '';
      const range =
        data.rangeName
          ?.toLocaleLowerCase()
          .split(' ')
          .join('-') || '';
      const bodyStyle =
        data.bodyStyleName
          ?.toLocaleLowerCase()
          .split(' ')
          .join('-') || '';
      const derivative = data.slug || '';

      return data.vehicleType === VehicleTypeEnum.CAR
        ? {
            url: `${leasing}/${manufacturer}/${range}/${bodyStyle}/${derivative}`,
            manufacturer,
            range,
            bodyStyle,
            derivative,
            capId: data.capId as string,
          }
        : {
            url: `${leasing}/${manufacturer}/${range}/${derivative}`,
            manufacturer,
            range,
            derivative,
            capId: data.capId as string,
          };
    };

    return (
      <Card
        header={{
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ) : null,
          accentText: data?.isOnOffer ? 'Hot Deal' : '',
          text: data?.leadTime || '',
        }}
        features={
          (!!data?.keyInformation?.length && features(data.keyInformation)) ||
          []
        }
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc={data?.imageUrl || ''}
        onCompare={() => {}}
        onWishlist={() => {}}
        title={{
          ...title,
          score: data?.averageRating || undefined,
          link: (
            <RouterLink
              link={{
                href: productPageUrl().url,
                label: `${data?.manufacturerName} ${data?.rangeName}`,
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
            />
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={isPersonalPrice ? data?.personalRate : data?.businessRate}
            size="large"
            separator="."
            priceDescription="Per Month Exc.VAT"
          />
          <Button
            color="teal"
            fill="solid"
            label="View Offer"
            onClick={() => viewOffer(productPageUrl())}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default VehicleCard;
