import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface IProps {
  isOpen: boolean;
  modalElement: Element;
  modalContent: ReactNode;
}

const CustomSelectWindowPortal = ({
  modalContent,
  modalElement,
  isOpen,
}: IProps) => {
  return isOpen ? ReactDOM.createPortal(modalContent, modalElement) : null;
};

export default CustomSelectWindowPortal;
