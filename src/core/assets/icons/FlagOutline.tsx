import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M80,464V68.14a8,8,0,0,1,4-6.9C91.81,56.66,112.92,48,160,48c64,0,145,48,192,48a199.53,199.53,0,0,0,77.23-15.77A2,2,0,0,1,432,82.08V301.44a4,4,0,0,1-2.39,3.65C421.37,308.7,392.33,320,352,320c-48,0-128-32-192-32s-80,16-80,16"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </svg>
));

export default Svg;
