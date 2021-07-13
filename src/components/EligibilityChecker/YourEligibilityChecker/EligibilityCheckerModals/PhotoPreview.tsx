import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { IPhotoPreview } from './interface';
import Skeleton from '../../../Skeleton';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={1} />,
});

const PhotoPreview: FC<IPhotoPreview> = ({
  onClickSave,
  onClickRetake,
  imgSrc,
}) => {
  return (
    <>
      <Image src={imgSrc} />
      <div className="choice-boxes -cols-2 -teal -pt-500">
        <Button
          onClick={onClickSave}
          label="Save"
          withoutDefaultClass
          className="choice-box -active"
          size="small"
        />
        <Button
          onClick={onClickRetake}
          label="Retake"
          withoutDefaultClass
          className="choice-box -active"
          size="small"
        />
      </div>
    </>
  );
};

export default PhotoPreview;
