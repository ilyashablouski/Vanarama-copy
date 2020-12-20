import React, { FC, ChangeEvent, useState } from 'react';

import Select from '../../atoms/select';
import TextInput from '../../atoms/textinput';

import { IListItemProps } from './interfaces';

const ListItem: FC<IListItemProps> = props => {
  const {
    testId,
    selectEdit,
    textEdit,
    label,
    value,
    name = '',
    placeholder,
    options,
    editing,
    onChange,
    dataTestId,
  } = props;

  const [input, setInput] = useState(value);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setInput(e.target.value);
    if (onChange) onChange(e);
  };

  const renderDefault = () => (
    <div className="structured-list-td" data-testid={dataTestId}>
      {typeof input === 'string'
        ? input
        : input.map(item => (
            <>
              {item}
              <br />
            </>
          ))}
    </div>
  );

  const renderTextInput = () => (
    <TextInput
      dataTestId={dataTestId}
      value={input}
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

  return (
    <div className="structured-list-row ">
      <div
        className="structured-list-td structured-list-content--nowrap"
        data-testid={`data_id-${testId}-${label}`}
      >
        {label}
      </div>
      {renderItem()}
    </div>
  );
};

export default ListItem;
