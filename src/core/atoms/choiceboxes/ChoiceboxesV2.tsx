import React from 'react';
import cx from 'classnames';

import { IChoiceBoxesV2Props } from './interfaces';

function ChoiceBoxesV2({
  className,
  color = 'teal',
  values,
  selectedValues,
  multiSelect,
  onChange,
}: IChoiceBoxesV2Props) {
  const resultSelectedValues = selectedValues ?? [];

  function handleSelectChange(value: string, checked: boolean) {
    onChange(!checked ? [value] : []);
  }

  function handleMultiselectChange(value: string, checked: boolean) {
    const resultValues = !checked
      ? [...resultSelectedValues, value]
      : resultSelectedValues.filter(selectedValue => {
          return selectedValue !== value;
        });

    onChange(resultValues);
  }

  return (
    <div className={cx('choice-boxes', className, `-${color}`)}>
      {values.map(value => {
        const type = multiSelect ? 'checkbox' : 'radio';
        const checked = resultSelectedValues.includes(value);
        const handleChange = multiSelect
          ? () => handleMultiselectChange(value, checked)
          : () => handleSelectChange(value, checked);

        return (
          <React.Fragment key={value}>
            <input
              hidden
              id={value}
              type={type}
              value={value}
              name="choice-box"
              checked={checked}
              onChange={handleChange}
            />
            <label
              htmlFor={value}
              className={cx('choice-box', {
                '-active': checked,
              })}
            >
              <span>{value}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ChoiceBoxesV2;
