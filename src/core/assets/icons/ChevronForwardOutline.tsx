import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
  >
    <title>Chevron Forward</title>
    <path
      d="M184 112l144 144-144 144"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
  </svg>
));

export default Svg;
