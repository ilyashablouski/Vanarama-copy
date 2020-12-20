import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect x={128} y={64} width={256} height={32} />
    <rect x={96} y={112} width={320} height={32} />
    <path d="M464,448H48V160H464Z" />
  </svg>
));

export default Svg;
