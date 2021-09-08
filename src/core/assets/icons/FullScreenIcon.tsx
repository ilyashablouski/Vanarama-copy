import React, { FC, memo } from 'react';

const FullScreenIcon: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 20 20">
    <path
      d="M13.75,20a1.25,1.25,0,1,1,0-2.5H17.5V13.75a1.25,1.25,0,1,1,2.5,0v5A1.25,1.25,0,0,1,18.75,20ZM1.25,20A1.25,1.25,0,0,1,0,18.75v-5a1.25,1.25,0,1,1,2.5,0V17.5H6.25a1.25,1.25,0,1,1,0,2.5ZM17.5,6.25V2.5H13.75a1.25,1.25,0,1,1,0-2.5h5A1.25,1.25,0,0,1,20,1.25v5a1.25,1.25,0,1,1-2.5,0ZM0,6.25v-5A1.25,1.25,0,0,1,1.25,0h5a1.25,1.25,0,1,1,0,2.5H2.5V6.25a1.25,1.25,0,1,1-2.5,0Z"
      style={{
        stroke: 'var(--class-color)',
      }}
    />
  </svg>
));
export default FullScreenIcon;