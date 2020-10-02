/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { isCompared } from '../../utils/comparatorHelpers';
import { CompareContext } from '../../utils/comparatorTool';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../RouterLink/RouterLink';
import { formatProductPageUrl, getLegacyUrl, getNewUrl } from '../../utils/url';
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
  productType?: string;
}

const ProductCarousel: React.FC<IProductCarouselProps> = ({
  leaseType,
  countItems,
  data,
  dataTestIdBtn,
  productType,
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
        (product, inx) =>
          product && (
            <ProductCard
              key={`${product.capId}_${inx}` || ''}
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
                index: `${product.capId}_${info?.name || ''}`,
              }))}
              onCompare={() => {
                compareChange({
                  pageUrl: formatProductPageUrl(
                    getLegacyUrl(data?.vehicleList?.edges, product.capId),
                    product.capId,
                  ),
                  bodyStyle: productType || getBodyStyle(product),
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
                      href: getNewUrl(data.vehicleList?.edges, product?.capId),
                      label: truncateString(
                        `${product.manufacturerName} ${product.rangeName}`,
                      ),
                    }}
                    as={getLegacyUrl(data.vehicleList?.edges, product?.capId)}
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
                <RouterLink
                  link={{
                    href: getNewUrl(data.vehicleList?.edges, product?.capId),
                    label: 'View Offer',
                  }}
                  as={getLegacyUrl(data.vehicleList?.edges, product?.capId)}
                  onClick={() =>
                    sessionStorage.setItem('capId', product.capId || '')
                  }
                  classNames={{ color: 'teal', solid: true, size: 'regular' }}
                  className="button"
                  dataTestId={dataTestIdBtn}
                >
                  <div className="button--inner">View Offer</div>
                </RouterLink>
              </div>
            </ProductCard>
          ),
      )}
    </Carousel>
  );
};

export default ProductCarousel;
