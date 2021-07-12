import { Children, isValidElement, ReactNode } from 'react';

export interface IHeading {
  level: number;
  children: Array<ReactNode>;
}

export const flattenHeadingText = (
  resultText: string,
  headingChild: ReactNode,
): string =>
  !isValidElement(headingChild)
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
