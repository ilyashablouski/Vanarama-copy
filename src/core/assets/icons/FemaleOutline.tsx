import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <title>female-outline</title>
    <circle
      cx={256}
      cy={184}
      r={152}
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <line
      x1={256}
      y1={336}
      x2={256}
      y2={480}
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <line
      x1={314}
      y1={416}
      x2={198}
      y2={416}
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
));

export default Svg;
