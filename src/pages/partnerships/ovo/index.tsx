import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React, { useState } from 'react';
import { PARTNER } from 'gql/partner';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import PageHeadingSection from 'components/PageHeadingSection';
import PartnershipLogo from '../../../components/PartnershipLogo';
import Hero, { HeroHeading } from '../../../components/Hero';
import { evOffersRequest, IEvOffersData } from 'utils/offers';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import useLeaseType from 'hooks/useLeaseType';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';

interface IProps extends IEvOffersData {
  data: any;
}

const OvoHomePage: NextPage<IProps> = ({
  data,
  productsEvCar,
  productsEvVan,
  productsEvVanDerivatives,
  productsEvCarDerivatives,
  vehicleListUrlData,
}) => {
  const { colourPrimary, logo } = data?.partner;
  const { flag, body, image, titleTag } = data?.partner?.hero;
  const { title } = logo;
  const { url } = logo?.file;

  console.log(productsEvCar)

  const Image = dynamic(() => import('core/atoms/image'), {
    loading: () => <Skeleton count={3} />,
  });
  const Text = dynamic(() => import('core/atoms/text'), {
    loading: () => <Skeleton count={1} />,
  });
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
  });
  const Tile = dynamic(() => import('core/molecules/tile'), {
    loading: () => <Skeleton count={3} />,
  });
  const League = dynamic(() => import('core/organisms/league'), {
    loading: () => <Skeleton count={2} />,
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

  const [activeTab, setActiveTab] = useState(1);
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const isPersonalLcv = cachedLeaseType.lcv === 'Personal';
  const isPersonalCar = cachedLeaseType.car === 'Personal';

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
            <Tab index={0}>Vans</Tab>
            <Tab index={1}>Cars</Tab>
          </TabList>
          <TabPanels>
            <TabPanel index={0}>
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
                      derivatives:
                        productsEvVanDerivatives?.derivatives || null,
                      productCard:
                        productsEvVan?.productCarousel?.slice(0, 6) || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsEvVan?.productCarousel?.length || 6}
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
                        fuelTypes: ['Electric', 'Petrol/plugin Elec Hybrid'],
                      },
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-vans"
                  >
                    <div className="button--inner" style={{backgroundColor: colourPrimary, borderColor: colourPrimary}}>
                      View More
                    </div>
                  </RouterLink>
                </div>

              </div>
            </TabPanel>
            <TabPanel index={1}>
              <div style={{ maxWidth: 1216 }} className="-mh-auto">

                <LazyLoadComponent
                  visibleByDefault={
                    typeof window === 'undefined' ||
                    navigator?.vendor === 'Apple Computer, Inc.'
                  }
                >
                  <ProductCarousel
                    leaseType={
                      isPersonalCar
                        ? LeaseTypeEnum.PERSONAL
                        : LeaseTypeEnum.BUSINESS
                    }
                    data={{
                      derivatives:
                        productsEvCarDerivatives?.derivatives || null,
                      productCard:
                        productsEvCar?.productCarousel?.slice(0, 6) || null,
                      vehicleList: vehicleListUrlData,
                    }}
                    countItems={productsEvCar?.productCarousel?.length || 6}
                    customCTABackground={colourPrimary}
                    dataTestIdBtn="car-view-offer"
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
                      href: '/car-leasing/search',
                      query: {
                        fuelTypes: [
                          'Diesel/plugin Elec Hybrid',
                          'Electric',
                          'Petrol/plugin Elec Hybrid',
                        ],
                      },
                    }}
                    withoutDefaultClassName
                    dataTestId="view-all-cars"
                  >
                    <div className="button--inner" style={{backgroundColor: colourPrimary, borderColor: colourPrimary}}>
                      View More
                    </div>
                  </RouterLink>
                </div>

              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </section>
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
    
    const {
      productsEvVan,
      productsEvCar,
      productsEvVanDerivatives,
      productsEvCarDerivatives,
      vehicleListUrlData,
    } = await evOffersRequest(client);
    
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
        productsEvCar,
        productsEvVan,
        productsEvVanDerivatives,
        productsEvCarDerivatives,
        vehicleListUrlData,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default OvoHomePage;