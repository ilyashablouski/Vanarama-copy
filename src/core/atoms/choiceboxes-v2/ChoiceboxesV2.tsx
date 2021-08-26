import React, { useMemo } from 'react';
import cx from 'classnames';

import { IChoiceBoxesV2Props } from './interfaces';

function ChoiceBoxesV2({
  className,
  boxClassName,
  labelClassName,
  color = 'teal',
  name = 'choice-box',
  values,
  selectedValues,
  multiSelect,
  onChange,
  disabled,
  idPrefix = '',
  renderValuesFunction,
}: IChoiceBoxesV2Props) {
  const type = multiSelect ? 'checkbox' : 'radio';
  const resultSelectedValues = useMemo(() => selectedValues ?? [], [
    selectedValues,
  ]);

  function handleSelectChange(value: string | number, checked: boolean) {
    onChange(checked ? [value] : []);
  }

  function handleMultiselectChange(value: string | number, checked: boolean) {
    const resultValues = checked
      ? [...resultSelectedValues, value]
      : resultSelectedValues.filter(selectedValue => {
          return selectedValue !== value;
        });

    onChange(resultValues);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: inputValue, checked } = e.target;
    const value =
      typeof values?.[0] === 'number' ? parseInt(inputValue, 10) : inputValue;
    if (multiSelect) {
      handleMultiselectChange(value, checked);
    } else {
      handleSelectChange(value, checked);
    }
  }

  return (
    <div className={cx('choice-boxes-v2', className, `-${color}`)}>
      {values?.map(value => {
        const checked = resultSelectedValues.includes(value);

        return (
          <React.Fragment key={value}>
            <input
              id={`${idPrefix}${value}`}
              type={type}
              name={name}
              value={value}
              className="choice-input visually-hidden"
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
            />
            <label
              htmlFor={`${idPrefix}${value}`}
              className={cx('choice-box', boxClassName, {
                '-active': checked,
              })}
            >
              <span className={cx('choice-label', labelClassName)}>
                {renderValuesFunction ? renderValuesFunction(value) : value}
              </span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ChoiceBoxesV2;
