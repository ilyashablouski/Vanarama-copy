import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import { ICardTitleProps } from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';

interface IVehicleCardProps {
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
}

const VehicleCard = memo(
  ({ title, isPersonalPrice, data }: IVehicleCardProps) => {
    const features = (keyInformation: any[]): TIcon[] => {
      return keyInformation.map(information => ({
        icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
        label: information.value,
      }));
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
        imageSrc={data?.imageUrl || undefined}
        onCompare={() => {}}
        onWishlist={() => {}}
        title={{
          ...title,
          score: data?.averageRating || undefined,
          link: (
            <a href="/" className="heading -large -black">
              {`${data?.manufacturerName} ${data?.rangeName}`}
            </a>
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={isPersonalPrice ? data.personalRate : data.businessRate}
            size="large"
            separator="."
            priceDescription="Per Month Exc.VAT"
          />
          <Button
            color="teal"
            fill="solid"
            label="View Offer"
            onClick={() => {}}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default VehicleCard;
