import Heading from '@vanarama/uibook/lib/components/atoms/heading';

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
