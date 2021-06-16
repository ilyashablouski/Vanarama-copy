import mapToReviewCard from '../helpers';

describe('mapToReviewCard', () => {
  it('mapToReviewCard should return correct array', () => {
    expect(
      mapToReviewCard({
        reviewType: null,
        rating: '12',
        summary: 'someText',
        customerName: 'someName',
      }),
    ).toEqual({
      text: 'someText',
      author: 'someName',
      score: 12,
    });
  });
});
