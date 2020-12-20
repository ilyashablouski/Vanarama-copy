import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polygon points="496 496 16 496 16 16 48 16 48 464 496 464 496 496" />
    <path d="M192,432H80V208H192Z" />
    <path d="M336,432H224V160H336Z" />
    <path d="M479.64,432h-112V96h112Z" />
  </svg>
));

export default Svg;
