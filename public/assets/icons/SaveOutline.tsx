import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M380.93,57.37A32,32,0,0,0,358.3,48H94.22A46.21,46.21,0,0,0,48,94.22V417.78A46.21,46.21,0,0,0,94.22,464H417.78A46.36,46.36,0,0,0,464,417.78V153.7a32,32,0,0,0-9.37-22.63ZM256,416a64,64,0,1,1,64-64A63.92,63.92,0,0,1,256,416Zm48-224H112a16,16,0,0,1-16-16V112a16,16,0,0,1,16-16H304a16,16,0,0,1,16,16v64A16,16,0,0,1,304,192Z"
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
