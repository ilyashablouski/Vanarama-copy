import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <line
      x1={88}
      y1={152}
      x2={424}
      y2={152}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 48,
      }}
    />
    <line
      x1={88}
      y1={256}
      x2={424}
      y2={256}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 48,
      }}
    />
    <line
      x1={88}
      y1={360}
      x2={424}
      y2={360}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 48,
      }}
    />
  </svg>
));

export default Svg;
