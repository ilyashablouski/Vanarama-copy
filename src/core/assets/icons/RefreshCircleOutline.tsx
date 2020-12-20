import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M288,193s12.18-6-32-6a80,80,0,1,0,80,80"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 28,
      }}
    />
    <polyline
      points="256 149 296 189 256 229"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 28,
      }}
    />
    <path
      d="M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
