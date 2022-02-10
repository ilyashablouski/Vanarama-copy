import React from 'react';
import dynamic from 'next/dynamic';
import Button from 'core/atoms/button/Button';
import { features } from '../ProductCarousel/helpers';
import Skeleton from '../Skeleton';
import { GetConversionsVehicleList_conversions as IDerangedCard } from '../../../generated/GetConversionsVehicleList';
import { Nullable } from '../../types/common';

const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const ProductCard = dynamic(
  () => import('core/molecules/cards/ProductCard/ProductCard'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(() => import('core/atoms/icon'));
const Flame = dynamic(() => import('core/assets/icons/Flame'));

const getImageSrc = (data: IDerangedCard) =>
  data.conversionImages?.[0] ?? data.imageUrl;

interface IDerangedVehicleCardProps {
  loadImage?: boolean;
  lazyLoad?: boolean;
  title: { title: string; description: string };
  data: IDerangedCard;
  handleClick: (
    imageSrc: string,
    title: string,
    description: string,
    conversionId: Nullable<number>,
    capId: Nullable<string>,
  ) => void;
  dataUiTestId?: string;
}

const DerangedVehicleCard = React.memo(
  ({
    lazyLoad,
    loadImage,
    title,
    data,
    handleClick,
    dataUiTestId,
  }: IDerangedVehicleCardProps) => {
    const imageProps = {
      imageSrc:
        getImageSrc(data) ??
        `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
    };

    const price = data.lowestPrices?.find(
      item => item?.leaseType === 'BUSINESS',
    );

    return (
      <ProductCard
        loadImage={loadImage}
        lazyLoad={lazyLoad}
        dataUiTestId={dataUiTestId}
        {...imageProps}
        header={{
          accentIcon: data.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="sm hydrated" />
          ) : null,
          accentText: data.isOnOffer ? 'Hot Offer' : '',
          text: data.leadTime || '',
        }}
        features={features(data.keyInformation || [], data.capId || '', Icon)}
        title={{
          title: title.title,
          description: title.description,
          score: data.averageRating || undefined,
        }}
      >
        <div className="-flex-h">
          <Price
            price={price?.value}
            size="large"
            separator="."
            priceDescription="Per Month Exc.VAT"
            dataUitestId={dataUiTestId}
          />
          <Button
            color="teal"
            fill="solid"
            label="Enquire Now"
            size="regular"
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_card_button_enquire-now`
                : undefined
            }
            onClick={() =>
              handleClick(
                imageProps.imageSrc,
                title.title,
                title.description,
                data.conversionId,
                data.capId,
              )
            }
          />
        </div>
      </ProductCard>
    );
  },
);

export default React.memo(DerangedVehicleCard);
