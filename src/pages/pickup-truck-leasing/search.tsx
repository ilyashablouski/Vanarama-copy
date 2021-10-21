import { NextPage, NextPageContext } from 'next';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useEffect, useState } from 'react';
import getPartnerProperties from 'utils/partnerProperties';
import createApolloClient from '../../apolloClient';
import SearchPageContainer from '../../containers/SearchPageContainer';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import { decodeData, encodeData } from '../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData: encodedData,
  metaData,
}) => {
  const [pageMetaData, setPageMetaData] = useState(metaData);
  const [pageData, setPageData] = useState(decodeData(encodedData));
  const partnerProperties = getPartnerProperties();

  // TODO - implement ticket to pull custom header and into from CMS - please see https://autorama.atlassian.net/browse/DIG-6845
  useEffect(() => {
    if (partnerProperties) {
      const data = {
        ...metaData,
        name: 'Search Pickups',
      };
      const genericPageData = {
        genericPage: {
          ...pageData.genericPage,
          intro:
            'Save money on a brand new pickup by leasing from Vanarama today! View our unbeatable lease deals on pickups from all the top brands.',
        },
      };

      setPageMetaData(data);
      setPageData(genericPageData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchPageContainer
      isServer={isServer}
      isPickups
      isSimpleSearchPage
      metaData={pageMetaData}
      pageData={pageData}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});

  try {
    const contextData = {
      req: {
        url: context.req?.url || '',
      },
      query: { ...context.query },
    };
    const { data } = (await ssrCMSQueryExecutor(
      client,
      contextData,
      false,
      '',
    )) as ApolloQueryResult<GenericPageQuery>;
    return {
      props: {
        pageData: encodeData(data),
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default Page;
