import { gql } from 'apollo-boost';

export const PASSWORD_REQUEST_GQL = gql`
  mutation PasswordRequest($email: String!) {
    passwordReset(username: $email)
  }
`;

export const PASSWORD_RESET_GQL = gql`
  mutation CreateNewPassword($code: String!, $email: String!, $pw: String!) {
    passwordConfirm(verificationCode: $code, username: $email, password: $pw)
  }
`;
