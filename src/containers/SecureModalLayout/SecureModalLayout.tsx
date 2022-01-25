import React, { useCallback, useState } from 'react';
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

const SecureModalLayout: React.FC = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModalVisibility = useCallback(() => {
    setIsShowModal(!isShowModal);
  }, [isShowModal]);

  return (
    <div className="-flex-v">
      {children}
      {isShowModal && <SecureOrderModal onModalClose={toggleModalVisibility} />}
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
        onClick={toggleModalVisibility}
      />
    </div>
  );
};

export default SecureModalLayout;
