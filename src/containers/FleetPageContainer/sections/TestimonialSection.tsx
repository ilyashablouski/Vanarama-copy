import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured1 as ISideText } from '../../../../generated/GetFleetLandingPage';
import config from '../config';
import RouterLink from '../../../components/RouterLink/RouterLink';

const goToTop = () => window.scrollTo(0, 0);

const TestimonialSection = ({
  titleTag,
  title,
  body,
  testimonials,
}: ISideText) => {
  return (
    <div className="row:featured-right">
      {testimonials && testimonials[0] && (
        <ReviewCard
          review={{
            text: testimonials[0].summary || '',
            author: testimonials[0].customerName || '',
            score:
              (testimonials[0].rating &&
                parseInt(testimonials[0].rating, 10)) ||
              5,
          }}
        />
      )}
      <div>
        <Heading
          size="large"
          color="black"
          tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}
        >
          {title}
        </Heading>
        <ReactMarkdown
          source={body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" className="-mt-100" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
        <Button
          dataTestId="fleet_testimonial-section_request-button"
          color="primary"
          size="regular"
          label={config.requestCallBackButtonLabel}
          onClick={goToTop}
        />
      </div>
    </div>
  );
};

export default TestimonialSection;
