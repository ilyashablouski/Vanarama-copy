import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polygon points="16 400 256 256 16 112 16 400" />
    <polygon points="256 400 496 256 256 112 256 400" />
  </svg>
));

export default Svg;
