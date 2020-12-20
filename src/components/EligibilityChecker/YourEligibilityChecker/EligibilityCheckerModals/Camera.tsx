import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Webcam from 'react-webcam';
import { ICamera } from './interface';
import { useMobileViewport } from '../../../../hooks/useMediaQuery';
import Skeleton from '../../../Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const CameraSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/CameraSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);

const Camera: FC<ICamera> = ({
  webcamRef,
  handleOnUserMedia,
  onClickCapture,
}) => {
  const isMobile = useMobileViewport();

  const videoConstraints = {
    facingMode: isMobile ? { exact: 'environment' } : 'user',
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
