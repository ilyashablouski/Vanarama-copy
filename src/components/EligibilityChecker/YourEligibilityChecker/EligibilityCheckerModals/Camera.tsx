import Button from '@vanarama/uibook/lib/components/atoms/button';
import CameraSharp from '@vanarama/uibook/lib/assets/icons/CameraSharp';
import React, { FC } from 'react';
import Webcam from 'react-webcam';
import { ICamera } from './interface';

const Camera: FC<ICamera> = ({
  webcamRef,
  handleOnUserMedia,
  onClickCapture,
}) => {
  const videoConstraints = {
    facingMode: 'user',
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        onUserMedia={handleOnUserMedia}
        onUserMediaError={handleOnUserMedia}
        videoConstraints={videoConstraints}
      />
      <div className="-justify-content-row">
        <Button
          color="teal"
          onClick={onClickCapture}
          icon={<CameraSharp />}
          iconColor="white"
          iconPosition="after"
          dataTestId="capture"
          round
        />
      </div>
    </>
  );
};

export default Camera;
