import Text from '@vanarama/uibook/lib/components/atoms/text';
import React, { FC } from 'react';
import { INotificationCamera } from './interface';

const NotificationCamera: FC<INotificationCamera> = ({
  onCloseModal,
  text,
}) => {
  return (
    <div>
      <Text color="darker">
        {text} Please
        <span
          className="text -regular -teal"
          onClick={onCloseModal}
          aria-hidden="true"
        >
          {' '}
          fill in the form manually
        </span>
      </Text>
    </div>
  );
};

export default NotificationCamera;
