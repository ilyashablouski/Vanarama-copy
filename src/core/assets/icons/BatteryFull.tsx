import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={32}
      y={144}
      width={400}
      height={224}
      rx={45.7}
      ry={45.7}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <rect
      x={85.69}
      y={198.93}
      width={292.63}
      height={114.14}
      rx={4}
      ry={4}
      style={{
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <line
      x1={480}
      y1={218.67}
      x2={480}
      y2={293.33}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
