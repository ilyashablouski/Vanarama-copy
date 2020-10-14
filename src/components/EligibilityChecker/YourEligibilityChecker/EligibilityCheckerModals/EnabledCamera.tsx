import Text from '@vanarama/uibook/lib/components/atoms/text';
import React, { FC } from 'react';
import { IEnabledCamera } from './interface';

const EnabledCamera: FC<IEnabledCamera> = ({ onCloseModal }) => {
  return (
    <div>
      <Text color="darker">
        Your camera is not enabled. Please
        <span
          className="text -regular -teal"
          onClick={onCloseModal}
          aria-hidden="true"
        >
          {' '}
          fill in the form manually
        </span>
      </Text>
    </div>
  );
};

export default EnabledCamera;
