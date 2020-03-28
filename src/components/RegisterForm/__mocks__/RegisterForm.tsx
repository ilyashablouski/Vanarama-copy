// @ts-nocheck
/* eslint-disable */
import React from 'react';

const RegisterFormMock: React.FC = ({ onSubmit }) => (
  <form
    onSubmit={() =>
      onSubmit({ email: 'barry@chuckle.com', password: 'Alpha!23' })
    }
  />
);

export default RegisterFormMock;
