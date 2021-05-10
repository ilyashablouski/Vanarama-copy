import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React, { useState } from 'react';
import { PARTNER } from 'gql/partner';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import PageHeadingSection from 'components/PageHeadingSection';
import { IPartnerOffersData, partnerOffersRequest } from 'utils/offers';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import useLeaseType from 'hooks/useLeaseType';
import { mapFuelSearchQueryToParam } from 'containers/SearchPageContainer/helpers';
import Hero, { HeroHeading } from '../../../components/Hero';
import PartnershipLogo from '../../../components/PartnershipLogo';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import PartnershipFeatureSection from '../../../components/PartnershipsFeatureSection/FeatureSection';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';

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
  } = data?.partner;
  const { flag, body, image, titleTag } = data?.partner?.hero;
  const { title } = logo;
  const { url } = logo?.file;

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
              const products =
                type === 'Cars' ? partnerProductsCar : partnerProductsVan;
              const productDerivatives =
                type === 'Cars'
                  ? partnerProductsCarDerivatives
                  : partnerProductsVanDerivatives;
              return (
                <TabPanel index={i}>
                  <div style={{ maxWidth: 1216 }} className="-mh-auto">
                    <LazyLoadComponent
                      visibleByDefault={
                        typeof window === 'undefined' ||
                        navigator?.vendor === 'Apple Computer, Inc.'
                      }
                    >
                      <ProductCarousel
                        leaseType={
                          isPersonalLcv
                            ? LeaseTypeEnum.PERSONAL
                            : LeaseTypeEnum.BUSINESS
                        }
                        data={{
                          derivatives: productDerivatives?.derivatives || null,
                          productCard:
                            products?.productCarousel?.slice(0, 6) || null,
                          vehicleList: vehicleListUrlData,
                        }}
                        countItems={products?.productCarousel?.length || 6}
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
                          href: '/van-leasing/search',
                          query: {
                            fuelTypes,
                          },
                        }}
                        withoutDefaultClassName
                        dataTestId="view-all-vans"
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
