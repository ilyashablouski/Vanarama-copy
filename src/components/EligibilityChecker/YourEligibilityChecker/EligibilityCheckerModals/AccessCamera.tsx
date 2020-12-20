import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { IAccessCamera } from './interface';
import Skeleton from '../../../Skeleton';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

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
