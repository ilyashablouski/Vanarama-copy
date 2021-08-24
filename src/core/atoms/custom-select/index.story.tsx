import React, { Dispatch, SetStateAction, useState } from 'react';
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
    items: (ITrimList | IColourList | null)[] | undefined | null,
    placeholder: string,
    isDisabled: boolean,
    key: string,
  ) => (
    <CustomSelect
      radioName={key}
      isDisabled={isDisabled}
      defaultValue={
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

  const color = 1;
  const [colour, setColour] = useState<number | null>(color);
  console.log(colour);

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
