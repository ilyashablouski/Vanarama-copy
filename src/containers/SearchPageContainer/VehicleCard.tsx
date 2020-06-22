import React from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { ICardTitleProps } from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { ICardHeaderProps } from '@vanarama/uibook/lib/components/molecules/cards/CardHeader';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';

const FEATURES = [
  {
    icon: <Icon icon={<SnowSharp />} color="dark" />,
    label: 'Aircon',
  },
  {
    icon: <Icon icon={<BluetoothSharp />} color="dark" />,
    label: 'Bluetooth',
  },
  {
    icon: <Icon icon={<CompassSharp />} color="dark" />,
    label: 'Navigation',
  },
  {
    icon: <Icon icon={<WifiSharp />} color="dark" />,
    label: 'Sensors',
  },
];

interface IVehicleCardProps {
  header: ICardHeaderProps;
  title: ICardTitleProps;
  price: number | null;
}

const VehicleCard = ({ header, title, price }: IVehicleCardProps) => {
  return (
    <Card
      header={header}
      description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
      imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      features={FEATURES}
      onCompare={() => {}}
      onWishlist={() => {}}
      title={title}
      withFooter
    >
      <div className="-flex-h">
        <Price
          price={price || null}
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
};

export default VehicleCard;
