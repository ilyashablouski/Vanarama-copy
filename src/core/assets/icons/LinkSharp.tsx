import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M200.66,352H144a96,96,0,0,1,0-192h55.41"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <path
      d="M312.59,160H368a96,96,0,0,1,0,192H311.34"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <line
      x1={169.07}
      y1={256}
      x2={344.93}
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
