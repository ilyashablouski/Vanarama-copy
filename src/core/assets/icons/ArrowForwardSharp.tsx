import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polyline
      points="268 112 412 256 268 400"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 48,
      }}
    />
    <line
      x1={392}
      y1={256}
      x2={100}
      y2={256}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 48,
      }}
    />
  </svg>
));

export default Svg;
