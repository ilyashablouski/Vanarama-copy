import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import TrustPilot from 'core/molecules/trustpilot';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import createApolloClient from 'apolloClient';
import {
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets_questionAnswers as QuestionAnswers,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets as QuestionSets,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel as CarouselData,
  EligibilityCheckerPageData,
} from '../../../generated/EligibilityCheckerPageData';
import {
  ELIGIBILITY_CHECKER_CONTENT,
  IEligbilityCheckerPage,
} from '../../gql/eligibility-checker/eligibilityChecker';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});

const CustomerThink = dynamic(
  () => import('../../components/EligibilityChecker/Landing/CustomerThing'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const CustomerReviews = dynamic(
  () => import('../../components/CustomerReviews/CustomerReviews'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

const EligibilityChecker: NextPage<IEligbilityCheckerPage> = ({
  data,
  error,
}) => {
  if (error || !data) {
    return <ErrorPage errorData={error} />;
  }

  const accordionItems = (questions: (QuestionAnswers | null)[]) => {
    return questions.map((el, index) => ({
      id: index,
      title: el?.question || '',
      children: <>{el?.answer || ''}</>,
    }));
  };

  const metaDataName = getSectionsData(
    ['metaData', 'name'],
    data?.eligibilityCheckerLandingPage,
  );
  const featured1 = getSectionsData(
    ['sections', 'featured1'],
    data?.eligibilityCheckerLandingPage,
  );
  const featured2 = getSectionsData(
    ['sections', 'featured2'],
    data?.eligibilityCheckerLandingPage,
  );
  const leadText = getSectionsData(
    ['sections', 'leadText'],
    data?.eligibilityCheckerLandingPage,
  );
  const carousel: CarouselData = getSectionsData(
    ['sections', 'carousel'],
    data?.eligibilityCheckerLandingPage,
  );
  const metaData = getSectionsData(
    ['metaData'],
    data?.eligibilityCheckerLandingPage,
  );
  const featuredImage = getSectionsData(
    ['featuredImage'],
    data?.eligibilityCheckerLandingPage,
  );
  const reviews = carousel?.cardTestimonials?.length
    ? carousel?.cardTestimonials?.map(el => ({
        author: el?.companyName || el?.customerName || '',
        text: el?.summary || '',
        timeStamp: el?.date || '',
        score: parseFloat(el?.rating || '0'),
      }))
    : [];
  const faqs = getSectionsData(
    ['sections', 'faqs'],
    data?.eligibilityCheckerLandingPage,
  );
  const questions = (faqs?.questionSets as QuestionSets[])[0]?.questionAnswers;
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {metaDataName}
        </Heading>
      </div>
      {featured1 && (
        <Lease
          title={featured1.title}
          body={featured1.body}
          video={featured1.video}
        />
      )}
      {featured2 && (
        <WhyEligibilityChecker
          title={featured2.title}
          body={featured2.body}
          image={featured2.image}
          iconList={featured2.iconList}
        />
      )}
      {!!questions?.length && (
        <div className="row:lead-text">
          <Heading size="large" color="black">
            {faqs?.title}
          </Heading>
          <Accordion items={accordionItems(questions)} className="tilebox" />
        </div>
      )}
      {leadText && (
        <CustomerThink
          heading={leadText.heading}
          description={leadText.description}
        />
      )}
      {!!carousel?.cardTestimonials?.length && (
        <div className="row:bg-lighter ">
          <div className="row:carousel">
            <CustomerReviews
              title={
                data?.eligibilityCheckerLandingPage?.sections?.carousel?.title
              }
              reviews={reviews}
              headingClassName="-mb-400 -a-center"
              sliderClassName="-mh-000"
            />
          </div>
        </div>
      )}
      <section className="row:trustpilot">
        <TrustPilot />
      </section>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data } = await client.query<EligibilityCheckerPageData>({
      query: ELIGIBILITY_CHECKER_CONTENT,
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
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
        error: convertErrorToProps(error),
      },
    };
  }
}

export default EligibilityChecker;
