import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon s-ion-icon"
    viewBox="0 0 512 512"
    width="0.9em"
    height="0.9em"
  >
    <path
      d="M336 208v-95a80 80 0 00-160 0v95"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect
      x="96"
      y="208"
      width="320"
      height="272"
      rx="48"
      ry="48"
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
