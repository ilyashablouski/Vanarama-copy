import { useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import CameraSharp from '@vanarama/uibook/lib/assets/icons/CameraSharp';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useState } from 'react';
import validationSchema from './YourEligibilityChecker.validation';
import {
  IYourEligiblityCheckerValues,
  IProps,
  IDrivingLicence,
} from './interface';
import FCWithFragments from '../../../utils/FCWithFragments';
import { responseBlinkIdToInitialFormValues } from './mappers';
import EligibilityCheckerForm from './EligibilityCheckerForm';
import NotificationCamera from './EligibilityCheckerModals/NotificationCamera';
import PhotoPreview from './EligibilityCheckerModals/PhotoPreview';
import Camera from './EligibilityCheckerModals/Camera';
import AccessCamera from './EligibilityCheckerModals/AccessCamera';

const YourEligibilityChecker: FCWithFragments<IProps> = ({ submit }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [data, setImageData] = useState<any>();
  const [camera, toggleCamera] = useState(false);
  const [notificationCamera, toggleNotificationCamera] = useState('');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const defaultValues = {
    firstName: '',
    lastName: '',
    addressFinder: undefined,
    promotions: false,
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
  };
  const {
    errors,
    handleSubmit,
    register,
    triggerValidation,
    watch,
    formState,
    control,
    reset,
  } = useForm<IYourEligiblityCheckerValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues,
  });

  const endpoint = 'https://microblink-secure.motorama.com';

  const webcamRef = React.createRef<any>();

  const fetchData = () => {
    const url = `${endpoint}/recognize/execute`;

    setLoadingData(true);
    setImgSrc(null);
    toggleCamera(false);
    reset(defaultValues);

    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }),
      );
      reject(Error());
    });
  };

  const onCloseModal = () => {
    setImgSrc(null);
    toggleCamera(false);
    setIsModalShowing(false);
    toggleNotificationCamera('');
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    toggleCamera(false);
    setImgSrc(imageSrc);

    setImageData({
      recognizerType: 'UK_DL_FRONT',
      detectGlare: false,
      exportImages: false,
      exportFaceImage: false,
      exportFullDocumentImage: false,
      // imageBase64: imageSrc,
      imageURL:
        'https://storage.googleapis.com/microblink-data-public/microblink-api/test-set/blinkid/UK_DL_FRONT/UK_DL_FRONT_specimen.jpg',
      imageBase64: 'imageURL has priority!',
    });
  }, [webcamRef]);

  const handleOnUserMedia = () => {
    if (!webcamRef.current.stream) {
      toggleNotificationCamera('Your camera is not enabled.');
    }
  };

  if (loadingData) {
    return <Loading size="large" />;
  }

  return (
    <>
      <div className="form -mt-400">
        <Text color="darker" size="lead">
          Scan your driving license to quickly provide us with your information.
        </Text>
        <Button
          type="submit"
          label="Scan Driving License"
          color="primary"
          iconColor="white"
          iconPosition="before"
          icon={<CameraSharp />}
          dataTestId="scan-driving-license"
          onClick={() => setIsModalShowing(true)}
        />
        <Text color="dark" size="regular">
          Or you can enter your details manually:
        </Text>
      </div>
      <EligibilityCheckerForm
        submit={submit}
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        triggerValidation={triggerValidation}
        watch={watch}
        formState={formState}
        control={control}
      />
      {isModalShowing && (
        <Modal
          className="-mt-000"
          title={notificationCamera ? 'Notification' : ''}
          text={
            !(camera || imgSrc || loadingData)
              ? 'Would like to access to the camera?'
              : ''
          }
          show={isModalShowing}
          onRequestClose={() => onCloseModal()}
        >
          {!(camera || imgSrc || loadingData || notificationCamera) && (
            <AccessCamera
              onClickYes={() => toggleCamera(true)}
              onClickNo={() => onCloseModal()}
            />
          )}
          {!notificationCamera && camera && (
            <Camera
              handleOnUserMedia={handleOnUserMedia}
              onClickCapture={capture}
              webcamRef={webcamRef}
            />
          )}
          {imgSrc && (
            <PhotoPreview
              imgSrc={imgSrc}
              onClickSave={() => {
                fetchData()
                  .then((response: any) => response.json())
                  .then(response => {
                    setLoadingData(false);
                    if (response.data.result) {
                      setIsModalShowing(false);
                      const drivingLicence: IDrivingLicence =
                        response.data.result;
                      reset(responseBlinkIdToInitialFormValues(drivingLicence));
                    } else {
                      toggleNotificationCamera('Something went wrong.');
                    }
                  });
              }}
              onClickRetake={() => {
                setImgSrc(null);
                toggleCamera(true);
              }}
            />
          )}
          {!!notificationCamera && (
            <NotificationCamera
              onCloseModal={onCloseModal}
              text={notificationCamera}
            />
          )}
        </Modal>
      )}
    </>
  );
};

YourEligibilityChecker.fragments = {
  creditChecker: gql`
    fragment QuickCreditCheckerEligibility on QuickCreditCheckerType {
      __typename
      score
      status
      person {
        __typename
        uuid
        firstName
        lastName
        dateOfBirth
        emailAddresses {
          __typename
          uuid
          primary
          value
        }
        addresses {
          __typename
          serviceId
          city
          lineOne
          lineTwo
          postcode
        }
      }
    }
  `,
};
export default YourEligibilityChecker;
