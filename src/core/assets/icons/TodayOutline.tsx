import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={48}
      y={80}
      width={416}
      height={384}
      rx={48}
      ry={48}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <path d="M397.82,80H114.18C77.69,80,48,110.15,48,147.2V192h8c0-16,24-32,40-32H416c16,0,40,16,40,32h8V147.2C464,110.15,434.31,80,397.82,80Z" />
    <line
      x1={128}
      y1={48}
      x2={128}
      y2={80}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <line
      x1={384}
      y1={48}
      x2={384}
      y2={80}
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <rect x={96} y={208} width={128} height={128} rx={28.57} ry={28.57} />
    <path
      d="M464,256V208a48.14,48.14,0,0,0-48-48H96a48.14,48.14,0,0,0-48,48v48"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
