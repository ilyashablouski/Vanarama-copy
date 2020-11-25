import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import {
  EligibilityCheckerPageData,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets_questionAnswers as QuestionAnswers,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets as QuestionSets,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel as CarouselData,
} from '../../../generated/EligibilityCheckerPageData';
import withApollo from '../../hocs/withApollo';
import { ELIGIBILITY_CHECKER_CONTENT } from '../../gql/eligibility-checker/eligibilityChecker';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useQuery<EligibilityCheckerPageData>(
    ELIGIBILITY_CHECKER_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.eligibilityCheckerLandingPage) {
    return null;
  }

  const accordionItems = (questions: (QuestionAnswers | null)[]) => {
    return questions.map((el, idx) => ({
      id: idx,
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
        <Breadcrumb items={breadcrumbsItems} />
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
        <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
      </section>
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
