import React, { FC } from 'react';
import useFeatures from '../../../../hooks/useFeatures';
import { ICardProps } from '../interfaces';
import Card from '..';
import CardIcons, { TIcon } from '../CardIcons';
import Button from '../../../atoms/button';
import Icon from '../../../atoms/icon';
import Scale from '../../../assets/icons/Scale';

export interface IProductCardProps extends ICardProps {
  capId: string;
  keyInfo: any[];
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
}

const ProductCard: FC<IProductCardProps> = props => {
  const { keyInfo, capId, onCompare, children, compared } = props;

  const features = useFeatures(keyInfo, capId, Icon);

  return (
    <Card {...props}>
      {!!features?.length && <CardIcons icons={features} />}
      {children}
      <div className="card-footer">
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
        {
          // TODO: can be revert this commit when wishlist functionality will back
          /* <Button
          color="dark"
          fill="clear"
          iconPosition="before"
          label={
            <>
              <Icon icon={<HeartSharp />} color="dark" /> Wishlist
            </>
          }
          onClick={onWishlist}
          size="xsmall"
          withoutDefaultClass
        /> */
        }
      </div>
    </Card>
  );
};

export default ProductCard;
