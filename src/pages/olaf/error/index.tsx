import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import ErrorPage from '../../_error';
import { IOlafPageProps } from '../../../layouts/OLAFLayout/OLAFLayout';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

const HEADING = 'Thanks For Your Order';
const DESCRIPTION =
  'I’m afraid we can’t take you back, but if you’d like to get in touch or if there’s anything\nwe can help with, simply use the button below for ways to reach us.';
const LINK = {
  href: '/contact-us',
  label: 'Contact Us',
};

const OlafErrorPage: NextPage = () => (
  <ErrorPage heading={HEADING} description={DESCRIPTION} redirectLink={LINK} />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IOlafPageProps>> {
  const client = createApolloClient({}, context);

  try {
    const { serviceBanner } = await getServiceBannerData(client);

    return {
      props: {
        serviceBanner: serviceBanner || null,
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

export default OlafErrorPage;
