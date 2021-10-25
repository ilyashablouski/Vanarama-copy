import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../../utils/getTitleTag';
import { GenericPageQuery_genericPage_sections_featured as IFeature } from '../../../../generated/GenericPageQuery';
import config from '../config';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const ReviewCard = dynamic(
  () => import('core/molecules/cards/ReviewCard/ReviewCard'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const goToTop = () => window.scrollTo(0, 0);

const TestimonialSection = ({
  titleTag,
  title,
  body,
  testimonials,
}: IFeature) => {
  return (
    <div className="row:featured-right">
      {testimonials && testimonials[0] && (
        <ReviewCard
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
          allowDangerousHtml
          source={body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return (
                <RouterLink
                  link={{ href, label: children }}
                  classNames={{ color: 'teal' }}
                />
              );
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
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

export default React.memo(TestimonialSection);
