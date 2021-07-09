import React, { useMemo } from 'react';
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
  const type = multiSelect ? 'checkbox' : 'radio';
  const resultSelectedValues = useMemo(() => selectedValues ?? [], [
    selectedValues,
  ]);

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
    <div className={cx('choice-boxes -v2', className, `-${color}`)}>
      {values.map(value => {
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
              className="choice-input"
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
