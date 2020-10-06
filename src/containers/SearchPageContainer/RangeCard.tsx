import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/Card';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getRangeImages, useModelImages } from './gql';

interface IVehicleCardProps {
  isPersonalPrice: boolean;
  onView: () => void;
  title: string;
  fromPrice?: number;
  id: string;
  isAllMakesCard?: boolean;
}

const RangeCard = memo(
  ({
    isPersonalPrice,
    id,
    title,
    fromPrice,
    onView,
    isAllMakesCard,
  }: IVehicleCardProps) => {
    // TODO: Should be changed when query for get images will updated
    const { data: imagesData } = getRangeImages(id, !id || isAllMakesCard);
    const { data: imagesMakeData } = useModelImages(
      [id],
      !id || !isAllMakesCard,
    );
    const imageProps = (!isAllMakesCard ? imagesData : imagesMakeData)
      ?.vehicleImages?.[0]
      ? {
          imageSrc:
            (!isAllMakesCard ? imagesData : imagesMakeData)?.vehicleImages?.[0]
              ?.mainImageUrl || '',
        }
      : {};
    return (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        {...imageProps}
        title={{
          title: '',
          link: (
            <RouterLink
              link={{
                href: '',
                label: title || '',
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
            />
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={fromPrice}
            priceLabel="from"
            size="large"
            separator="."
            priceDescription={`Per Month ${
              isPersonalPrice ? 'Inc' : 'Exc'
            }.VAT`}
          />
          <Button
            color="teal"
            fill="solid"
            label="View All"
            onClick={onView}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default RangeCard;
