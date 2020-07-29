import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useQuery } from '@apollo/client';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured1 as ISideText } from '../../../../generated/GetFleetLandingPage';
import config from '../config';
import { TestimonialsData } from '../../../../generated/TestimonialsData';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';

const goToTop = () => window.scrollTo(0, 0);

const TestimonialSection = ({ titleTag, title, body }: ISideText) => {
  const { data } = useQuery<TestimonialsData>(TESTIMONIALS_DATA, {
    variables: { size: 1, page: 1 },
  });

  const testimonials = data?.testimonials || null;

  return (
    <div className="row:featured-right">
      <div>
        <Heading size="large" color="black" tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}>
          {title}
        </Heading>
        <Text tag="div">
          <ReactMarkdown source={body || ''} />
        </Text>
        <Button
          dataTestId="fleet_testimonial-section_request-button"
          color="primary"
          size="regular"
          label={config.requestCallBackButtonLabel}
          onClick={goToTop}
        />
      </div>
      {testimonials && testimonials[0] && (
        <ReviewCard
          review={{
            text: testimonials[0].comments || '',
            author: testimonials[0].name,
            score: testimonials[0].overallRating,
          }}
        />
      )}
    </div>
  );
};

export default TestimonialSection;
