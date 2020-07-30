/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import Router from 'next/router';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { isCompared } from '../../utils/сomparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../RouterLink/RouterLink';
import { getProductPageUrl } from '../../utils/url';
import {
  GetProductCard,
  GetProductCard_productCard,
} from '../../../generated/GetProductCard';
import getIconMap from '../../utils/getIconMap';
import truncateString from '../../utils/truncateString';
import useSliderProperties from '../../hooks/useSliderProperties';

interface IProductCarouselProps {
  leaseType: string;
  countItems?: number;
  data: GetProductCard;
  dataTestIdBtn: string;
}

const ProductCarousel: React.FC<IProductCarouselProps> = ({
  leaseType,
  countItems,
  data,
  dataTestIdBtn,
}) => {
  const { slidesToShow } = useSliderProperties();

  const { compareVehicles, compareChange } = useContext(CompareContext);

  const getBodyStyle = (product: GetProductCard_productCard | null) => {
    const vehicle = data.derivatives?.find(
      derivative => derivative.id === product?.capId,
    );
    return vehicle ? vehicle.bodyStyle?.name : '';
  };

  return (
    <Carousel className="-mh-auto" countItems={countItems || 6}>
      {data.productCard?.map(
        product =>
          product && (
            <ProductCard
              key={product.capId || ''}
              header={
                product.leadTime || product.isOnOffer
                  ? {
                      text: product.leadTime || '',
                      accentIcon:
                        slidesToShow > 2 && product.isOnOffer ? (
                          <Icon icon={<Flame />} color="white" />
                        ) : (
                          ''
                        ),
                      accentText:
                        slidesToShow > 2 && product.isOnOffer ? 'Hot Deal' : '',
                    }
                  : undefined
              }
              features={product?.keyInformation?.map(info => ({
                icon: getIconMap(product?.keyInformation || []).get(
                  info?.name?.replace(/\s+/g, ''),
                ),
                label: info?.value || '',
              }))}
              onCompare={() => {
                compareChange({
                  bodyStyle: getBodyStyle(product),
                  ...product,
                });
              }}
              compared={isCompared(compareVehicles, product)}
              imageSrc={product.imageUrl || '/vehiclePlaceholder.jpg'}
              onWishlist={() => true}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{
                      href: getProductPageUrl(product, data?.derivatives).href,
                      label: truncateString(
                        `${product.manufacturerName} ${product.rangeName}`,
                      ),
                    }}
                    as={getProductPageUrl(product, data?.derivatives).url}
                    onClick={() =>
                      sessionStorage.setItem('capId', product.capId || '')
                    }
                    className="heading"
                    classNames={{ size: 'large', color: 'black' }}
                  />
                ),
                description: product.derivativeName || '',
                score: product.averageRating || 5,
              }}
            >
              <div className="-flex-h">
                <Price
                  price={
                    leaseType === LeaseTypeEnum.BUSINESS
                      ? product.businessRate
                      : product.personalRate
                  }
                  size="large"
                  separator="."
                  priceDescription={`Per Month ${
                    leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
                  }.VAT`}
                />
                <Button
                  color="teal"
                  fill="solid"
                  label="View Offer"
                  dataTestId={dataTestIdBtn}
                  onClick={() => {
                    sessionStorage.setItem('capId', product.capId || '');
                    Router.push(
                      getProductPageUrl(product, data?.derivatives).href,
                      getProductPageUrl(product, data?.derivatives).url,
                    );
                  }}
                  size="regular"
                />
              </div>
            </ProductCard>
          ),
      )}
    </Carousel>
  );
};

export default ProductCarousel;
