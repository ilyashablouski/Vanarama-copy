import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={48}
      y={48}
      width={176}
      height={176}
      rx={20}
      ry={20}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={288}
      y={48}
      width={176}
      height={176}
      rx={20}
      ry={20}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={48}
      y={288}
      width={176}
      height={176}
      rx={20}
      ry={20}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={288}
      y={288}
      width={176}
      height={176}
      rx={20}
      ry={20}
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
