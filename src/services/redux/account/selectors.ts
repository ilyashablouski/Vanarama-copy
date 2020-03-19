import {
  REGISTER_SUCCESSFULL,
  DUPLICATE_EMAIL,
} from 'services/constants/account';

export const registerErrorMessage = (error: string) => {
  const errorObject = JSON.parse(JSON.stringify(error));

  return errorObject && errorObject.graphQLErrors.length > 0
    ? DUPLICATE_EMAIL
    : null;
};

export const registerSuccessMessage = (success: boolean) => {
  return success ? REGISTER_SUCCESSFULL : null;
};
