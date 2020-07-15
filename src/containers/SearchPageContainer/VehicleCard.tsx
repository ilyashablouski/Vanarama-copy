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
};

interface IVehicleCardProps {
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICardData;
  viewOffer: (capId: string) => void;
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
        data.manufacturerName?.toLocaleLowerCase().replace(' ', '-') || '';
      const range = data.rangeName?.toLocaleLowerCase().replace(' ', '-') || '';
      const bodystyle =
        data.bodyStyleName?.toLocaleLowerCase().replace(' ', '-') || '';
      const derivative =
        data.derivativeName?.toLocaleLowerCase().replace(' ', '-') || '';

      return data.vehicleType === VehicleTypeEnum.CAR
        ? `${leasing}/${manufacturer}/${range}/${bodystyle}/${derivative}`
        : `${leasing}/${manufacturer}/${range}/${derivative}`;
    };

    console.log(productPageUrl());

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
                href: `${
                  data?.vehicleType === 'CAR' ? '/cars/car-' : '/vans/van-'
                }details/${data?.capId}`,
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
            onClick={() => viewOffer(data.capId || '')}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default VehicleCard;
