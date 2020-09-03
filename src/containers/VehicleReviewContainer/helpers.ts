import { ReviewsPageQuery_reviewsPage_sections_reviews_reviews as Reviews } from '../../../generated/ReviewsPageQuery';

export default function mapToReviewCard(review: Reviews | null) {
  return {
    text: review?.summary || '',
    author: review?.customerName || '',
    score: Number(review?.rating || 0),
  };
}
