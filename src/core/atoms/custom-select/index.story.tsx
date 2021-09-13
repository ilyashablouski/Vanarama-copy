import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../../generated/GetTrimAndColor';

import { atomicDir } from '../../../helpers/atomicDirUtils';
import CustomSelect from '.';

storiesOf(`${atomicDir(base)}/CustomSelect`, module).add('Default', () => {
  const customSelect = (
    defaultValue: string,
    setChanges: Dispatch<SetStateAction<number | null>>,
    items: (ITrimList | IColourList | null)[] | null,
    placeholder: string,
    isDisabled: boolean,
    key: string,
  ) => (
    <CustomSelect
      radioName={key}
      isDisabled={isDisabled}
      label={
        items?.find(item => `${item?.optionId}` === defaultValue)?.label ??
        placeholder
      }
      selectedValue={
        items?.some(item => `${item?.optionId}` === defaultValue)
          ? defaultValue
          : ''
      }
      placeholder={placeholder}
      className="-fullwidth"
      onChange={option => {
        setChanges(+option.currentTarget.getAttribute('data-id')!);
      }}
      optionList={items}
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
        null,
        'Select Paint Colour',
        false,
        'keyForCustomSelect',
      )}
    </div>
  );
});
