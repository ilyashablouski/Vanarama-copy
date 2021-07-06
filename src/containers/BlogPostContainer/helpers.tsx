import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const flattenHeadingText = (
  resultText: string,
  headingChild: any,
): string =>
  typeof headingChild === 'string'
    ? `${resultText}${headingChild}`
    : React.Children.toArray(headingChild.props.children).reduce(
        flattenHeadingText,
        resultText,
      );
