import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { PARTNER } from 'gql/partner';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import PageHeadingSection from 'components/PageHeadingSection';
import PartnershipLogo from '../../../components/PartnershipLogo';
import Hero, { HeroHeading } from '../../../components/Hero';

interface IProps {
  data: any;
}

const OvoHomePage: NextPage<IProps> = ({ data }) => {
  const { colourPrimary, logo } = data?.partner;
  const { flag, body, image } = data?.partner?.hero;
  const { title } = logo;
  const { url } = logo?.file;

  const Image = dynamic(() => import('core/atoms/image'), {
    loading: () => <Skeleton count={3} />,
  });
  const Text = dynamic(() => import('core/atoms/text'), {
    loading: () => <Skeleton count={1} />,
  });

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
      <PageHeadingSection
        titleTag="h4"
        header="This is a header"
        description="and this is a description"
      />
    </>
  );
};

export default OvoHomePage;

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: PARTNER,
      variables: {
        slug: 'ovo',
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }

    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
