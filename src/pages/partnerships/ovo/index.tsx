import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { PARTNER } from 'gql/partner';
import Hero, { HeroHeading } from '../../../components/Hero';
import PartnershipLogo from '../../../components/PartnershipLogo';
interface IProps {
  data: any;
}

const OvoHomePage: NextPage<IProps> = ({data}) => {
  const {title} = data?.partner?.logo
  const {url} = data?.partner?.logo?.file
  return (
    <>
      <Hero topHeader={<PartnershipLogo logo={url} imageAlt={title} />}>
       
      </Hero>
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