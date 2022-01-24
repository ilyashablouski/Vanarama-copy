import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});

interface ISecureOrderModalProps {
  onModalClose: () => void;
}

const SecureOrderModal: React.FC<ISecureOrderModalProps> = ({
  onModalClose,
}) => (
  <Modal show onRequestClose={onModalClose} title="Keeping Your Order Secure">
    <Text color="darker" size="small">
      At Vanarama, we do everything we can to protect your privacy and security.
      Our website security features encrypt your information so it stays safe
      and your details will only be shared with our trusted funders and credit
      agencies for the purposes of your application - never with any
      third-parties.
    </Text>
  </Modal>
);

export default SecureOrderModal;
