import dynamic from 'next/dynamic';

const Heading = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/heading'),
);

const getTitleTag = (possibleTag: string | null) =>
  possibleTag && Heading.defaultProps?.tag?.indexOf(possibleTag) !== -1
    ? possibleTag
    : undefined;

export default getTitleTag;
