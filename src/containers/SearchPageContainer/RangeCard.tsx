import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getRangeImages, useModelImages } from './gql';
import { formatToSlugFormat, formatUrl } from '../../utils/url';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { genericPagesQuery_genericPages_items as ILegacyUrls } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';

const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards/Card'), {
  loading: () => <Skeleton count={1} />,
});

const getMakeUrl = (
  makesUrls: ILegacyUrls[],
  searchType: string,
  title: string,
) =>
  makesUrls?.find(
    make => make.slug === `${searchType}/${formatToSlugFormat(title)}`,
  );

const getRangeUrl = (
  rangesUrls: ILegacyUrls[],
  searchType: string,
  title: string,
  dynamicParam: string,
) =>
  rangesUrls?.find(
    range =>
      range.slug ===
      `${searchType}/${formatToSlugFormat(dynamicParam)}/${formatToSlugFormat(
        title,
      )}`,
  );

interface IVehicleCardProps {
  isPersonalPrice: boolean;
  title: string;
  fromPrice?: number;
  id: string;
  vehicleType: VehicleTypeEnum;
  isAllMakesCard?: boolean;
  rangesUrls?: ILegacyUrls[];
  makesUrls?: ILegacyUrls[];
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
    makesUrls,
  }: IVehicleCardProps) => {
    // TODO: Should be changed when query for get images will updated
    const { pathname, query } = useRouter();
    const searchType = pathname.slice(1).split('/')[0];

    const nextUrl = isAllMakesCard
      ? getMakeUrl(makesUrls || [], searchType, title)
      : getRangeUrl(
          rangesUrls || [],
          searchType,
          title,
          query.dynamicParam as string,
        );

    // test using of slug for routing, only for Abarth
    const href = nextUrl?.slug?.includes('abarth')
      ? nextUrl?.slug
      : nextUrl?.legacyUrl || nextUrl?.slug;

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
              ?.mainImageUrl ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
        }
      : { imageSrc: `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg` };
    return (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        {...imageProps}
        title={{
          title: '',
          link: (
            <RouterLink
              link={{
                href: formatUrl(href || ''),
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
              href: formatUrl(href || ''),
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

export default React.memo(RangeCard);
