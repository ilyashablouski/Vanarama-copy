import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import getTitleTag from 'utils/getTitleTag';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE } from '../../gql/genericPage';
import {
  GenericPageQuery
} from '../../../generated/GenericPageQuery';
import {
  HeroEv as Hero,
  HeroPrompt,
} from '../../components/Hero';
import Skeleton from '../../components/Skeleton';
import { getFeaturedClassPartial } from 'utils/layout';
import { getFeaturedSectionsAsArray } from 'utils/sections';
import { useEffect, useState } from 'react';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  data: GenericPageQuery;
}

const ECarsPage: NextPage<IProps> = ({ data }) => {
  const [featuresArray, setFeaturesArray] = useState([])
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  useEffect(() => {
    const features: any = getFeaturedSectionsAsArray(sections)
    setFeaturesArray(features)
  }, [sections])

  console.log(featuresArray)
  const HeroSection = () => (
    <Hero >
      <div className="hero--left">
        <div className="nlol" style={{ left: 'auto' }}>
          <p>{sections?.hero?.title}</p>
          <h2>{sections?.hero?.body}</h2>
        </div>
        {sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={sections?.hero?.heroLabel?.[0]?.link?.text || ''}
            url={sections?.hero?.heroLabel?.[0]?.link?.url || ''}
            text={sections?.hero?.heroLabel?.[0]?.text || ''}
            btnVisible={sections?.hero?.heroLabel?.[0]?.link?.visible}
          />
        )}
      </div>
      <div className="hero--right">
        <Image
          loadImage
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          className="hero--image"
          plain
          size="expand"
          src={
            sections?.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
      </div>
    </Hero>
  )

  const HeadingSection = () => (
    <div className="row:lead-text">
      <Heading
        size="xlarge"
        color="black"
        tag={
          getTitleTag(
            sections?.leadText?.titleTag || null,
          ) as keyof JSX.IntrinsicElements
        }
      >
        {sections?.leadText?.heading}
      </Heading>
      <Text tag="span" size="lead" color="darker">
        {sections?.leadText?.description}
      </Text>
    </div>
  )

  const Section = () => (
    <section
      className={`row:${getFeaturedClassPartial(sections?.featured1)}`}
    >
      {sections?.featured1?.video ? (
        <Media
          src={sections?.featured1.video || ''}
          width="100%"
          height="360px"
        />
      ) : (
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={
            sections?.featured1?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      )}

      <div>
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              sections?.featured1?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {sections?.featured1?.title}
        </Heading>
        <div className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={sections?.featured1?.body || ''}
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
    </section>
  )

  return (
    <>
      <HeroSection />
      <HeadingSection />
      <Section />
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars',
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

export default ECarsPage