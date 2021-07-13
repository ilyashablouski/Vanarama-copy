export const replaceReview = (review: string): string => {
  return review.length > 120 ? `${review.slice(0, -4)} ...` : review;
};

export default replaceReview;
