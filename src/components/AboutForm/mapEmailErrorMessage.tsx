import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export interface IExistenceCheckResult {
  isExists?: Boolean | null;
  isTemporary?: Boolean | null;
}

export const EMAIL_ALREADY_REGISTERED = 'EMAIL_ALREADY_REGISTERED';
export const EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE';

const loginLink = {
  href: '',
  label: 'login',
};

const RegisterLink = {
  href: '',
  label: 'register',
};

export const createEmailErrorMessage = (
  data?: IExistenceCheckResult | null,
) => {
  if (data?.isExists && data?.isTemporary) {
    return EMAIL_ALREADY_IN_USE;
  }

  if (data?.isExists) {
    return EMAIL_ALREADY_REGISTERED;
  }

  return undefined;
};

export const mapEmailErrorMessage = (
  message?: string,
  onLoginClick?: () => void,
  onRegistrationClick?: () => void,
) => {
  switch (message) {
    case EMAIL_ALREADY_REGISTERED:
      return (
        <Text tag="p" color="danger" size="xsmall">
          {'Your email address already exists. Do you wish to '}
          <RouterLink
            link={loginLink}
            onClick={onLoginClick}
            classNames={{
              color: 'teal',
              size: 'xsmall',
            }}
          />
          {' using this email?'}
        </Text>
      );
    case EMAIL_ALREADY_IN_USE:
      return (
        <Text tag="p" color="danger" size="xsmall">
          {'It seems you’ve visited us before. Please '}
          <RouterLink
            link={RegisterLink}
            onClick={onRegistrationClick}
            classNames={{
              color: 'teal',
              size: 'xsmall',
            }}
          />
          {' to continue with your application or use a different email'}
        </Text>
      );
    default:
      return message;
  }
};
