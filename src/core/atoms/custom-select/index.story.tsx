import React, { Dispatch, SetStateAction, useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import CustomSelect from '.';
import { IOptionsList } from '../../../types/detailsPage';
import { getOptionFromList } from '../../../utils/helpers';
import { Nullable } from '../../../types/common';

storiesOf(`${atomicDir(base)}/CustomSelect`, module).add('Default', () => {
  const customSelect = (
    defaultValue: string,
    setChanges: Dispatch<SetStateAction<number | null>>,
    items: Nullable<IOptionsList[]>,
    placeholder: string,
    isDisabled: boolean,
    key: string,
  ) => (
    <CustomSelect
      radioName={key}
      isDisabled={isDisabled}
      label={getOptionFromList(items, defaultValue)?.label ?? placeholder}
      selectedValue={
        `${getOptionFromList(items, defaultValue)?.optionId}` === defaultValue
          ? defaultValue
          : ''
      }
      placeholder={placeholder}
      className="-fullwidth"
      handleChange={optionId => {
        setChanges(optionId);
      }}
      items={items}
    />
  );

  const DEFAULT_COLOR = 1;
  const [, setColour] = useState<number | null>(DEFAULT_COLOR);

  return (
    <div
      style={{
        width: 360,
        height: 600,
      }}
    >
      {customSelect(
        'Default Color',
        setColour,
        [],
        'Select Paint Colour',
        false,
        'keyForCustomSelect',
      )}
    </div>
  );
});
