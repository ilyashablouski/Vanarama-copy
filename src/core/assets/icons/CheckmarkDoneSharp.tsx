import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polyline
      points="465 127 241 384 149 292"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 44,
      }}
    />
    <line
      x1={140}
      y1={385}
      x2={47}
      y2={292}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 44,
      }}
    />
    <line
      x1={363}
      y1={127}
      x2={236}
      y2={273}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'square',
        strokeMiterlimit: 10,
        strokeWidth: 44,
      }}
    />
  </svg>
));

export default Svg;
