import React, { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { bodyStyleList_bodyStyleList as IModelData } from '../../../generated/bodyStyleList';
import { useModelImages } from './gql';
import { useGenericSearchPageSlug } from '../../gql/genericPage';
import { formatUrl } from '../../utils/url';
import { capitalizeFirstLetter } from '../../utils/textTransform';
import Skeleton from '../../components/Skeleton';

const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards/Card'), {
  loading: () => <Skeleton count={1} />,
});

interface IModelCardProps {
  isPersonalPrice: boolean;
  data?: IModelData;
}

const ModelCard = memo(({ isPersonalPrice, data }: IModelCardProps) => {
  const { query } = useRouter();
  const [imageProps, setImageProps] = useState({});
  const [loadImageData, { data: imageData }] = useModelImages([
    data?.capId?.toString() || '1',
  ]);

  useEffect(() => {
    setImageProps({
      imageSrc: imageData?.vehicleImages?.[0]?.mainImageUrl || '',
    });
  }, [imageData]);

  const make = query.make as string;
  const rangeName = (query.rangeName as string).split('+').join(' ') || '';
  const newUrl = formatUrl(
    `car-leasing/${query.dynamicParam}/${rangeName}/${data?.bodyStyle}`,
  );
  const { data: legacySlug } = useGenericSearchPageSlug(newUrl);
  return (
    <Card
      loadImageProps={loadImageData}
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      inline
      {...imageProps}
      title={{
        title: '',
        link: (
          <RouterLink
            link={{
              href: legacySlug?.genericPage.metaData.legacyUrl || newUrl,
              label: `${capitalizeFirstLetter(make)} ${capitalizeFirstLetter(
                rangeName,
              )} ${data?.bodyStyle || ''}`,
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
            href: legacySlug?.genericPage.metaData.legacyUrl || newUrl,
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

export default React.memo(ModelCard);
