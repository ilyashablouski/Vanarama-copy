export const replaceReview = (review: string): string => {
  return review.length > 120 ? `${review.slice(0, -4)} ...` : review;
};

export const newKeyReviews = (obj: {}, newKeys: {}) => {
  const keyValues = (Object.keys(obj) as Array<keyof typeof obj>).map(key => {
    const newKey: string = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
