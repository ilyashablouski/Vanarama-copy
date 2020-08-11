import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import {
  EligibilityCheckerPageData,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets_questionAnswers as QuestionAnswers,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets as QuestionSets,
} from '../../../generated/EligibilityCheckerPageData';
import withApollo from '../../hocs/withApollo';
import { ELIGIBILITY_CHECKER_CONTENT } from '../../gql/eligibility-checker/eligibilityChecker';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useQuery<EligibilityCheckerPageData>(
    ELIGIBILITY_CHECKER_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const accordionItems = (questions: (QuestionAnswers | null)[]) => {
    return questions.map((el, idx) => ({
      id: idx,
      title: el?.question || '',
      children: <>{el?.answer || ''}</>,
    }));
  };

  const metaData = data?.eligibilityCheckerLandingPage?.metaData;
  const featured1 = data?.eligibilityCheckerLandingPage?.sections?.featured1;
  const featured2 = data?.eligibilityCheckerLandingPage?.sections?.featured2;
  const leadText = data?.eligibilityCheckerLandingPage?.sections?.leadText;
  const carousel = data?.eligibilityCheckerLandingPage?.sections?.carousel;
  const reviews = carousel?.cardTestimonials?.length
    ? carousel?.cardTestimonials?.map(el => ({
        author: el?.companyName || el?.customerName || '',
        text: el?.summary || '',
        timeStamp: el?.date || '',
        score: parseFloat(el?.rating || '0'),
      }))
    : [];
  const faqs = data?.eligibilityCheckerLandingPage?.sections?.faqs;
  const questions = (faqs?.questionSets as QuestionSets[])[0]?.questionAnswers;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black">
          {metaData?.title}
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
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
