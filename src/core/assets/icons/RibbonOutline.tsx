import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <circle
      cx={256}
      cy={160}
      r={128}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <path
      d="M143.65,227.82,48,400l86.86-.42a16,16,0,0,1,13.82,7.8L192,480l88.33-194.32"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <path
      d="M366.54,224,464,400l-86.86-.42a16,16,0,0,0-13.82,7.8L320,480,256,339.2"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <circle
      cx={256}
      cy={160}
      r={64}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
