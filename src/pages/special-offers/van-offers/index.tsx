/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
// import Loading from '@vanarama/uibook/lib/components/atoms/loading';

import { useState } from 'react';

import {
  ProductCardData,
  ProductCardData_productCarousel as ProdCardData,
} from '../../../../generated/ProductCardData';

import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import withApollo from '../../../hocs/withApollo';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
} from '../../../../generated/globalTypes';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';

type ProdCards = ProdCardData[];

export const VansPage: NextPage = () => {
  const [offers, setOffers] = useState<ProdCards>([]);

  const { data: productSmallVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'SmallVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const { data: productSmallVanDerivatives } = useCarDerivativesData(
    productSmallVan?.productCarousel?.map(el => el?.capId || '') || [''],
    VehicleTypeEnum.LCV,
  );

  const { data: productMediumVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'MediumVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const { data: productMediumVanDerivatives } = useCarDerivativesData(
    productMediumVan?.productCarousel?.map(el => el?.capId || '') || [''],
    VehicleTypeEnum.LCV,
  );

  const { data: productLargeVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'LargeVan',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const { data: productLargeVanDerivatives } = useCarDerivativesData(
    productLargeVan?.productCarousel?.map(el => el?.capId || '') || [''],
    VehicleTypeEnum.LCV,
  );

  const { data: productPickups } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Pickups',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const { data: productSpecialistVans } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Pickups',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  const { data: productTippers } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'DropsideTippers',
        size: 9,
        offer: true,
      },
      onCompleted: prods => {
        const topProduct = prods?.productCarousel?.find(
          p => p?.isOnOffer === true,
        );
        if (topProduct) setOffers([...offers, topProduct]);
      },
    },
  );

  /* if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  } */

  return (
    <>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Small Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productSmallVanDerivatives?.derivatives || null,
              productCard: productSmallVan?.productCarousel || null,
            }}
            countItems={productSmallVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Small Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Small+Van')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Medium Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productMediumVanDerivatives?.derivatives || null,
              productCard: productMediumVan?.productCarousel || null,
            }}
            countItems={productMediumVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Medium Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Medium+Van')}
            />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Large Vans
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: productLargeVanDerivatives?.derivatives || null,
              productCard: productLargeVan?.productCarousel || null,
            }}
            countItems={productLargeVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="View Large Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Large+Van')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(VansPage, { getDataFromTree });
