import React from 'react';
import dynamic from 'next/dynamic';
import SecureOrderModal from '../../components/SecureOrderModal';
import Skeleton from '../../components/Skeleton';
import SecureOrderIcon from '../../core/assets/icons/SecureOrder';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});

interface IOlafFormContainer {
  isShowModal: boolean;
  onModalClose: () => void;
}

const OlafFormContainer: React.FC<IOlafFormContainer> = ({
  children,
  isShowModal,
  onModalClose,
}) => {
  return (
    <div className="-flex-v">
      {children}
      {isShowModal && <SecureOrderModal onModalClose={onModalClose} />}
      <Button
        size="small"
        type="button"
        color="none"
        iconColor="white"
        iconPosition="before"
        withoutDefaultClass
        label={
          <>
            <Icon icon={<SecureOrderIcon />} color="teal" />
            <Text
              size="regular"
              color="teal"
              className="-underline -mt-100 link"
            >
              Secure order
            </Text>
          </>
        }
        dataTestId="secure-order"
        onClick={onModalClose}
      />
    </div>
  );
};

export default OlafFormContainer;
