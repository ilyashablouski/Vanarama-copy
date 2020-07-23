/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import BreadCrumbs from '../../../containers/BreadCrumbContainer';

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
        bodyType: 'Pickup',
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

  const { data: productSpecialistVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Specialist',
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
        bodyType: 'DropsideTipper',
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
      <div className="row:title">
        <BreadCrumbs />
        <Heading color="black" size="xlarge">
          Van Offers
        </Heading>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Best Small Van Lease Offers
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
              label="See All Small Vans"
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
              Best Medium Van Lease Offers
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
              label="See All Medium Vans"
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
              Best Large Van Lease Offers
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
              label="See All Large Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Large+Van')}
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
              Best Pickup Truck Lease Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: null,
              productCard: productPickups?.productCarousel || null,
            }}
            countItems={productPickups?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="See All Pickup Trucks"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Pickup')}
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
              Best Dropside Tipper Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: null,
              productCard: productTippers?.productCarousel || null,
            }}
            countItems={productTippers?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="See All Dropside Tippers"
              color="teal"
              onClick={() =>
                Router.push('/van-leasing?bodyStyles=Dropside+Tipper')
              }
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
              Specialist Van Lease Offers
            </span>
          </Heading>
          <ProductCarousel
            leaseType={LeaseTypeEnum.PERSONAL}
            data={{
              derivatives: null,
              productCard: productSpecialistVan?.productCarousel || null,
            }}
            countItems={productSpecialistVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="See All Sepcialist Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Specialist')}
            />
          </div>
        </div>
      </div>
      <div className="row:text">
        <Text tag="span" size="regular" color="darker">
          Ipsum pariatur cupidatat adipisicing sint nisi in proident non ipsum
          reprehenderit nostrud amet ea deserunt excepteur cillum nisi ipsum non
          occaecat cillum tempor excepteur fugiat commodo sit irure commodo
          adipisicing
        </Text>
      </div>
      <div className="row:icon-list">
        <Heading tag="span" size="lead" color="black">
          Best New Van Deals
        </Heading>
        <hr />
        <IconList>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
          <IconListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </IconListItem>
        </IconList>
      </div>
      <div className="row:text">
        <Heading size="large" color="black">
          Text Row Heading
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            At Vanarama, we have a range of funders offering new van finance
            including contract hire with various options to suit you and your
            business needs, including Contract Hire, Finance Lease and Contract
            Purchase. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Hic nisi ab odio perspiciatis, veritatis nulla eaque tempore.
          </Text>
          <Text tag="p" size="regular" color="darker">
            Repellendus, rem! Minima voluptatibus obcaecati incidunt expedita
            dignissimos? Vanarama can also arrange personal van finance if
            that&apos;s what you require. We understand the importance of your
            new van purchase and we want to make sure the process of arranging
            finance for your new vehicle is as simple and seamless as possible
            for you.
          </Text>
        </div>
      </div>
      <div className="row:text">
        <Text size="regular" color="dark">
          Photos and videos are for illustration purposes only.
        </Text>
      </div>
    </>
  );
};

export default withApollo(VansPage, { getDataFromTree });
