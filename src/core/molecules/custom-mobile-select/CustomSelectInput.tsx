import { useState } from 'react';
import Icon from 'core/atoms/icon';
import ChevronDown from 'core/assets/icons/ChevronDown';
import CustomSelectWindowPortal from './CustomSelectWindowPortal';
import CustomSelectWindow from './CustomSelectWindow';
import { Component } from '../../../types/common';

interface IProps {
  label: string;
  title: string;
  modalElement: Element;
  listRender: Component;
  disabled?: boolean;
  onCloseModal?: () => void;
  dataTestId?: string;
}

const CustomSelectInput = ({
  label,
  modalElement,
  title,
  listRender,
  disabled,
  onCloseModal,
  dataTestId,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="select -fullwidth">
      <select
        data-testId={dataTestId}
        className="select--native"
        disabled={disabled}
        defaultValue={label}
        onMouseDown={e => e.preventDefault()}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <option disabled value={label}>
          {label}
        </option>
        <CustomSelectWindowPortal
          isOpen={isOpen}
          modalContent={
            <CustomSelectWindow
              title={title}
              onClose={event => {
                event.stopPropagation();
                setIsOpen(false);
                onCloseModal?.();
              }}
            >
              {listRender}
            </CustomSelectWindow>
          }
          modalElement={modalElement}
        />
      </select>
      <span className="icon select--chevron">
        <Icon icon={<ChevronDown />} className="-stroke -dark" />
      </span>
    </div>
  );
};

export default CustomSelectInput;
