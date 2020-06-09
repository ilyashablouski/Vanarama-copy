import React, { FC, memo } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { ICardProps } from '@vanarama/uibook/lib/components/molecules/card/interfaces';
import Card from '@vanarama/uibook/lib/components/molecules/card';
import Price from '@vanarama/uibook/lib/components/atoms/price';

export interface IProductCardProps extends ICardProps {
  price: number;
  priceDescription: string;
}

const ProductCard: FC<IProductCardProps> = memo(props => {
  const { price, priceDescription, onViewOffer } = props;

  return (
    <Card {...props}>
      <div className="-flex-h">
        <Price
          price={price || 0}
          size="large"
          separator="."
          priceDescription={priceDescription}
        />
        <Button
          color="teal"
          fill="solid"
          label="View Offer"
          onClick={onViewOffer}
          size="regular"
        />
      </div>
    </Card>
  );
});

export default ProductCard;
