import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { ApolloError } from '@apollo/client';
import { getSectionsData } from '../../../utils/getSectionsData';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import createApolloClient from '../../../apolloClient';
import { notFoundPageHandler } from '../../../utils/url';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import { INotFoundPageData } from '../../../models/ISearchPageProps';

interface IInsuranceArticle {
  data: GenericPageQuery | undefined;
  error: ApolloError | undefined;
  notFoundPageData: INotFoundPageData | undefined;
}

const BlogPost: NextPage<IInsuranceArticle> = ({
  data,
  error,
  notFoundPageData,
}) => {
  if (error) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
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

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { req, res } = context;
  try {
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: req?.url?.slice(1) || '/',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    if (res) return notFoundPageHandler(res, client);
    return {
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(BlogPost);
