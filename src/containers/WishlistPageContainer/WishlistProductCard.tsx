import React, { useContext } from 'react';

import Icon from 'core/atoms/icon';
import Price from 'core/atoms/price';
import Heading from 'core/atoms/heading';
import ProductCard from 'core/molecules/cards/ProductCard';

import Flame from 'core/assets/icons/Flame';

import useWishlist from '../../hooks/useWishlist';

import { formatProductPageUrl } from '../../utils/url';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { isWished } from '../../utils/wishlistHelpers';

import RouterLink from '../../components/RouterLink';
import { features } from '../../components/ProductCarousel/helpers';

import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { IWishlistProductCard } from './interface';

function WishlistProductCard({
  loadImage,
  url,
  derivativeId,
  title,
  isPersonalPrice,
  data,
  bodyStyle,
  isModelPage,
  customCTAColor,
}: IWishlistProductCard) {
  const { wishlistVehicles, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);

  const productPageUrl = formatProductPageUrl(url, derivativeId);

  const imageProps = !isModelPage
    ? {
        imageSrc:
          data?.imageUrl || `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`,
      }
    : {};
  const extraStyles = {
    background: customCTAColor,
    borderColor: customCTAColor,
  };

  return (
    <ProductCard
      loadImage={loadImage}
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      {...imageProps}
      header={{
        accentIcon: data?.isOnOffer ? (
          <Icon icon={<Flame />} color="white" className="sm hydrated" />
        ) : null,
        accentText: data?.isOnOffer ? 'Hot Offer' : '',
        text: data?.leadTime || '',
      }}
      onCompare={() => {
        compareChange({
          ...data,
          bodyStyle,
          pageUrl: productPageUrl,
        });
      }}
      compared={isCompared(compareVehicles, data)}
      onWishlist={() => wishlistChange(data)}
      wished={isWished(wishlistVehicles, data)}
      features={features(data?.keyInformation || [], data?.capId || '', Icon)}
      title={{
        title: '',
        score: data?.averageRating || undefined,
        link: (
          <RouterLink
            link={{
              href: productPageUrl.url,
              label: '',
            }}
            onClick={() => {
              sessionStorage.setItem('capId', data.capId || '');
            }}
            className="heading"
            classNames={{ size: 'large', color: 'black' }}
            dataTestId="heading-link"
          >
            <Heading tag="span" size="large" className="-pb-100">
              {title?.title || ''}
            </Heading>
            <Heading tag="span" size="small" color="dark">
              {title?.description || ''}
            </Heading>
          </RouterLink>
        ),
      }}
    >
      {data?.isOnOffer && data?.vehicleType === VehicleTypeEnum.CAR && (
        <img
          loading="eager"
          sizes="(min-width:320px) 800px, 1200px"
          alt="Free insurance"
          className="gallery-free-insurance"
          src={`${process.env.HOST_DOMAIN}/Assets/images/insurance/1-Year-Free-Insurance.png`}
        />
      )}
      <div className="-flex-h">
        <Price
          price={isPersonalPrice ? data?.personalRate : data?.businessRate}
          size="large"
          separator="."
          priceDescription={`Per Month ${isPersonalPrice ? 'Inc' : 'Exc'}.VAT`}
        />
        <RouterLink
          link={{
            href: productPageUrl.url,
            label: 'View Offer',
          }}
          onClick={() => {
            sessionStorage.setItem('capId', data.capId || '');
          }}
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
          dataTestId="view-offer"
        >
          <div className="button--inner" style={extraStyles}>
            View Offer
          </div>
        </RouterLink>
      </div>
    </ProductCard>
  );
}

export default WishlistProductCard;
