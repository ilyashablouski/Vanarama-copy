import React, { memo, useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getRangeImages, useModelImages } from './gql';
import {
  formatToSlugFormat,
  formatUrl,
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { genericPagesQuery_genericPages as IGenericPages } from '../../../generated/genericPagesQuery';
import Skeleton from '../../components/Skeleton';

const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards/Card'), {
  loading: () => <Skeleton count={1} />,
});

const getManufacturerUrl = (
  manufacturersUrls: IGenericPages['items'],
  searchType: string,
  title: string,
) =>
  manufacturersUrls?.find(
    manufacturer =>
      manufacturer?.slug === `${searchType}/${formatToSlugFormat(title)}`,
  );

const getRangeUrl = (
  rangesUrls: IGenericPages['items'],
  searchType: string,
  title: string,
  dynamicParam: string,
) =>
  rangesUrls?.find(
    range =>
      range?.slug ===
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
  isAllManufacturersCard?: boolean;
  rangesUrls?: IGenericPages['items'];
  manufacturersUrls?: IGenericPages['items'];
  dataUiTestId?: string;
}

const RangeCard = memo(
  ({
    isPersonalPrice,
    id,
    vehicleType,
    title,
    fromPrice,
    isAllManufacturersCard,
    rangesUrls,
    manufacturersUrls,
    dataUiTestId,
  }: IVehicleCardProps) => {
    const { pathname, query } = useRouter();
    const searchType = pathname.slice(1).split('/')[0];
    const isCarSearch = useMemo(() => searchType.includes('car'), [searchType]);
    const nextUrl = isAllManufacturersCard
      ? getManufacturerUrl(manufacturersUrls || [], searchType, title)
      : getRangeUrl(
          rangesUrls || [],
          searchType,
          title,
          query.dynamicParam as string,
        );
    const manufacturerName = useMemo(
      () => nextUrl?.slug?.slice(1).split('/')[1] || '',
      [nextUrl?.slug],
    );
    const { vehicles: migratedManufacturers } = useContext(
      ManufacturersSlugContext,
    );

    // test using of slug for routing, only for Abarth
    const href =
      nextUrl?.slug?.includes('abarth') ||
      // getting manufacturer name from url
      isManufacturerMigrated(
        (isCarSearch
          ? migratedManufacturers.car.manufacturers
          : migratedManufacturers.lcv.manufacturers) || [],
        manufacturerName,
      )
        ? nextUrl?.slug
        : nextUrl?.legacyUrl || nextUrl?.slug;

    const { data: imagesData } = getRangeImages(
      id,
      vehicleType,
      !id || isAllManufacturersCard,
    );
    const { data: imagesManufacturerData } = useModelImages(
      [id],
      !id || !isAllManufacturersCard,
    );

    const imageProps = {
      imageSrc:
        (!isAllManufacturersCard ? imagesData : imagesManufacturerData)
          ?.vehicleImages?.[0]?.mainImageUrl ||
        `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
    };

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
              dataUiTestId={dataUiTestId}
            />
          ),
        }}
        dataUiTestId={dataUiTestId}
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
            dataUiTestId={
              dataUiTestId ? `${dataUiTestId}_view-all-button` : undefined
            }
          >
            <div className="button--inner">View All</div>
          </RouterLink>
        </div>
      </Card>
    );
  },
);

export default React.memo(RangeCard);
