import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { ApolloError } from '@apollo/client';
import InsurancePageContainer from '../../containers/InsurancePageContainer/InsurancePageContainer';
import createApolloClient from '../../apolloClient';
import GET_INSURANCE_LANDING_PAGE from '../../containers/InsurancePageContainer/gql';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';

interface IInsurancePage {
  data: GetInsuranceLandingPage | undefined;
  error: ApolloError;
}

const InsurancePage: NextPage<IInsurancePage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <InsurancePageContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GET_INSURANCE_LANDING_PAGE,
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

export default InsurancePage;
