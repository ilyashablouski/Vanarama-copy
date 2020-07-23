import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../../utils/getTitleTag';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { GetFleetLandingPage_fleetLandingPage_sections_featured1 as ISideText } from '../../../../generated/GetFleetLandingPage';
import { useTestimonialsData } from '../gql';
import config from '../config';

const goToTop = () => {
    window.scrollTo(0, 0);
};

const TestimonialSection = ({ titleTag, title, body }: ISideText) => {
    // const [review, setReview] = useState<TestimonialData | null>(null);
    const { data, loading, error } = useTestimonialsData();

    if (error) {
        console.error(error.message);
    }

    if (!data) {
        return <></>;
    }

    const { testimonials } = data;

    return (
        <div className="row:featured-right">
            <div>
                <Heading
                    size="large"
                    color="black"
                    tag={getTitleTag(titleTag) as any}
                >
                    {title}
                </Heading>
                <Text tag="p">
                    <ReactMarkdown source={body || ''} />
                </Text>
                <Button
                    color="primary"
                    size="regular"
                    label={config.requestCallBackForm.requestCallBackButton}
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
