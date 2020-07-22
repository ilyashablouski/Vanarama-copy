import { useTestimonialsData } from "./gql";
import ReviewCard from "@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard";
import { useState } from "react";
import { TestimonialsData_testimonials as TestimonialData } from '../../../generated/TestimonialsData';

const TestimonialSection = () => {
    // const [review, setReview] = useState<TestimonialData | null>(null);
    const { data, loading, error } = useTestimonialsData();

    if (error) { console.error(error.message); }

    if (!data) {
        return <></>;
    }

    const { testimonials } = data;

    return <div className="row:featured-right">
        {testimonials && testimonials[0] && <ReviewCard review={{
            text: testimonials[0].comments || testimonials[0].whyLease || '',
            author: testimonials[0].name,
            score: testimonials[0].overallRating
        }} />}
    </div>
}

export default TestimonialSection;