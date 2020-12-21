import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <line
      x1={102}
      y1={256}
      x2={410}
      y2={256}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
    <line
      x1={102}
      y1={176}
      x2={410}
      y2={176}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
    <line
      x1={102}
      y1={336}
      x2={410}
      y2={336}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
  </svg>
));

export default Svg;
