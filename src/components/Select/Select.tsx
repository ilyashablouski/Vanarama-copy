import React, { FC, memo, ChangeEvent } from 'react';
import cx from 'classnames';

import '@vanarama/uibook/packages/ui-components/src/css/atoms/Select/Select.css';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';

interface Props {
  name: string;
  id?: string;
  classes?: string;
  values: Object[];
  onChange(e: ChangeEvent<HTMLElement>): void;
}

const defaultProps: Props = {
  id: 'select',
  name: null,
  onChange: () => false,
  values: [],
};

const Select: FC<Props> = memo((props) => {
  const { id, classes, values, onChange, name } = props;

  // Option Group.
  const optionGroup = (entry, key) => (
    <optgroup key={key} className="SelectItemGroup" label={entry.label}>
      {entry.values.map((entry, key) => {
        return option(entry, key);
      })}
    </optgroup>
  );

  // Option.
  const option = ({ value, label }, key) => (
    <option key={key} className="SelectItem" value={value}>
      {label || value}
    </option>
  );

  return (
    <div
      id={`${id}-wrapper`}
      className={cx('Select', {
        [`${classes}`]: classes,
      })}
    >
      <select
        name={name}
        id={id}
        className="Select__native"
        onChange={onChange}
      >
        {values.map((entry, key) => {
          if ('values' in entry) return optionGroup(entry, key);
          else if ('value' in entry) return option(entry, key);
          else return null;
        })}
      </select>
      <IosArrowDown className="Icon" />
    </div>
  );
});

Select.defaultProps = defaultProps;

export default Select;
