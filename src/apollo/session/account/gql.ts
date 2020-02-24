import { gql } from "apollo-boost"

export const REGISTER_USER = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    register(username: $email, password: $pw)
  }
`

export const LOGIN_USER = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    login(username: $email, password: $pw)
  }
`
export const RESET_REQUEST = gql`
  mutation RequestNewPassword($email: String!) {
    passwordReset(username: $email)
  }
`

export const NEW_PASSWORD = gql`
  mutation CreateNewPassword($code: String!, $email: String!, $pw: String!) {
    passwordConfirm(verificationCode: $code, username: $email, password: $pw)
  }
`
