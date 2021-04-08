import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import InsurancePageContainer from '../../containers/InsurancePageContainer/InsurancePageContainer';
import createApolloClient from '../../apolloClient';
import GET_INSURANCE_LANDING_PAGE from '../../containers/InsurancePageContainer/gql';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import { decodeData, encodeData } from '../../utils/data';

interface IInsurancePage {
  data: GetInsuranceLandingPage | undefined;
}

const InsurancePage: NextPage<IInsurancePage> = ({ data: encodedData }) => {
  return <InsurancePageContainer data={decodeData(encodedData)} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GET_INSURANCE_LANDING_PAGE,
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default InsurancePage;
