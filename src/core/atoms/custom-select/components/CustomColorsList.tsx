import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'core/atoms/icon';
import FormGroup from 'core/molecules/formgroup/Formgroup';
import Radio from 'core/atoms/radio';
import dynamic from 'next/dynamic';
import CustomColorItem from 'core/atoms/custom-select/components/CustomColorItem';
import { IOptionsList } from '../../../../types/detailsPage';

const Flame = dynamic(() => import('core/assets/icons/Flame'));

interface IProps {
  items: IOptionsList[];
  setShowOptionList?: Dispatch<SetStateAction<boolean>>;
  selectedValue?: Nullable<string>;
  radioName?: string;
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  tempValue?: number;
}

const CustomColorsList: React.FC<IProps> = ({
  items,
  setShowOptionList,
  selectedValue,
  radioName = '',
  isDisabled,
  onChange,
  tempValue,
}) => {
  const checkValue = (value?: Nullable<number>) => {
    return tempValue ? value === tempValue : value === Number(selectedValue);
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    onChange((event as unknown) as React.ChangeEvent<HTMLSelectElement>);
    if (setShowOptionList) {
      setShowOptionList(false);
    }
  };

  return (
    <ul className="select-options select-options__mobile">
      {items.map(({ options, leadTime }) => (
        <div className="option__content" key={leadTime}>
          <div className="option__title-content">
            {options && options[0].hotOffer ? (
              <>
                <Icon
                  icon={<Flame />}
                  color="orange"
                  size="regular"
                  className="option__icon"
                />
                <span className="option__title option__title-offer">
                  HOT OFFER
                </span>
              </>
            ) : (
              <>
                <span className="option__title option__title-stock">
                  IN STOCK
                </span>
              </>
            )}

            <span className="option__title">{leadTime}</span>
          </div>
          {options?.map((option, index) => (
            <li
              data-name={option.label ?? ''}
              data-id={option.optionId ?? 0}
              onClick={handleOptionClick}
              key={option.optionId ?? index}
            >
              {option.hex ? (
                <CustomColorItem
                  option={option}
                  checked={checkValue(option.optionId)}
                />
              ) : (
                <FormGroup>
                  <Radio
                    className="custom-select-option"
                    name={`customSelect${radioName}`}
                    id={`${option.optionId ?? 0}`}
                    label={option.label ?? ''}
                    value={`${option.optionId ?? 0}`}
                    onChange={() => {}}
                    checked={checkValue(option.optionId)}
                    disabled={isDisabled}
                  />
                </FormGroup>
              )}
            </li>
          ))}
        </div>
      ))}
    </ul>
  );
};

export default CustomColorsList;
