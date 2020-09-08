/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';
import { getDataFromTree } from '@apollo/react-ssr';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import AddCircle from '@vanarama/uibook/lib/assets/icons/AddCircleSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';

import { ProductCardData } from '../../../../generated/ProductCardData';
import { VanOffersPageData } from '../../../../generated/VanOffersPageData';
import { VAN_OFFERS_CONTENT } from '../../../gql/special-offers/van-offers';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import withApollo from '../../../hocs/withApollo';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
} from '../../../../generated/globalTypes';
import BreadCrumbs from '../../../containers/BreadCrumbContainer';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
import useLeaseType from '../../../hooks/useLeaseType';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Head from '../../../components/Head/Head';

export const VanOffers: NextPage = () => {
  const { data, loading, error } = useQuery<VanOffersPageData>(
    VAN_OFFERS_CONTENT,
  );

  const { cachedLeaseType } = useLeaseType(false);

  const { data: productSmallVan } = useQuery<ProductCardData>(
    PRODUCT_CARD_CONTENT,
    {
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'SmallVan',
        size: 9,
        offer: true,
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
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const isPersonal = cachedLeaseType === 'Personal';
  const metaData = data?.vanOffersPage.metaData;

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.vanOffersPage.featuredImage}
        />
      )}
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
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
            leaseType={
              isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
            }
            data={{
              derivatives: null,
              productCard: productSpecialistVan?.productCarousel || null,
            }}
            countItems={productSpecialistVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <Button
              label="See All Specialist Vans"
              color="teal"
              onClick={() => Router.push('/van-leasing?bodyStyles=Specialist')}
            />
          </div>
        </div>
      </div>
      <div className="row:text">
        <Text tag="span" size="regular" color="darker">
          <ReactMarkdown
            escapeHtml={false}
            source={data?.vanOffersPage.body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
        </Text>
      </div>
      <div className="row:icon-list">
        <Heading tag="span" size="lead" color="black">
          Best New Van Deals
        </Heading>
        <hr />
        {data?.vanOffersPage?.sections?.iconBullets?.iconBullets?.map(
          (item, idx: number) => (
            <>
              <Icon
                key={`${item?.text || idx}-icon`}
                icon={<AddCircle />}
                color="orange"
                size="large"
              />
              <Text
                key={`${item?.text || idx}-text`}
                size="regular"
                color="darker"
              >
                {item?.text}
              </Text>
            </>
          ),
        )}
      </div>
      <div className="row:text">
        <Heading size="large" color="black">
          Text Row Heading
        </Heading>
        <div>
          <ReactMarkdown
            escapeHtml={false}
            source={data?.vanOffersPage?.sections?.featured?.body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
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

export default withApollo(VanOffers, { getDataFromTree });
