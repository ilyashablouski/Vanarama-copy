import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect x={272} y={208} width={48} height={48} rx={4} ry={4} />
    <rect x={352} y={208} width={48} height={48} rx={4} ry={4} />
    <rect x={272} y={288} width={48} height={48} rx={4} ry={4} />
    <rect x={352} y={288} width={48} height={48} rx={4} ry={4} />
    <rect x={112} y={288} width={48} height={48} rx={4} ry={4} />
    <rect x={192} y={288} width={48} height={48} rx={4} ry={4} />
    <rect x={112} y={368} width={48} height={48} rx={4} ry={4} />
    <rect x={192} y={368} width={48} height={48} rx={4} ry={4} />
    <rect x={272} y={368} width={48} height={48} rx={4} ry={4} />
    <path d="M448,64H400V32H360V64H152V32H112V64H64A32,32,0,0,0,32,96V448a32,32,0,0,0,32,32H448a32,32,0,0,0,32-32V96A32,32,0,0,0,448,64ZM436,436H76V176H436Z" />
  </svg>
));

export default Svg;
