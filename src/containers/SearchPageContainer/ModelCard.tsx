import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/Card';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { bodyStyleList_bodyStyleList as IModelData } from '../../../generated/bodyStyleList';
import { useModelImages } from './gql';

interface IModelCardProps {
  isPersonalPrice: boolean;
  data?: IModelData;
  viewModel: (bodyStyle: string) => void;
}

const ModelCard = memo(
  ({ isPersonalPrice, data, viewModel }: IModelCardProps) => {
    const router = useRouter();
    const { data: imagesData } = useModelImages(
      [data?.capId?.toString() || '1'],
      !data?.capId,
    );
    const imageProps = imagesData?.vehicleImages?.[0]
      ? {
          imageSrc: imagesData?.vehicleImages?.[0]?.mainImageUrl || '',
        }
      : {};

    const rangeName =
      (router.query.rangeName as string).split('+').join(' ') || '';
    return (
      <Card
        inline
        {...imageProps}
        title={{
          title: '',
          link: (
            <RouterLink
              link={{
                href: '',
                label: `${rangeName} ${data?.bodyStyle || ''}`,
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
            label={`View ${data?.count || 'All'} Offers`}
            onClick={() => viewModel(data?.bodyStyle || '')}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default ModelCard;
