import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path d="M288,16,0,304,176,480,464,192V16Zm80,128a32,32,0,1,1,32-32A32,32,0,0,1,368,144Z" />
    <polygon points="480 64 480 208 216.9 471.1 242 496 512 224 512 64 480 64" />
  </svg>
));

export default Svg;
