import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path d="M240,240H32V32H240Z" />
    <path d="M480,240H272V32H480Z" />
    <path d="M240,480H32V272H240Z" />
    <path d="M480,480H272V272H480Z" />
  </svg>
));

export default Svg;
