import React, { FC } from 'react';
import { ICardProps } from '../interfaces';
import Card from '..';
import CardIcons, { TIcon } from '../CardIcons';
import Button from '../../../atoms/button';
import Icon from '../../../atoms/icon';
import Scale from '../../../assets/icons/Scale';
import Heart from '../../../assets/icons/Heart';
import { isBlackFridayCampaignEnabled } from '../../../../utils/helpers';

export interface IProductCardProps extends ICardProps {
  features?: TIcon[];
  /**
   * Function called when the "Compare" button is clicked
   */
  onCompare?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  /**
   * Function called when the "Wishlist" button is clicked
   */
  onWishlist?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  compared?: boolean;
  wished?: boolean;
  isBlackFridayLabel?: boolean;
}

const ProductCard: FC<IProductCardProps> = props => {
  const {
    onCompare,
    onWishlist,
    children,
    compared,
    wished,
    features,
    isBlackFridayLabel,
  } = props;
  const isBlackFridayFlag =
    isBlackFridayCampaignEnabled() && isBlackFridayLabel;

  return (
    <Card {...props} isBlackFridayFlag={isBlackFridayFlag}>
      {!!features?.length && <CardIcons icons={features} />}
      {children}
      <div className="card-footer">
        {onCompare && (
          <Button
            color={compared ? 'teal' : 'dark'}
            fill="clear"
            iconPosition="before"
            label={
              <>
                <Icon icon={<Scale />} color={compared ? 'teal' : 'dark'} />
                {compared ? 'Remove' : 'Compare'}
              </>
            }
            onClick={onCompare}
            size="xsmall"
            withoutDefaultClass
          />
        )}
        {onWishlist && (
          <Button
            color={wished ? 'teal' : 'dark'}
            fill="clear"
            iconPosition="before"
            label={
              <>
                <Icon icon={<Heart />} color={wished ? 'teal' : 'dark'} />
                {wished ? 'Remove' : 'Wishlist'}
              </>
            }
            onClick={onWishlist}
            size="xsmall"
            withoutDefaultClass
          />
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
