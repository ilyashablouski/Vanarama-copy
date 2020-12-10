import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { IPhotoPreview } from './interface';
import Skeleton from '../../../Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
