/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';
import { getDataFromTree } from '@apollo/react-ssr';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import AddCircle from '@vanarama/uibook/lib/assets/icons/AddCircleSharp';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import createApolloClient from '../../apolloClient';

import { ProductCardData } from '../../../generated/ProductCardData';
import { VanOffersPageData } from '../../../generated/VanOffersPageData';
import { VAN_OFFERS_CONTENT } from '../../gql/special-offers/van-offers';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import withApollo from '../../hocs/withApollo';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import useLeaseType from '../../hooks/useLeaseType';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  useVehicleListUrl,
  useVehicleListUrlFetchMore,
} from '../../gql/vehicleList';

type Props = {
  pageData: any;
}

export const VanOffers: NextPage<Props> = ({ pageData }) => {
  const { data } = pageData;

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

  const productSmallVanCapIds = productSmallVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productSmallVanDerivatives } = useCarDerivativesData(
    productSmallVanCapIds,
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

  const productMediumVanCapIds = productMediumVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productMediumVanDerivatives } = useCarDerivativesData(
    productMediumVanCapIds,
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

  const productLargeVanCapIds = productLargeVan?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productLargeVanDerivatives } = useCarDerivativesData(
    productLargeVanCapIds,
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
  const productPickupsCapIds = productPickups?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productPickupsDerivatives } = useCarDerivativesData(
    productPickupsCapIds,
    VehicleTypeEnum.LCV,
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
  const productSpecialistVanCapIds = productPickups?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productSpecialistVanDerivatives } = useCarDerivativesData(
    productSpecialistVanCapIds,
    VehicleTypeEnum.LCV,
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
  const productTippersCapIds = productPickups?.productCarousel?.map(
    el => el?.capId || '',
  ) || [''];
  const { data: productTippersDerivatives } = useCarDerivativesData(
    productTippersCapIds,
    VehicleTypeEnum.LCV,
  );

  const derivativeIds = [
    ...productSmallVanCapIds,
    ...productMediumVanCapIds,
    ...productLargeVanCapIds,
    ...productPickupsCapIds,
    ...productSpecialistVanCapIds,
    ...productTippersCapIds,
  ];
  const vehicleListUrlQuery = useVehicleListUrl(derivativeIds);

  useVehicleListUrlFetchMore(vehicleListUrlQuery, derivativeIds);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const isPersonal = cachedLeaseType === 'Personal';
  const metaDataName = getSectionsData(
    ['metaData', 'name'],
    data?.vanOffersPage,
  );

  return (
    <>
      <div className="row:title">
        <Heading color="black" size="xlarge" tag="h1">
          {metaDataName}
        </Heading>
        <Text size="large" color="darker">
          {data?.vanOffersPage.intro}
        </Text>
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
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productSmallVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Small Vans',
                href: '/small-van-leasing.html',
              }}
              withoutDefaultClassName
              dataTestId="small-van-leasing"
            >
              <div className="button--inner">See All Small Vans</div>
            </RouterLink>
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
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productMediumVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Medium Vans',
                href: '/medium-van-leasing.html',
              }}
              withoutDefaultClassName
              dataTestId="medium-van-leasing"
            >
              <div className="button--inner">See All Medium Vans</div>
            </RouterLink>
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
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productLargeVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Large Vans',
                href: '/large-van-leasing.html',
              }}
              withoutDefaultClassName
              dataTestId="large-van-leasing"
            >
              <div className="button--inner">See All Large Vans</div>
            </RouterLink>
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
              derivatives: productPickupsDerivatives?.derivatives || null,
              productCard: productPickups?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productPickups?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Pickup Vans',
                href: '/pickup-special-offers.html',
              }}
              withoutDefaultClassName
              dataTestId="pickup-special-offer"
            >
              <div className="button--inner">See All Pickup Vans</div>
            </RouterLink>
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
              derivatives: productTippersDerivatives?.derivatives || null,
              productCard: productTippers?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productTippers?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Dropside Vans',
                href: '/dropside-tipper-leasing.html',
              }}
              withoutDefaultClassName
              dataTestId="dropside-tipper-leasing"
            >
              <div className="button--inner">See All Dropside Vans</div>
            </RouterLink>
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
              derivatives: productSpecialistVanDerivatives?.derivatives || null,
              productCard: productSpecialistVan?.productCarousel || null,
              vehicleList: vehicleListUrlQuery.data?.vehicleList!,
            }}
            countItems={productSpecialistVan?.productCarousel?.length || 6}
            dataTestIdBtn="van-view-offer"
          />
          <div className="-justify-content-row -pt-500">
            <RouterLink
              className="button"
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              link={{
                label: 'See All Specialist Vans',
                href: '/crew-vans.html',
              }}
              withoutDefaultClassName
              dataTestId="crew-vans"
            >
              <div className="button--inner">See All Specialist Vans</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div className="row:text -columns">
        <ReactMarkdown
          escapeHtml={false}
          source={data?.vanOffersPage.body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
      <div className="row:icon-list">
        <Heading tag="span" size="lead" color="black">
          {data?.vanOffersPage?.sections?.iconBullets?.title || ''}
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
      <div className="row:text -columns">
        <Heading size="large" color="black">
          {data?.vanOffersPage?.sections?.featured?.title || ''}
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
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
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

export async function getStaticProps() {
  const client = createApolloClient({});
  const { data } = await client.query<VanOffersPageData>({
    query: VAN_OFFERS_CONTENT,
  });
  return {
    data: {
      pageData: data,
    },
  };
}

export default withApollo(VanOffers, { getDataFromTree });
