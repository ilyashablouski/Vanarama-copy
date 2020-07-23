import { useTestimonialsData } from "../gql";
import ReviewCard from "@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard";
import { useState } from "react";
import { TestimonialsData_testimonials as TestimonialData } from '../../../../generated/TestimonialsData';
import { GetFleetLandingPage_fleetLandingPage_sections_featured1 as ISideText } from "../../../../generated/GetFleetLandingPage";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from "@vanarama/uibook/lib/components/atoms/text";
import ReactMarkdown from "react-markdown";
import { getTitleTag } from "utils/getTitleTag";
import Button from "@vanarama/uibook/lib/components/atoms/button";
import config from "../config";

const goToTop = () => {
    window.scrollTo(0, 0);
};

const TestimonialSection = (props: ISideText) => {
    // const [review, setReview] = useState<TestimonialData | null>(null);
    const { data, loading, error } = useTestimonialsData();

    if (error) { console.error(error.message); }

    if (!data) {
        return <></>;
    }

    const { testimonials } = data;


    return <div className="row:featured-right">
        <div>
            <Heading size="large" color="black" tag={getTitleTag(props.titleTag) as any}>{props.title}</Heading>
            <Text tag="p">
                <ReactMarkdown source={props.body || ''} />
            </Text>
            <Button
                color="primary"
                size="regular"
                label={config.requestCallBackForm.requestCallBackButton}
                onClick={goToTop} />
        </div>
        {
            testimonials && testimonials[0] && <ReviewCard review={{
                text: testimonials[0].comments || '',
                author: testimonials[0].name,
                score: testimonials[0].overallRating
            }} />
        }
    </div >
};

export default TestimonialSection;
