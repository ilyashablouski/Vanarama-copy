import React from 'react';

const PasswordRequirements = () => {
  return (
    <ul>
      <li>Minimum length 8 characters</li>
      <li>Contain at least 1 number</li>
      <li>Contain uppercase letters</li>
      <li>Contain lowercase letters</li>
    </ul>
  );
};

export default React.memo(PasswordRequirements);
