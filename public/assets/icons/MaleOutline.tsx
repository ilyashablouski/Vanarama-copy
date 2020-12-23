import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <title>male-outline</title>
    <circle
      cx={216}
      cy={296}
      r={152}
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <polyline
      points="448 160 448 64 352 64"
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <line
      x1={324}
      y1={188}
      x2={448}
      y2={64}
      fill="none"
      stroke="var(--class-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
));

export default Svg;
