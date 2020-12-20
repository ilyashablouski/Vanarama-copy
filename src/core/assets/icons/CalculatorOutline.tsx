import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={112}
      y={48}
      width={288}
      height={416}
      rx={32}
      ry={32}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x={160.01}
      y={112}
      width={191.99}
      height={64}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <circle cx={168} cy={248} r={24} />
    <circle cx={256} cy={248} r={24} />
    <circle cx={344} cy={248} r={24} />
    <circle cx={168} cy={328} r={24} />
    <circle cx={256} cy={328} r={24} />
    <circle cx={168} cy={408} r={24} />
    <circle cx={256} cy={408} r={24} />
    <rect x={320} y={304} width={48} height={128} rx={24} ry={24} />
  </svg>
));

export default Svg;
