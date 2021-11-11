import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'core/atoms/icon';
import CustomColorItem from 'core/atoms/custom-colors-select/components/CustomColorItem';
import FormGroup from 'core/molecules/formgroup/Formgroup';
import Radio from 'core/atoms/radio';
import { SelectOptionList } from 'core/atoms/custom-colors-select/interface';
import dynamic from 'next/dynamic';

const Flame = dynamic(() => import('core/assets/icons/Flame'));

interface IProps {
  selectedItemsList: (SelectOptionList | null)[][] | null;
  setShowOptionList?: Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  radioName?: string;
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  tempValue?: number;
}

const CustomColorsList: React.FC<IProps> = ({
  selectedItemsList,
  setShowOptionList,
  selectedValue,
  radioName = '',
  isDisabled,
  onChange,
  tempValue,
}) => {
  const checkValue = (value: number | null | undefined) => {
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
      {!!selectedItemsList &&
        selectedItemsList.map(
          optionsList =>
            optionsList[0] && (
              <div
                className="option__content"
                key={optionsList[0].optionId ?? 0}
              >
                <div className="option__title-content">
                  {optionsList[0].onOffer ? (
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
                  <span
                    key={optionsList[0].optionId ?? 0}
                    className="option__title"
                  >
                    {optionsList[0].leadTime || ''}
                  </span>
                </div>
                {optionsList?.map((option, index) => (
                  <li
                    data-name={option?.label ?? ''}
                    data-id={option?.optionId ?? 0}
                    onClick={handleOptionClick}
                    key={option?.optionId ?? index}
                  >
                    {option?.hex ? (
                      <CustomColorItem
                        option={option}
                        checked={checkValue(option?.optionId)}
                      />
                    ) : (
                      <FormGroup>
                        <Radio
                          className="custom-colors-select-option"
                          name={`customSelect${radioName}`}
                          id={`${option?.optionId ?? 0}`}
                          label={option?.label ?? ''}
                          value={`${option?.optionId ?? 0}`}
                          onChange={() => {}}
                          checked={checkValue(option?.optionId)}
                          disabled={isDisabled}
                        />
                      </FormGroup>
                    )}
                  </li>
                ))}
              </div>
            ),
        )}
    </ul>
  );
};

export default CustomColorsList;
