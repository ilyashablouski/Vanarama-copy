import createApolloClient from 'apolloClient';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { notFoundPageHandler } from 'utils/url';
import PageNotFoundContainer from 'containers/PageNotFoundContainer/PageNotFoundContainer';
import { PreviewNextPageContext } from 'types/common';
import { setSessionStorage } from '../../../utils/windowSessionStorage';
import PageHeadingSection from '../../../components/PageHeadingSection';
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
  getPartnerProperties,
  removePartnerProperties,
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

const Image = dynamic(() => import('core/atoms/image'), {
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
  notFoundPageData: any;
  error: any;
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
  notFoundPageData,
}) => {
  const {
    colourPrimary,
    logo,
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
  } = data?.partner || {};
  const { flag, body, image } = data?.partner?.hero || {};
  const { titleTag } = data?.partner?.featured || {};
  const { title } = logo || {};
  const { url } = logo?.file || {};

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
    fuelTypes,
    searchPageDescription,
    searchPageTitle,
  };
  const sovereignty = customerSovereignty || 7;

  useEffect(() => {
    // check if partnership cookie has been set
    if (!getPartnerProperties()) {
      setPartnerProperties(partnershipData, sovereignty);
    }
    setSessionStorage('partnershipSessionActive', 'true');
    setPartnerFooter(footer);
    setSessionFuelTypes(fuelTypes || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getPartnerProperties()) {
      const partnerDetails = getPartnerProperties();
      const isRightPartnership = partnerDetails?.slug === slug?.toUpperCase();
      if (!isRightPartnership) {
        removePartnerProperties();
        setPartnerProperties(partnershipData, sovereignty);
      }
      // check if exclusive vehicle type
      const types = partnerDetails?.vehicleTypes;
      if (types?.length === 1) {
        if (types[0] === VehicleSearchTypeEnum.CARS) {
          setSearchType(VehicleTypeEnum.CAR);
        } else {
          setSearchType(VehicleTypeEnum.LCV);
        }
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
  if (notFoundPageData) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }

  return (
    <>
      <Hero
        topHeader={
          <PartnershipLogo logo={url || ''} imageAlt={title || undefined} />
        }
        customCTAColor={colourPrimary || ''}
        searchPodVansData={decodeData(searchPodVansData)}
        searchPodCarsData={decodeData(searchPodCarsData)}
        activeSearchIndex={2}
        searchType={searchType}
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
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            alt="Hero Image"
            dataTestId="insurance_hero-image"
            size="expand"
            src={image?.file?.url || ''}
            plain
            className="hero--image"
          />
        </div>
      </Hero>
      <PageHeadingSection titleTag={titleTag || ''} header={flag || ''} />

      <section className="tabs-wrap row:tabbed">
        <Tabs
          activeIndex={activeTab}
          onChange={setActiveTab}
          variant="alternative"
          align="center"
        >
          <TabList className="lead">
            {vehicleTypes?.map((type: string, i: number) => (
              <Tab key={type} index={i}>
                {type}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {vehicleTypes?.map((type: string, i: number) => {
              const vehicleType = productCarouselProperties.find(
                product => product.type === type,
              );
              return (
                <TabPanel index={i}>
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
      <WhyLeaseWithVanaramaTiles
        title="Why Lease With Vanarama"
        tiles={tiles || []}
      />
    </>
  );
};

export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const path = context.req?.url?.split('?')[0] || '';
  try {
    const { data } = await client.query<Partner, PartnerVariables>({
      query: PARTNER,
      variables: {
        slug: path.split('/').pop() || '',
        ...(context?.preview && { isPreview: context?.preview }),
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
    if (context.res) {
      return notFoundPageHandler(context.res, client);
    }

    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default PartnershipsHomePage;
