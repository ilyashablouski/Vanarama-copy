import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M307.72,302.27a8,8,0,0,1-3.72-6.75V80a48,48,0,0,0-48-48h0a48,48,0,0,0-48,48V295.52a8,8,0,0,1-3.71,6.74,97.51,97.51,0,0,0-44.19,86.07A96,96,0,0,0,352,384,97.49,97.49,0,0,0,307.72,302.27Z"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <line
      x1={256}
      y1={112}
      x2={256}
      y2={384}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <circle cx={256} cy={384} r={48} />
  </svg>
));

export default Svg;
