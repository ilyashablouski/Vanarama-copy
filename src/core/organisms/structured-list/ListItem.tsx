import React, { FC, ChangeEvent, useState } from 'react';
import cx from 'classnames';

import Select from '../../atoms/select';
import TextInput from '../../atoms/textinput';

import { IListItemProps } from './interfaces';

const ListItem: FC<IListItemProps> = props => {
  const {
    wrap,
    testId,
    onChange,
    editing,
    selectEdit,
    textEdit,
    label,
    value,
    name = '',
    placeholder,
    options,
    dataTestId,
    isOrange,
    dataAbTestId,
    labelElementAttributes,
    valueElementAttributes,
    dataUiTestId,
  } = props;

  const [input, setInput] = useState(value);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setInput(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const renderDefault = () => (
    <div
      className="structured-list-td"
      data-testid={dataTestId}
      data-abtestid={valueElementAttributes?.dataAbTestId}
    >
      {typeof input === 'string'
        ? input
        : input.map((item, index) => (
            <>
              {item}
              {input.length !== index + 1 && <br />}
            </>
          ))}
    </div>
  );

  const renderTextInput = () => (
    <TextInput
      dataTestId={dataTestId}
      value={input as string | string[]}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );

  const renderSelect = () => (
    <Select
      dataTestId={dataTestId}
      name={name}
      value={input as string}
      onChange={handleChange}
    >
      {options?.favourites.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
      {options?.data.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );

  const renderItem = () => {
    if (editing) {
      if (selectEdit) {
        return renderSelect();
      }

      if (textEdit) {
        return renderTextInput();
      }
    }

    return renderDefault();
  };

  return value !== '-' || editing || textEdit ? (
    <div
      className={cx('structured-list-row', { orange: isOrange })}
      data-abtestid={dataAbTestId}
    >
      <div
        className={cx('structured-list-td', {
          'structured-list-content--nowrap': !wrap,
        })}
        data-testid={`data_id-${testId}-${label}`}
        data-abtestid={labelElementAttributes?.dataAbTestId}
        data-uitestid={dataUiTestId ? `${dataUiTestId}_${label}` : undefined}
      >
        {label}
      </div>
      {renderItem()}
    </div>
  ) : null;
};

export default ListItem;
