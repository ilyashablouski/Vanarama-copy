import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/Card';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { bodyStyleList_bodyStyleList as IModelData } from '../../../generated/bodyStyleList';
import { useModelImages } from './gql';
import { formatUrl } from '../../utils/url';

interface IModelCardProps {
  isPersonalPrice: boolean;
  data?: IModelData;
}

const ModelCard = memo(({ isPersonalPrice, data }: IModelCardProps) => {
  const { query } = useRouter();
  const { data: imagesData } = useModelImages(
    [data?.capId?.toString() || '1'],
    !data?.capId,
  );
  const imageProps = imagesData?.vehicleImages?.[0]
    ? {
        imageSrc: imagesData?.vehicleImages?.[0]?.mainImageUrl || '',
      }
    : {};

  const rangeName = (query.rangeName as string).split('+').join(' ') || '';
  const legacyUrl = `/${query.dynamicParam}-car-leasing/${rangeName}/${data?.bodyStyle}.html`;
  return (
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      inline
      {...imageProps}
      title={{
        title: '',
        link: (
          <RouterLink
            link={{
              href: formatUrl(legacyUrl),
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
          priceDescription={`Per Month ${isPersonalPrice ? 'Inc' : 'Exc'}.VAT`}
        />
        <RouterLink
          link={{
            href: formatUrl(legacyUrl),
            label: `View ${data?.count || 'All'} Offers`,
          }}
          className="button"
          classNames={{ size: 'regular', color: 'teal', solid: true }}
          withoutDefaultClassName
        >
          <div className="button--inner">
            View {data?.count || 'All'} Offers
          </div>
        </RouterLink>
      </div>
    </Card>
  );
});

export default ModelCard;
