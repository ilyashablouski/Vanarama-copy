import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polyline
      points="352 368 464 368 464 256"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <polyline
      points="48 144 192 288 288 192 448 352"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
