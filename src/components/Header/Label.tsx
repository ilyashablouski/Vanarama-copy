import React from 'react';

interface ILableProps {
  text: string;
}
const Label: React.FC<ILableProps> = ({ text }) => (
  <span
    style={{
      color: 'white',
      backgroundColor: '#ec6409',
      fontSize: '11px',
      paddingRight: '8px',
      paddingLeft: '8px',
      paddingTop: '1px',
      paddingBottom: '1px',
      borderRadius: '4px',
      marginLeft: '10px',
      display: 'inline-block',
    }}
  >
    {text}
  </span>
);

export default React.memo(Label);
