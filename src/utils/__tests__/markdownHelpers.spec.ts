import { createElement } from 'react';
import { convertHeadingToSlug, flattenHeadingText } from '../markdownHelpers';

const headingChild = createElement('h1', [], 'Heading Text');
const headingProps = {
  children: [headingChild],
  level: 3,
};

describe('markdownHelpers', () => {
  describe('flattenHeadingText', () => {
    it('flattenHeadingText should return correct heading text', () => {
      expect(flattenHeadingText('', headingChild)).toEqual('Heading Text');
    });
  });
  describe('convertHeadingToSlug', () => {
    it('convertHeadingToSlug should return correct slug url', () => {
      expect(convertHeadingToSlug(headingProps)).toEqual('heading-text');
    });
  });
});
