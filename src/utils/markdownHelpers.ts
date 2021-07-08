import { Children } from 'react';

export interface IHeading {
  level: number;
  children: Array<any>;
}

export const flattenHeadingText = (
  resultText: string,
  headingChild: any,
): string =>
  typeof headingChild === 'string'
    ? `${resultText}${headingChild}`
    : Children.toArray(headingChild.props.children).reduce(
        flattenHeadingText,
        resultText,
      );

export const convertHeadingToSlug = (props: IHeading) => {
  const children = Children.toArray(props.children);
  const text = children.reduce(flattenHeadingText, '');

  return text.toLowerCase().replace(/\W/g, '-');
};
