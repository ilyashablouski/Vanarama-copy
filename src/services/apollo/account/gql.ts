import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    login(username: $email, password: $pw)
  }
`;

export const REGISTER = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    register(username: $email, password: $pw)
  }
`;

export const REQUEST_NEW_PASSWORD = gql`
  mutation RequestNewPassword($email: String!) {
    passwordReset(username: $email)
  }
`;

export const CREATE_NEW_PASSOWRD = gql`
  mutation CreateNewPassword($code: String!, $email: String!, $pw: String!) {
    passwordConfirm(verificationCode: $code, username: $email, password: $pw)
  }
`;
