import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
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
import { convertErrorToProps } from '../../utils/helpers';
import { IErrorProps } from '../../types/common';
import ErrorPage from '../_error';

interface IInsurancePage {
  data: GetInsuranceLandingPage | undefined;
  error?: IErrorProps;
}

const InsurancePage: NextPage<IInsurancePage> = ({
  data: encodedData,
  error,
}) => {
  if (error || !encodedData) {
    return <ErrorPage errorData={error} />;
  }

  // De-obfuscate data for user
  const data = decodeData(encodedData);

  return <InsurancePageContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
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
        error: convertErrorToProps(error),
      },
    };
  }
}

export default InsurancePage;
