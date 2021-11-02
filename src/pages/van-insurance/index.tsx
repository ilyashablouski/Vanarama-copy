import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import InsurancePageContainer from '../../containers/InsurancePageContainer/InsurancePageContainer';
import createApolloClient from '../../apolloClient';
import GET_INSURANCE_LANDING_PAGE from '../../containers/InsurancePageContainer/gql';
import {
  GetInsuranceLandingPage,
  GetInsuranceLandingPageVariables,
} from '../../../generated/GetInsuranceLandingPage';
import { decodeData, encodeData } from '../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { IPageWithError, PageTypeEnum } from '../../types/common';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

type IProps =
  | {
      pageType: PageTypeEnum.DEFAULT;
      data: GetInsuranceLandingPage;
    }
  | IPageWithError;

const InsurancePage: NextPage<IProps> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data: encodedData } = props;
  const data = decodeData(encodedData);

  return <InsurancePageContainer data={data} />;
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps>> {
  try {
    const client = createApolloClient({});
    const { data } = await client.query<
      GetInsuranceLandingPage,
      GetInsuranceLandingPageVariables
    >({
      query: GET_INSURANCE_LANDING_PAGE,
      variables: {
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

export default InsurancePage;
