// @ts-nocheck
/* eslint-disable */
import React from 'react';

let mockValues = {};
export function __setMockValues(values: any) {
  mockValues = values;
}

/**
 * A mock implementation of the LoginForm. Form values can be mocked by calling `__setMockValues`
 */
const LoginFormMock: React.FC = ({ onSubmit }) => (
  <form role="form" onSubmit={() => onSubmit(mockValues)} />
);

export default LoginFormMock;
