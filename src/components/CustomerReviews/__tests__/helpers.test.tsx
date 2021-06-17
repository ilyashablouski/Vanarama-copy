import { replaceReview } from '../helpers';

describe('replaceReview', () => {
  it('replaceReview should return sliced value', () => {
    expect(
      replaceReview(
        'iSjfd9cdmqsMh9LSDwUMj7XHeqDodWy2VJBJFud3zaxSwtqpXSETwTYCVy1TwMIKgT3nMfurF2V0PX6MeLsHfMR5RVSZBnhLVKgC1PxS1MiVFCShZV2jkRNqN',
      ),
    ).toBe(
      'iSjfd9cdmqsMh9LSDwUMj7XHeqDodWy2VJBJFud3zaxSwtqpXSETwTYCVy1TwMIKgT3nMfurF2V0PX6MeLsHfMR5RVSZBnhLVKgC1PxS1MiVFCShZV2jk ...',
    );
  });
  it('replaceReview should return same value', () => {
    expect(replaceReview('qwerty')).toBe('qwerty');
  });
});
