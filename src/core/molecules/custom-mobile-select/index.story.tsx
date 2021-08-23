import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import CustomSelectInput from 'core/molecules/custom-mobile-select/CustomSelectInput';
import { useRef } from '@storybook/addons';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/CustomSelectInput`, module).add('Default', () => {
  const ref = useRef(null) as any;

  return (
    <div
      style={{
        width: 360,
        height: 600,
        backgroundColor: '#f5f5f5',
      }}
    >
      <div ref={ref} id="testModal" />
      <CustomSelectInput
        listRender={() => <></>}
        title="Select value:"
        label="Value"
        modalElement={ref.current}
      />
    </div>
  );
});
