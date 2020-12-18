import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polyline
      points="196 220 260 220 260 392"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 40,
      }}
    />
    <line
      x1={187}
      y1={396}
      x2={325}
      y2={396}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 40,
      }}
    />
    <path d="M256,160a32,32,0,1,1,32-32A32,32,0,0,1,256,160Z" />
  </svg>
));

export default Svg;
