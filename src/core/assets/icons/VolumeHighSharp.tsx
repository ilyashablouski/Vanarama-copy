import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M320,320c9.74-19.38,16-40.84,16-64,0-23.48-6-44.42-16-64"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <path
      d="M368,368c19.48-33.92,32-64.06,32-112s-12-77.74-32-112"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <path
      d="M416,416c30-46,48-91.43,48-160S446,143,416,96"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <polygon points="125.65 176.1 32 176.1 32 335.9 125.65 335.9 256 440 256 72 125.65 176.1" />
  </svg>
));

export default Svg;
