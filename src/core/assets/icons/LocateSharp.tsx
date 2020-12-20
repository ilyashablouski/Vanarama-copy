import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <line
      x1={256}
      y1={96}
      x2={256}
      y2={56}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <line
      x1={256}
      y1={456}
      x2={256}
      y2={416}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <path
      d="M256,112A144,144,0,1,0,400,256,144,144,0,0,0,256,112Z"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <line
      x1={416}
      y1={256}
      x2={456}
      y2={256}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <line
      x1={56}
      y1={256}
      x2={96}
      y2={256}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
  </svg>
));

export default Svg;
