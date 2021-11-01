import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import SimplePageContainer from '../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../apolloClient';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { IErrorProps, PageTypeEnum } from '../../types/common';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

type IProps =
  | (IGenericPage & {
      pageType: PageTypeEnum.DEFAULT;
    })
  | {
      pageType: PageTypeEnum.ERROR;
      error: IErrorProps;
    };

const ReferAFriendReferredPage: NextPage<IProps> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR || !props.data) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data } = props;

  return <SimplePageContainer data={data} />;
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps>> {
  try {
    const client = createApolloClient({}, context);

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/used-van-vs-new-van',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
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

export default ReferAFriendReferredPage;
