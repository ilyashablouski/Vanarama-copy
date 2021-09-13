import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import CustomSelectInput from 'core/molecules/custom-mobile-select/CustomSelectInput';
import Radio from 'core/atoms/radio';
import CustomSelect from 'core/atoms/custom-select';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';
import { Nullish } from '../../types/common';
import { useMobileViewport } from '../../hooks/useMediaQuery';

interface IProps {
  defaultValue: string;
  setChanges: Dispatch<SetStateAction<number | null>>;
  items: Nullish<(ITrimList | IColourList | null)[]>;
  placeholder: string;
  isDisabled: boolean;
  modalElement: HTMLDivElement;
  dataTestId: string;
}

const CustomLeaseSelect = ({
  defaultValue,
  setChanges,
  items,
  placeholder,
  isDisabled,
  modalElement,
  dataTestId,
}: IProps) => {
  const [tempValue, setTempValue] = useState<string>(defaultValue);
  const isDesktop = !useMobileViewport();

  const label = useMemo(
    () =>
      items?.find(item => `${item?.optionId}` === defaultValue)?.label ??
      placeholder,
    [items, defaultValue, placeholder],
  );
  const selectedValue = useMemo(
    () =>
      items?.find(item => `${item?.optionId}` === defaultValue)
        ? defaultValue
        : '',
    [items, defaultValue],
  );

  return (
    <>
      {isDesktop ? (
        <CustomSelect
          label={label}
          dataTestId={dataTestId}
          radioName={placeholder}
          isDisabled={isDisabled}
          selectedValue={selectedValue}
          placeholder={placeholder}
          className="-fullwidth"
          onChange={option => {
            setChanges(+option.currentTarget.getAttribute('data-id')!);
          }}
          optionList={items}
        />
      ) : (
        <CustomSelectInput
          dataTestId={dataTestId}
          label={label}
          title={placeholder}
          disabled={isDisabled}
          modalElement={modalElement}
          onCloseModal={() => {
            if (tempValue !== defaultValue) {
              setChanges(+tempValue);
            }
          }}
          listRender={
            <>
              {items?.map(item => (
                <Radio
                  key={item?.optionId || 0}
                  checked={`${item?.optionId}` === tempValue}
                  id={item?.label || ''}
                  value={`${item?.optionId || 0}`}
                  label={item?.label || ''}
                  onChange={option => {
                    setTempValue(option.currentTarget.value);
                  }}
                />
              ))}
            </>
          }
        />
      )}
    </>
  );
};

export default CustomLeaseSelect;
