import React, { Dispatch, SetStateAction } from 'react';
import CustomSelectInput from 'core/molecules/custom-mobile-select/CustomSelectInput';
import CustomColorsList from 'core/atoms/custom-select/components/CustomColorsList';
import CustomSelect from 'core/atoms/custom-select/CustomSelect';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { IOptionsList } from '../../types/detailsPage';
import { Nullable } from '../../types/common';

interface IProps {
  defaultValue: string;
  setChanges: Dispatch<SetStateAction<number | null>>;
  items: Nullable<IOptionsList[]>;
  placeholder: string;
  isDisabled: boolean;
  modalElement: HTMLDivElement;
  dataTestId: string;
  tempValue: Nullable<string>;
  setTempValue: Dispatch<SetStateAction<Nullable<string>>>;
  selectedValue?: Nullable<string>;
  label: string;
  dataUiTestId?: string;
  setIsHotOffer?: Dispatch<SetStateAction<boolean>>;
  setIsFactoryOrder?: Dispatch<SetStateAction<boolean>>;
}

const CustomLeaseSelect = ({
  defaultValue,
  setChanges,
  items,
  placeholder,
  isDisabled,
  modalElement,
  dataTestId,
  tempValue,
  setTempValue,
  selectedValue,
  label,
  dataUiTestId,
  setIsHotOffer,
  setIsFactoryOrder,
}: IProps) => {
  const isDesktop = !useMobileViewport();

  function handleOnChange(option: React.ChangeEvent<HTMLSelectElement>) {
    setChanges(+option.currentTarget.getAttribute('data-id')!);
    if (setIsHotOffer) {
      setIsHotOffer(
        Boolean(+option.currentTarget.getAttribute('data-onoffer')!),
      );
    }
    if (setIsFactoryOrder) {
      setIsFactoryOrder(
        Boolean(+option.currentTarget.getAttribute('data-isfactory')!),
      );
    }
  }

  return (
    <>
      {isDesktop ? (
        <CustomSelect
          label={label}
          dataTestId={dataTestId}
          dataUiTestId={dataUiTestId}
          radioName={placeholder}
          isDisabled={isDisabled}
          selectedValue={selectedValue}
          placeholder={placeholder}
          className="-fullwidth"
          items={items}
          onChange={option => handleOnChange(option)}
        />
      ) : (
        <CustomSelectInput
          dataTestId={dataTestId}
          dataUiTestId={dataUiTestId}
          label={label}
          title={placeholder}
          disabled={isDisabled}
          modalElement={modalElement}
          onCloseModal={() => {
            if (tempValue !== defaultValue) {
              setChanges(Number(tempValue));
            }
          }}
          listRender={
            <CustomColorsList
              items={items}
              isDisabled={isDisabled}
              selectedValue={selectedValue}
              tempValue={Number(tempValue)}
              onChange={option => {
                setTempValue(option.currentTarget.getAttribute('data-id')!);
              }}
            />
          }
        />
      )}
    </>
  );
};

export default CustomLeaseSelect;
