import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M315.09,481.38,258.14,366.26l-45-57.56a73.11,73.11,0,0,1-10.16-37.17V142h15.73A40.36,40.36,0,0,1,259,182.32V344.84"
      style={{
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <polyline
      points="128.18 291.5 128.18 216.73 193.13 151.63"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <polygon points="376.35 295.73 292.4 239.35 292.4 194.67 397.08 267.62 376.35 295.73" />
    <polygon points="175.13 498.58 153.7 471.67 234.03 390.13 249.56 422.2 175.13 498.58" />
    <circle
      cx={259.02}
      cy={67.21}
      r={37.38}
      style={{
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeWidth: 16,
      }}
    />
  </svg>
));

export default Svg;
