import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { GENERIC_PAGE, IGenericPageProps } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';
import { decodeData, encodeData } from '../../utils/data';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import { PageTypeEnum } from '../../types/common';
import ErrorPage from '../_error';

const LeasingQuestionsContainer = dynamic(
  () =>
    import(
      '../../containers/LeasingQuestionsContainer/LeasingQuestionsContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FinanceInfo: NextPage<IGenericPageProps> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR || !props.data) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data: encodedData } = props;
  const data = decodeData(encodedData);

  return <LeasingQuestionsContainer data={data} />;
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'leasing-questions',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default FinanceInfo;
