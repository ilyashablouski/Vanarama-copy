import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { GENERIC_PAGE } from 'gql/genericPage';
import Image from 'core/atoms/image';
import FeaturedSection from 'components/FeaturedSection';
import { HeroEv as Hero } from '../../../components/Hero';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

interface IProps {
  data: GenericPageQuery;
}

const FreeCarInsurance: NextPage<IProps> = ({ data }) => {
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sectionsAsArray;
  const featureSections = sections?.featured || [];
  console.log(sections?.featured);
  return (
    <>
      <Hero>
        <div className="hero--left">
          <div className="nlol" style={{ left: 'auto' }}>
            <p>Find Your New Lease Of Life</p>
            <h2>1 Year FREE Insurance</h2>
            <p>On Every Car Hot Offer</p>
          </div>
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
              sections?.hero[0]?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
      </Hero>
      {featureSections.map(featured => (
        <FeaturedSection featured={featured} key={featured?.title} />
      ))}
    </>
  );
};

export default FreeCarInsurance;

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'car-leasing/free-car-insurance',
        sectionsAsArray: true,
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
