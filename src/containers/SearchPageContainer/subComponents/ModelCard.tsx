import React, { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RouterLink from '../../../components/RouterLink/RouterLink';
import { bodyStyleList_bodyStyleList as IModelData } from '../../../../generated/bodyStyleList';
import { useModelImages } from '../gql';
import { getGenericSearchPageSlug } from '../../../gql/genericPage';
import { formatUrl } from '../../../utils/url';
import { capitalizeFirstLetter } from '../../../utils/textTransform';
import Skeleton from '../../../components/Skeleton';

const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards/Card'), {
  loading: () => <Skeleton count={1} />,
});

interface IExtModelData extends IModelData {
  legacyUrl?: string;
}
interface IModelCardProps {
  isPersonalPrice: boolean;
  data?: IExtModelData;
  range?: string;
  manufacturer?: string;
  dataUiTestId?: string;
}

const ModelCard = memo(
  ({
    isPersonalPrice,
    data,
    range,
    manufacturer,
    dataUiTestId,
  }: IModelCardProps) => {
    const [legacySlug, setLegacySlug] = useState(data?.legacyUrl || '');
    const { query } = useRouter();
    const { data: imageData } = useModelImages(
      [data?.capId?.toString() || '1'],
      !data?.capId,
    );
    const imageProps = {
      imageSrc: imageData?.vehicleImages?.[0]?.mainImageUrl || '',
    };

    const manufacturerName = manufacturer || (query.dynamicParam as string);
    const rangeName =
      range || (query.rangeName as string).split('+').join(' ') || '';

    // request made on client when model pages navigated using client side router
    useEffect(() => {
      if (!legacySlug) {
        const initGetSlug = async () => {
          const newUrl = formatUrl(
            `car-leasing/${manufacturerName}/${rangeName}/${data?.bodyStyle}`,
          );
          const { data: slug } = await getGenericSearchPageSlug(newUrl);
          setLegacySlug(slug?.genericPage.metaData.legacyUrl || newUrl);
        };
        initGetSlug();
      }
    }, [data, legacySlug, manufacturerName, rangeName]);

    return (
      <Card
        className="-model"
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        inline
        {...imageProps}
        title={{
          title: '',
          link: (
            <RouterLink
              link={{
                href: legacySlug,
                label: `${capitalizeFirstLetter(
                  manufacturerName,
                )} ${capitalizeFirstLetter(rangeName)} ${data?.bodyStyle ||
                  ''}`,
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
            priceDescription={`PM ${isPersonalPrice ? 'Inc' : 'Exc'} VAT`}
          />
          <RouterLink
            link={{
              href: legacySlug,
              label: `View ${data?.count || 'All'} Offers`,
            }}
            className="button"
            classNames={{ size: 'regular', color: 'teal', solid: true }}
            withoutDefaultClassName
            dataUiTestId={`${dataUiTestId}_view-all-button`}
          >
            <div className="button--inner">
              View {data?.count || 'All'} Offers
            </div>
          </RouterLink>
        </div>
      </Card>
    );
  },
);

export default React.memo(ModelCard);
