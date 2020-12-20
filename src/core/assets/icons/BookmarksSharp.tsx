import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <polygon points="112 0 112 48 416 48 416 416 464 448 464 0 112 0" />
    <polygon points="48 80 48 512 216 388 384 512 384 80 48 80" />
  </svg>
));

export default Svg;
