import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/Card';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import RouterLink from '../../components/RouterLink/RouterLink';
import { rangeList_rangeList as IRangeData } from '../../../generated/rangeList';
import { getRangeImages } from './gql';

interface IVehicleCardProps {
  isPersonalPrice: boolean;
  data?: IRangeData;
  viewRange: (rangeId: string) => void;
}

const RangeCard = memo(
  ({ isPersonalPrice, data, viewRange }: IVehicleCardProps) => {
    // TODO: Should be changed when query for get images will updated
    const { data: imagesData } = getRangeImages(data?.rangeId || '');
    const imageProps = imagesData?.vehicleImages?.[0]
      ? {
          imageSrc: imagesData?.vehicleImages?.[0]?.mainImageUrl || '',
        }
      : {};
    return (
      <Card
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        {...imageProps}
        title={{
          title: '',
          link: (
            <RouterLink
              link={{
                href: '',
                label: data?.rangeName || '',
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
            />
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={data?.minPrice}
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
            onClick={() => viewRange(data?.rangeId || '')}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default RangeCard;
