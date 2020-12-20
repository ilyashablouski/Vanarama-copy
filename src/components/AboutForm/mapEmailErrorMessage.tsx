import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export const EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS';

const logInLink = {
  href: '',
  label: 'login',
};

export const mapEmailErrorMessage = (onClick?: () => void, message?: string) =>
  message !== EMAIL_ALREADY_EXISTS ? (
    message
  ) : (
    <Text tag="p" color="danger" size="xsmall">
      {'Your email address already exists. Do you wish to '}
      <RouterLink
        link={logInLink}
        onClick={onClick}
        classNames={{
          color: 'teal',
          size: 'xsmall',
        }}
      />
      {' using this email?'}
    </Text>
  );
