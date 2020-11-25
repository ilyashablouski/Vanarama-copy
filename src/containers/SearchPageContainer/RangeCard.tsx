import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getRangeImages, useModelImages } from './gql';
import { formatUrl } from '../../utils/url';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { genericPagesQuery_genericPages_items as IRangeUrls } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';

const Price = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/price'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards/Card'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IVehicleCardProps {
  isPersonalPrice: boolean;
  title: string;
  fromPrice?: number;
  id: string;
  vehicleType: VehicleTypeEnum;
  isAllMakesCard?: boolean;
  rangesUrls?: IRangeUrls[];
}

const RangeCard = memo(
  ({
    isPersonalPrice,
    id,
    vehicleType,
    title,
    fromPrice,
    isAllMakesCard,
    rangesUrls,
  }: IVehicleCardProps) => {
    // TODO: Should be changed when query for get images will updated
    const { pathname, query } = useRouter();
    const convertSlug = (value: string) =>
      value
        .toLowerCase()
        .split(' ')
        .join('-');
    const searchType = pathname.slice(1).split('/')[0];
    const getUrl = () =>
      rangesUrls?.find(
        range =>
          range.slug ===
          `${searchType}/${convertSlug(
            query.dynamicParam as string,
          )}/${convertSlug(title)}`,
      )?.legacyUrl || '';
    const href = isAllMakesCard ? `/${title}-${searchType}.html` : getUrl();
    const { data: imagesData } = getRangeImages(
      id,
      vehicleType,
      !id || isAllMakesCard,
    );
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
                href: formatUrl(href),
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
          <RouterLink
            link={{
              href: formatUrl(href),
              label: 'View All' || '',
            }}
            className="button"
            classNames={{ size: 'regular', color: 'teal', solid: true }}
            withoutDefaultClassName
          >
            <div className="button--inner">View All</div>
          </RouterLink>
        </div>
      </Card>
    );
  },
);

export default RangeCard;
