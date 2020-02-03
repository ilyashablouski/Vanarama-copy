import * as React from 'react';

export interface Props {
  onClick ?: Function;
  tabIndex ?:Number;
  isActive ?: Boolean;
  linkClassName: String;
}

function Tab({
  onClick = function(){ return; },
  tabIndex ='',
  isActive ='',
  linkClassName=''
}: Props) {
  return (
    <li className='tab'>
      <a
        className={`tab-link ${linkClassName} ${isActive ? 'active' : ''}`}
        onClick={(event) => {
          event.preventDefault();
          onClick(tabIndex)
        }}
      >
        { linkClassName }
      </a>
    </li>
  )
}

export default Tab;
