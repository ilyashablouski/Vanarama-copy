import Text from '@vanarama/uibook/lib/components/atoms/text';
import React, { FC } from 'react';
import { INotificationCamera } from './interface';
import RouterLink from '../../../RouterLink/RouterLink';

const NotificationCamera: FC<INotificationCamera> = ({
  onCloseModal,
  text,
}) => {
  return (
    <Text color="darker">
      {text} Please
      <RouterLink
        classNames={{ color: 'teal' }}
        onClick={onCloseModal}
        aria-hidden="true"
        link={{ href: '', label: '' }}
        withoutLink
      >
        {' '}
        fill in the form manually
      </RouterLink>
    </Text>
  );
};

export default NotificationCamera;
