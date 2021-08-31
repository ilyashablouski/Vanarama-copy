import dynamic from 'next/dynamic';
import { FC, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { ICamera } from './interface';
import Skeleton from '../../../Skeleton';
import { isAndroid, isChromeBrowser } from '../../../../utils/deviceType';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const CameraSharp = dynamic(() => import('core/assets/icons/CameraSharp'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});

const Camera: FC<ICamera> = ({
  webcamRef,
  handleOnUserMedia,
  onClickCapture,
}) => {
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(
        mediaDevices.filter(
          ({ kind, label }) =>
            // try to find basic back camera on android device
            kind === 'videoinput' && /(?=.*back)(?=.*0).*/.test(label),
        ),
      ),
    [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        onUserMedia={() => {
          // android doesn't show labels to media device until we give permission to use camera
          if (isAndroid && isChromeBrowser && !devices[deviceIndex]?.label) {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
          }
          handleOnUserMedia();
        }}
        onUserMediaError={() => {
          if (deviceIndex < devices.length) {
            setDeviceIndex(prevState => prevState + 1);
            return;
          }
          handleOnUserMedia();
        }}
        // moving it to a variable will lead to issue on android devices
        videoConstraints={
          isAndroid && isChromeBrowser
            ? {
                deviceId:
                  isAndroid && isChromeBrowser
                    ? devices[deviceIndex]?.deviceId
                    : undefined,
              }
            : { facingMode: 'environment' }
        }
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
