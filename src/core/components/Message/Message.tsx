import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Message: React.FC<{ message: string }> = ({ message, children }) => (
  <Heading
    tag="span"
    size="regular"
    color="success"
    dataTestId="registration-success-message"
  >
    {children}
    {message}
  </Heading>
);

export default Message;
