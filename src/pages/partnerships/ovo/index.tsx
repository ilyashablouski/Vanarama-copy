import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import PageHeadingSection from '../../../components/PageHeadingSection';
import Hero, { HeroHeading } from '../../../components/Hero';
import PartnershipLogo from '../../../components/Partnerships/PartnershipLogo';
import PartnershipFeatureSection from '../../../components/Partnerships/PartnershipsFeatureSection/FeatureSection';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import { mapFuelSearchQueryToParam } from '../../../containers/SearchPageContainer/helpers';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { PARTNER } from '../../../gql/partner';
import useLeaseType from '../../../hooks/useLeaseType';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import {
  setPartnerFooter,
  setPartnerProperties,
} from '../../../utils/partnerProperties';
import {
  IPartnerOffersData,
  partnerOffersRequest,
} from '../../../utils/offers';

interface IProps extends IPartnerOffersData {
  data: any;
}

const OvoHomePage: NextPage<IProps> = ({
  data,
  partnerProductsCar,
  partnerProductsVan,
  partnerProductsCarDerivatives,
  partnerProductsVanDerivatives,
  vehicleListUrlData,
}) => {
  const {
    colourPrimary,
    logo,
    fuelTypes,
    vehicleTypes,
    featured,
    tiles,
    footer,
    slug,
    uuid,
    customerSovereignty,
    telephone,
  } = data?.partner;
  const { flag, body, image, titleTag } = data?.partner?.hero;
  const { title } = logo;
  const { url } = logo?.file;
  console.log(JSON.stringify(footer));

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

  const [activeTab, setActiveTab] = useState(0);
  const { cachedLeaseType } = useLeaseType(null);
  const isPersonalLcv = cachedLeaseType.lcv === 'Personal';

  useEffect(() => {
    // check if partnership cookie has been set
    if (!Cookies.get('activePartnership')) {
      const partnershipData = {
        slug,
        color: colourPrimary,
        uuid,
        vehicleTypes,
        telephone,
      };
      const sovereignty = customerSovereignty || 7;
      setPartnerProperties(partnershipData, sovereignty);
    }
    setPartnerFooter(footer);
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
  ];

  return (
    <>
      <Hero
        topHeader={<PartnershipLogo logo={url} imageAlt={title} />}
        customCTAColor={colourPrimary}
        hideBenefitsBar
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
            src={image.file.url}
            plain
            className="hero--image"
          />
        </div>
      </Hero>
      <PageHeadingSection titleTag={titleTag} header={flag} />

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
                        customCTABackground={colourPrimary}
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
                            backgroundColor: colourPrimary,
                            borderColor: colourPrimary,
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
      <PartnershipFeatureSection featured={featured} />
      <WhyLeaseWithVanaramaTiles
        title="Why Lease With Vanarama"
        tiles={tiles}
      />
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data } = await client.query({
      query: PARTNER,
      variables: {
        slug: 'ovo',
      },
    });

    const fuelTypes = mapFuelSearchQueryToParam(data.partner.fuelTypes);

    const {
      partnerProductsCar,
      partnerProductsVan,
      partnerProductsCarDerivatives,
      partnerProductsVanDerivatives,
      vehicleListUrlData,
    } = await partnerOffersRequest(client, fuelTypes);

    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
        partnerProductsCar,
        partnerProductsVan,
        partnerProductsCarDerivatives,
        partnerProductsVanDerivatives,
        vehicleListUrlData,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default OvoHomePage;
