import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polygon points="496 400 256 256 496 112 496 400" />
    <polygon points="256 400 16 256 256 112 256 400" />
  </svg>
));

export default Svg;
