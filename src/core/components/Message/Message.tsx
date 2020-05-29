import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Column } from '@vanarama/uibook/lib/components/molecules/grid';

const Message: React.FC<{ message: string }> = ({ message, children }) => (
  <Column sm="row" md="row" lg="2-4">
    <Heading
      tag="span"
      size="regular"
      color="success"
      dataTestId="registration-success-message"
    >
      {children}
      {message}
    </Heading>
  </Column>
);

export default Message;
