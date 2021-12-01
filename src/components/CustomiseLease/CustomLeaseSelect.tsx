import React, { Dispatch, SetStateAction, useCallback } from 'react';
import CustomSelectInput from 'core/molecules/custom-mobile-select/CustomSelectInput';
import CustomColorsList from 'core/atoms/custom-select/components/CustomColorsList';
import CustomSelect from 'core/atoms/custom-select/CustomSelect';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { IOptionsList } from '../../types/detailsPage';
import { Nullable, Nullish } from '../../types/common';

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
  setIsHotOffer?: Dispatch<SetStateAction<Nullish<boolean>>>;
  setIsFactoryOrder?: Dispatch<SetStateAction<boolean | undefined>>;
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

  const handleChange = useCallback(
    (isOffer: boolean, isFactoryOrder: boolean) => {
      setIsHotOffer?.(isOffer);
      setIsFactoryOrder?.(isFactoryOrder);
    },
    [setIsFactoryOrder, setIsHotOffer],
  );

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
          handleChange={(optionId, isOffer, isFactoryOrder) => {
            setChanges(optionId);
            handleChange(isOffer, isFactoryOrder);
          }}
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
              handleChange={(optionId, isOffer, isFactoryOrder) => {
                setTempValue(`${optionId}`);
                handleChange(isOffer, isFactoryOrder);
              }}
            />
          }
        />
      )}
    </>
  );
};

export default CustomLeaseSelect;
