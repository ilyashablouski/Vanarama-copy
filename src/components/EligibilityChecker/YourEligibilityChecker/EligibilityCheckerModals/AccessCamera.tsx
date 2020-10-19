import Button from '@vanarama/uibook/lib/components/atoms/button';
import React, { FC } from 'react';
import { IAccessCamera } from './interface';

const AccessCamera: FC<IAccessCamera> = ({ onClickYes, onClickNo }) => {
  return (
    <div className="choiceboxes -cols-2 -teal">
      <Button
        onClick={onClickYes}
        label="Yes"
        withoutDefaultClass
        className="choicebox -active"
        size="small"
      />
      <Button
        onClick={onClickNo}
        label="No"
        withoutDefaultClass
        className="choicebox -active"
        size="small"
      />
    </div>
  );
};

export default AccessCamera;
