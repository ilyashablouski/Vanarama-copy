// @ts-nocheck
/* eslint-disable */
import React from 'react';

let mockValues = {};
export function __setMockValues(values: any) {
  mockValues = values;
}

/**
 * A mock implementation of the ResetPasswordForm. Form values can be mocked by calling `__setMockValues`
 */
const ResetPasswordFormMock: React.FC = ({ onSubmit }) => (
  <form role="form" onSubmit={() => onSubmit(mockValues)} />
);

export default ResetPasswordFormMock;
