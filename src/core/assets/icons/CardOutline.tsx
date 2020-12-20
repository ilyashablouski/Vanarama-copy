import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={48}
      y={96}
      width={416}
      height={320}
      rx={56}
      ry={56}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <line
      x1={48}
      y1={192}
      x2={464}
      y2={192}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 60,
      }}
    />
    <rect
      x={128}
      y={300}
      width={48}
      height={20}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 60,
      }}
    />
  </svg>
));

export default Svg;
