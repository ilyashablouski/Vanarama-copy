import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M416,448H96a32.09,32.09,0,0,1-32-32V96A32.09,32.09,0,0,1,96,64H416a32.09,32.09,0,0,1,32,32V416A32.09,32.09,0,0,1,416,448Z"
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
