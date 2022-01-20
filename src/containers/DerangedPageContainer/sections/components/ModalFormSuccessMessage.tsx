import React from 'react';
import Icon from 'core/atoms/icon';
import CheckmarkCircle from 'core/assets/icons/CheckmarkCircle';
import dynamic from 'next/dynamic';
import Skeleton from '../../../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IModalFormSuccessMessage {
  dataUiTestId?: string;
}

const ModalFormSuccessMessage = ({
  dataUiTestId,
}: IModalFormSuccessMessage) => {
  return (
    <div className="drawer__form-content">
      <Icon size="xlarge" color="success" icon={<CheckmarkCircle />} />
      <Text
        size="lead"
        color="success"
        className="drawer__form-content-success"
        dataUiTestId={
          dataUiTestId
            ? `${dataUiTestId}_modal-form-success-message`
            : undefined
        }
      >
        Your enquiry has been sent
      </Text>
    </div>
  );
};

export default ModalFormSuccessMessage;
