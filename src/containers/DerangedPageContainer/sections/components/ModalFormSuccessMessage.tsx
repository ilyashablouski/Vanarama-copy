import React from 'react';
import Icon from 'core/atoms/icon';
import CheckmarkCircle from 'core/assets/icons/CheckmarkCircle';
import dynamic from 'next/dynamic';
import Skeleton from '../../../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const ModalFormSuccessMessage = () => {
  return (
    <div className="drawer__form__content">
      <Icon size="xlarge" color="success" icon={<CheckmarkCircle />} />
      <Text
        size="lead"
        color="success"
        className="drawer__form__content__success"
      >
        Your enquiry has been sent
      </Text>
    </div>
  );
};

export default ModalFormSuccessMessage;
