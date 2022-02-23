import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
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
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../types/common';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

type IProps = IPageWithData<{
  data: GetInsuranceLandingPage;
  serviceBanner?: IServiceBanner;
}>;

const InsurancePage: NextPage<IProps> = ({
  data: encodedData,
  serviceBanner,
}) => {
  const data = decodeData(encodedData);

  return <InsurancePageContainer data={data} serviceBanner={serviceBanner} />;
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
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

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
        serviceBanner: serviceBanner || null,
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
