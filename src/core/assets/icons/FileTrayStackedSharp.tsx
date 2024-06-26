import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path d="M448,16H64L32,176V320H480V176ZM436,176H320a64,64,0,0,1-128,0H76L98,58H414Z" />
    <path d="M320,352a64,64,0,0,1-128,0H32V496H480V352Z" />
  </svg>
));

export default Svg;
