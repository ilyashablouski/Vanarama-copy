import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={96}
      y={48}
      width={320}
      height={416}
      rx={48}
      ry={48}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <line
      x1={320}
      y1={48}
      x2={320}
      y2={464}
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
