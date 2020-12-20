import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <circle
      cx={256}
      cy={256}
      r={26}
      style={{
        stroke: 'var(--class-color)',
        strokeMiterlimit: 10,
        strokeWidth: 10,
      }}
    />
    <circle
      cx={346}
      cy={256}
      r={26}
      style={{
        stroke: 'var(--class-color)',
        strokeMiterlimit: 10,
        strokeWidth: 10,
      }}
    />
    <circle
      cx={166}
      cy={256}
      r={26}
      style={{
        stroke: 'var(--class-color)',
        strokeMiterlimit: 10,
        strokeWidth: 10,
      }}
    />
    <polyline
      points="160 368 32 256 160 144"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 42,
      }}
    />
    <polyline
      points="352 368 480 256 352 144"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 42,
      }}
    />
  </svg>
));

export default Svg;
