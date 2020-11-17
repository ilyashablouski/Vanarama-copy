import React, { memo } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/Card';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import { useRouter } from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getRangeImages, useModelImages } from './gql';
import { formatUrl } from '../../utils/url';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

interface IVehicleCardProps {
  isPersonalPrice: boolean;
  title: string;
  fromPrice?: number;
  id: string;
  vehicleType: VehicleTypeEnum;
  isAllMakesCard?: boolean;
}

const RangeCard = memo(
  ({
    isPersonalPrice,
    id,
    vehicleType,
    title,
    fromPrice,
    isAllMakesCard,
  }: IVehicleCardProps) => {
    // TODO: Should be changed when query for get images will updated
    const { pathname, query } = useRouter();
    const searchType = pathname.slice(1).split('/')[0];
    const href = isAllMakesCard
      ? `/${title}-${searchType}.html`
      : `/${query.dynamicParam}-${searchType}/${title}.html`;
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
