import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
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

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});

interface IProps {
  data: GenericPageQuery;
}

const ECarsPage: NextPage<IProps> = ({ data }) => {
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  console.log(data)
  return (
    <>
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