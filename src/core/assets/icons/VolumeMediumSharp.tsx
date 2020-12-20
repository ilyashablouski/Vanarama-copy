import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polygon points="157.65 176.1 64 176.1 64 335.9 157.65 335.9 288 440 288 72 157.65 176.1" />
    <path
      d="M352,320c9.74-19.41,16-40.81,16-64,0-23.51-6-44.4-16-64"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <path
      d="M400,368c19.48-34,32-64,32-112s-12-77.7-32-112"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
