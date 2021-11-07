import React from 'react';
import dynamic from 'next/dynamic';
import Button from 'core/atoms/button/Button';
import { features } from '../ProductCarousel/helpers';
import Skeleton from '../Skeleton';
import { GetConversionsVehicleList_conversions as IDerangedCard } from '../../../generated/GetConversionsVehicleList';

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

interface IDerangedVehicleCardProps {
  loadImage?: boolean;
  lazyLoad?: boolean;
  title: { title: string; description: string };
  data: IDerangedCard;
  handleClick: (
    imageSrc: string,
    title: string,
    description: string,
    conversionId?: number | null,
  ) => void;
}

const DerangedVehicleCard = React.memo(
  ({
    lazyLoad,
    loadImage,
    title,
    data,
    handleClick,
  }: IDerangedVehicleCardProps) => {
    const getImageSrc = () => {
      if (data.conversionImages && data.conversionImages.length !== 0) {
        return data.conversionImages[0] ?? data.imageUrl;
      }
      return data.imageUrl;
    };

    const imageProps = {
      imageSrc:
        getImageSrc() ?? `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
    };

    const price = data.lowestPrices?.find(
      item => item?.leaseType === 'BUSINESS',
    );

    return (
      <ProductCard
        loadImage={loadImage}
        lazyLoad={lazyLoad}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
          />
          <Button
            color="teal"
            fill="solid"
            label="Enquire Now"
            size="regular"
            onClick={() =>
              handleClick(
                imageProps.imageSrc,
                title.title,
                title.description,
                data.conversionId,
              )
            }
          />
        </div>
      </ProductCard>
    );
  },
);

export default React.memo(DerangedVehicleCard);
