import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={-24.43}
      y={167.88}
      width={560.87}
      height={176.25}
      rx={88.12}
      ry={88.12}
      transform="translate(-106.04 256) rotate(-45)"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={169.41}
      y={156.59}
      width={176}
      height={196}
      rx={32}
      ry={32}
      transform="translate(255.41 -107.45) rotate(45)"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <circle cx={256} cy={208} r={16} />
    <circle cx={304} cy={256} r={16} />
    <circle cx={208} cy={256} r={16} />
    <circle cx={256} cy={304} r={16} />
  </svg>
));

export default Svg;
