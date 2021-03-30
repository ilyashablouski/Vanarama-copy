import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE } from '../../gql/genericPage';
import {
  GenericPageQuery
} from '../../../generated/GenericPageQuery';
import Hero, {
  // HeroTitle,
  // HeroHeading,
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
  return (
    <>
      <Hero>
        <div className="nlol">
          <p>Find Your</p>
          <h2>New Lease Of Life</h2>
          <p>With Vanarama</p>
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