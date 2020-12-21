import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { INotificationCamera } from './interface';
import RouterLink from '../../../RouterLink/RouterLink';
import Skeleton from '../../../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

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
