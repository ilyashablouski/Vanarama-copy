import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M480,208H308L256,48,204,208H32l140,96L118,464,256,364,394,464,340,304Z"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <polygon points="256 48 256 364 118 464 172 304 32 208 204 208 256 48" />
  </svg>
));

export default Svg;
