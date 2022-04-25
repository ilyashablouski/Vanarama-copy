import createApolloClient from 'apolloClient';
import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { setSessionStorage } from '../../../utils/windowSessionStorage';
import HeadingSection from '../../../components/HeadingSection';
import Hero, { HeroHeading } from '../../../components/Hero';
import PartnershipLogo from '../../../components/Partnerships/PartnershipLogo';
import PartnershipFeatureSection from '../../../components/Partnerships/PartnershipsFeatureSection/FeatureSection';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import { mapFuelSearchQueryToParam } from '../../../containers/SearchPageContainer/helpers';
import { PARTNER } from '../../../gql/partner';
import useLeaseType from '../../../hooks/useLeaseType';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import { decodeData, encodeData } from '../../../utils/data';
import {
  setPartnerFooter,
  setPartnerProperties,
  setSessionFuelTypes,
} from '../../../utils/partnerProperties';
import {
  IPartnerOffersData,
  partnerOffersRequest,
} from '../../../utils/offers';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../../generated/filterList';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { VehicleSearchTypeEnum } from '../../../../entities/global';
import { Partner, PartnerVariables } from '../../../../generated/Partner';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);
const Tabs = dynamic(() => import('core/molecules/tabs'), {
  loading: () => <Skeleton count={1} />,
});
const Tab = dynamic(() => import('core/molecules/tabs/Tab'), {
  loading: () => <Skeleton count={1} />,
});
const TabList = dynamic(() => import('core/molecules/tabs/TabList'));
const TabPanel = dynamic(() => import('core/molecules/tabs/TabPanel'), {
  loading: () => <Skeleton count={1} />,
});
const TabPanels = dynamic(() => import('core/molecules/tabs/TabPanels'), {
  loading: () => <Skeleton count={3} />,
});
const ProductCarousel = dynamic(
  () => import('../../../components/ProductCarousel/ProductCarousel'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

interface IProps extends IPartnerOffersData {
  data: Partner;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
}

const PartnershipsHomePage: NextPage<IProps> = ({
  data,
  partnerProductsCar,
  partnerProductsVan,
  partnerProductsPickup,
  partnerProductsCarDerivatives,
  partnerProductsVanDerivatives,
  partnerProductsPickupDerivatives,
  vehicleListUrlData,
  searchPodVansData,
  searchPodCarsData,
}) => {
  const {
    colourPrimary,
    logo,
    showPartnerLogo,
    fuelTypes,
    vehicleTypes,
    featured,
    featured1,
    tiles,
    footer,
    uuid,
    customerSovereignty,
    telephone,
    slug,
    searchPageDescription,
    searchPageTitle,
    searchPageText,
  } = data?.partner || {};
  const { flag, body, image } = data?.partner?.hero || {};
  const { titleTag } = data?.partner?.featured || {};
  const { title } = logo || {};

  const [activeTab, setActiveTab] = useState(0);
  const { cachedLeaseType } = useLeaseType(null);
  const isPersonalLcv = cachedLeaseType.lcv === LeaseTypeEnum.PERSONAL;

  const [searchType, setSearchType] = useState<VehicleTypeEnum | undefined>();

  const partnershipData = {
    slug: slug?.toUpperCase(),
    color: colourPrimary,
    uuid,
    vehicleTypes,
    telephone,
    logo,
    showPartnerLogo,
    fuelTypes,
    searchPageDescription,
    searchPageTitle,
    searchPageText,
  };
  const sovereignty = customerSovereignty || 7;

  useEffect(() => {
    setPartnerProperties(partnershipData, sovereignty);
    setSessionStorage('partnershipSessionActive', 'true');
    setPartnerFooter(footer);
    setSessionFuelTypes(fuelTypes || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // check if exclusive vehicle type
    const types = partnershipData.vehicleTypes;

    if (types?.length === 1) {
      if (types[0] === VehicleSearchTypeEnum.CARS) {
        setSearchType(VehicleTypeEnum.CAR);
      } else {
        setSearchType(VehicleTypeEnum.LCV);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productCarouselProperties = [
    {
      type: 'Cars',
      products: partnerProductsCar,
      derivatives: partnerProductsCarDerivatives,
      dataTestId: 'view-all-cars',
      href: '/car-leasing/search',
    },
    {
      type: 'Vans',
      products: partnerProductsVan,
      derivatives: partnerProductsVanDerivatives,
      dataTestId: 'view-all-vans',
      href: '/van-leasing/search',
    },
    {
      type: 'Pickups',
      products: partnerProductsPickup,
      derivatives: partnerProductsPickupDerivatives,
      dataTestId: 'view-all-pickups',
      href: '/pickup-truck-leasing/search',
    },
  ];

  return (
    <>
      <Hero
        topHeader={
          showPartnerLogo && (
            <PartnershipLogo logo={logo?.file} imageAlt={title ?? ''} />
          )
        }
        customCTAColor={colourPrimary || ''}
        searchPodVansData={decodeData(searchPodVansData)}
        searchPodCarsData={decodeData(searchPodCarsData)}
        activeSearchIndex={2}
        searchType={searchType}
        dataUiTestId="partnerships-home-page_"
      >
        <HeroHeading text={flag || ''} />
        <ReactMarkdown
          allowDangerousHtml
          source={body || ''}
          renderers={{
            paragraph: props => (
              <Text
                {...props}
                tag="p"
                size="large"
                color="white"
                className="hero--small-print"
              />
            ),
          }}
        />
        <div>
          <ImageV2
            quality={70}
            size="expand"
            optimisedHost
            lazyLoad={false}
            className="hero--image -pt-000"
            dataTestId="insurance_hero-image"
            width={image?.file?.details.image.width}
            height={image?.file?.details.image.height}
            src={image?.file?.url || ''}
            alt="Hero Image"
            plain
          />
        </div>
      </Hero>
      <HeadingSection titleTag={titleTag} header={flag} />

      <section className="tabs-wrap row:tabbed">
        <Tabs
          activeIndex={activeTab}
          onChange={setActiveTab}
          variant="alternative"
          align="center"
        >
          <TabList className="lead">
            {vehicleTypes?.map((type: string, index: number) => (
              <Tab
                key={type}
                index={index}
                dataUiTestId={`partnerships-home-page_carousel-tab_${type}`}
              >
                {type}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {vehicleTypes?.map((type: string, index: number) => {
              const vehicleType = productCarouselProperties.find(
                product => product.type === type,
              );
              return (
                <TabPanel index={index}>
                  <div style={{ maxWidth: 1216 }} className="-mh-auto">
                    <LazyLoadComponent
                      visibleByDefault={isServerRenderOrAppleDevice}
                    >
                      <ProductCarousel
                        leaseType={
                          isPersonalLcv
                            ? LeaseTypeEnum.PERSONAL
                            : LeaseTypeEnum.BUSINESS
                        }
                        dataUiTestId="partnerships-home-page_product-carousel"
                        data={{
                          derivatives:
                            vehicleType?.derivatives?.derivatives || null,
                          productCard:
                            vehicleType?.products?.productCarousel?.slice(
                              0,
                              6,
                            ) || null,
                          vehicleList: vehicleListUrlData,
                        }}
                        countItems={
                          vehicleType?.products?.productCarousel?.length || 6
                        }
                        customCTABackground={colourPrimary || undefined}
                        dataTestIdBtn="van-view-offer"
                      />
                    </LazyLoadComponent>

                    <div className="-justify-content-row -pt-500">
                      <RouterLink
                        dataUiTestId="partnerships-home-page_button_view-more"
                        className="button"
                        classNames={{
                          color: 'teal',
                          solid: true,
                          size: 'regular',
                        }}
                        link={{
                          label: 'View More',
                          href: vehicleType?.href || '',
                          query: {
                            fuelTypes,
                          },
                        }}
                        withoutDefaultClassName
                        dataTestId={vehicleType?.dataTestId}
                      >
                        <div
                          className="button--inner"
                          style={{
                            backgroundColor: colourPrimary || undefined,
                            borderColor: colourPrimary || undefined,
                          }}
                        >
                          View More
                        </div>
                      </RouterLink>
                    </div>
                  </div>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </section>
      {featured && <PartnershipFeatureSection featured={featured} />}
      {featured1 && <PartnershipFeatureSection featured={featured1} />}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          title="Why Lease With Vanarama"
          tiles={tiles || []}
        />
      )}
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  const path = context.resolvedUrl?.split('?')[0] || '';

  try {
    const { data } = await client.query<Partner, PartnerVariables>({
      query: PARTNER,
      variables: {
        slug: path.split('/').pop() || '',
        isPreview: !!context?.preview,
      },
    });

    const fuelTypes = mapFuelSearchQueryToParam(data?.partner?.fuelTypes);

    const {
      partnerProductsCar,
      partnerProductsVan,
      partnerProductsPickup,
      partnerProductsCarDerivatives,
      partnerProductsPickupDerivatives,
      partnerProductsVanDerivatives,
      vehicleListUrlData,
    } = await partnerOffersRequest(client, fuelTypes);

    const [
      { data: searchPodVansData },
      { data: searchPodCarsData },
    ] = await Promise.all([
      client.query<IFilterList, IFilterListVariables>({
        query: GET_SEARCH_POD_DATA,
        variables: {
          vehicleTypes: [VehicleTypeEnum.LCV],
          fuelTypes,
        },
      }),
      client.query<IFilterList, IFilterListVariables>({
        query: GET_SEARCH_POD_DATA,
        variables: {
          vehicleTypes: [VehicleTypeEnum.CAR],
          fuelTypes,
        },
      }),
    ]);

    return {
      props: {
        data: data || null,
        partnerProductsCar: partnerProductsCar || null,
        partnerProductsVan: partnerProductsVan || null,
        partnerProductsPickup: partnerProductsPickup || null,
        partnerProductsCarDerivatives: partnerProductsCarDerivatives || null,
        partnerProductsVanDerivatives: partnerProductsVanDerivatives || null,
        partnerProductsPickupDerivatives:
          partnerProductsPickupDerivatives || null,
        vehicleListUrlData: vehicleListUrlData || null,
        searchPodVansData: encodeData(searchPodVansData),
        searchPodCarsData: encodeData(searchPodCarsData),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default PartnershipsHomePage;
