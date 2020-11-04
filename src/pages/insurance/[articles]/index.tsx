import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import DefaultErrorPage from 'next/error';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import { getSectionsData } from '../../../utils/getSectionsData';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';

const BlogPost: NextPage<IInsurancePage> = ({ data, error }) => {
  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const cards = getSectionsData(
    ['cards', 'cards'],
    data?.genericPage?.sections,
  );

  return (
    <BlogPostContainer body={body} name={name} image={image} cards={cards} />
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: 'dine-club' } },
      { params: { page: 'refer-a-friend' } },
      { params: { page: 'vanarama-switch-guarantee' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `insurance/${context?.params?.explained}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(BlogPost);
