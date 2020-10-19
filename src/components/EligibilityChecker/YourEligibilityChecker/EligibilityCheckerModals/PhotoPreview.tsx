import Button from '@vanarama/uibook/lib/components/atoms/button';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import React, { FC } from 'react';
import { IPhotoPreview } from './interface';

const PhotoPreview: FC<IPhotoPreview> = ({
  onClickSave,
  onClickRetake,
  imgSrc,
}) => {
  return (
    <>
      <Image src={imgSrc} />
      <div className="choiceboxes -cols-2 -teal -pt-500">
        <Button
          onClick={onClickSave}
          label="Save"
          withoutDefaultClass
          className="choicebox -active"
          size="small"
        />
        <Button
          onClick={onClickRetake}
          label="Retake"
          withoutDefaultClass
          className="choicebox -active"
          size="small"
        />
      </div>
    </>
  );
};

export default PhotoPreview;
