import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <circle cx={256} cy={256} r={48} />
    <circle cx={256} cy={416} r={48} />
    <circle cx={256} cy={96} r={48} />
  </svg>
));

export default Svg;
