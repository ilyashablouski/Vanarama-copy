import { gql, useQuery } from '@apollo/client';
import {
  ReviewsPageQuery,
  ReviewsPageQueryVariables,
  ReviewsPageQuery_reviewsPage_sections_reviews_reviews,
} from '../../../generated/ReviewsPageQuery';

export function mapToReviewCard(
  review: ReviewsPageQuery_reviewsPage_sections_reviews_reviews | null,
) {
  return {
    text: review?.summary || '',
    author: review?.customerName || '',
    score: Number(review?.rating || 0),
  };
}
