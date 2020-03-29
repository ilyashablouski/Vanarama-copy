// @ts-nocheck
/* eslint-disable */
import React from 'react';

let mockValues = {};
export function __setMockValues(values: any) {
  mockValues = values;
}

/**
 * A mock implementation of the RegisterForm. Form values can be mocked by calling `__setMockValues`
 */
const RegisterFormMock: React.FC = ({ onSubmit }) => (
  <form onSubmit={() => onSubmit(mockValues)} />
);

export default RegisterFormMock;
