import dynamic from 'next/dynamic';
import { Nullable } from '../types/common';

const Heading = dynamic(() => import('core/atoms/heading'));

const getTitleTag = (possibleTag: Nullable<string>) =>
  possibleTag && Heading.defaultProps?.tag?.indexOf(possibleTag) !== -1
    ? (possibleTag as keyof JSX.IntrinsicElements)
    : undefined;

export default getTitleTag;
