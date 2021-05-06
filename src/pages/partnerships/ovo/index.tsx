import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React, { useState } from 'react';
import { PARTNER } from 'gql/partner';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import PageHeadingSection from 'components/PageHeadingSection';
import { evOffersRequest, IEvOffersData } from 'utils/offers';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import useLeaseType from 'hooks/useLeaseType';
import Hero, { HeroHeading } from '../../../components/Hero';
import PartnershipLogo from '../../../components/PartnershipLogo';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import { getFeaturedClassPartial } from 'utils/layout';
import Media from 'core/atoms/media';
import getTitleTag from 'utils/getTitleTag';
import IconList, { IconListItem } from 'core/organisms/icon-list';

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
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
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

  const [activeTab, setActiveTab] = useState(1);
  const { cachedLeaseType } = useLeaseType(null);

  const isPersonalLcv = cachedLeaseType.lcv === 'Personal';
  const isPersonalCar = cachedLeaseType.car === 'Personal';

  const Section = ({ featured }: any) => {
    const { title, titleTag, body, image, video, iconList } = featured;
    return (
      <section className={`row:${getFeaturedClassPartial(featured)}`}>
        {video ? (
          <Media src={video || ''} width="100%" height="360px" />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              image?.file?.url ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}

        <div>
          <Heading
            size="large"
            color="black"
            tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
          >
            {title}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={body || ''}
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
            {iconList?.length && (
              <IconList>
                {iconList.map((el: any, indx: number) => (
                  <IconListItem iconColor="orange" key={indx.toString()} listStyle="none">
                    {el?.text}
                  </IconListItem>
                ))}
              </IconList>
            )}
          </div>
        </div>
      </section>
    );
  };

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
            {vehicleTypes?.map((type: string, i: number) => (
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
                          fuelTypes: fuelTypes,
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
            ))}
          </TabPanels>
        </Tabs>
      </section>
      <Section featured={featured} />
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
