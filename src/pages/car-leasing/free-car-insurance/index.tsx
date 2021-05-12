import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { GENERIC_PAGE } from 'gql/genericPage';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

interface IProps {
  data: GenericPageQuery;
}

const FreeCarInsurance: NextPage<IProps> = ({data}) => {
  return (
    <div>Hello World</div>
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