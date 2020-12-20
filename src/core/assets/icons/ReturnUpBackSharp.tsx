import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polyline
      points="112 160 48 224 112 288"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <polyline
      points="64 224 464 224 464 352"
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
