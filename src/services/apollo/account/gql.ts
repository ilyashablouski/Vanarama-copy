import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation LoginMutation($email: String!, $pw: String!) {
    login(username: $email, password: $pw)
  }
`;

export const REGISTER = gql`
  mutation RegisterMutation($email: String!, $pw: String!) {
    register(username: $email, password: $pw) {
      id
    }
  }
`;
