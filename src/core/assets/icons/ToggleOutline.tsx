import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <circle
      cx={368}
      cy={256}
      r={128}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={16}
      y={128}
      width={480}
      height={256}
      rx={128}
      ry={128}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
