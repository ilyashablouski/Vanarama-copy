import React, { Dispatch, SetStateAction } from 'react';
import Drawer from 'core/molecules/drawer/Drawer';
import * as toast from 'core/atoms/toast/Toast';
import dynamic from 'next/dynamic';
import Skeleton from '../../../../components/Skeleton';
import { ISelectedVehicle } from '../interfaces';
import { useOpportunityCreation } from '../../../GoldrushFormContainer/gql';
import {
  OpportunitySubtypeEnum,
  OpportunityTypeEnum,
} from '../../../../../generated/globalTypes';
import DEFAULT_DERANGED_FORM_VALUE from '../constants';
import ModalFormSuccessMessage from './ModalFormSuccessMessage';
import { IGoldrushFromValues } from '../../../../components/GoldrushForm/interfaces';
import ErrorMessages from '../../../../models/enum/ErrorMessages';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});
const GoldrushForm = dynamic(
  () => import('../../../../components/GoldrushForm'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IDerangedModalForm {
  isShowDrawer: boolean;
  setIsShowDrawer: Dispatch<SetStateAction<boolean>>;
  isFormSend: boolean;
  setIsFormSend: Dispatch<SetStateAction<boolean>>;
  selectedVehicle: ISelectedVehicle;
  setSelectedVehicle: Dispatch<SetStateAction<ISelectedVehicle>>;
}

const DerangedModalForm: React.FC<IDerangedModalForm> = ({
  isFormSend,
  setIsFormSend,
  isShowDrawer,
  setIsShowDrawer,
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => setIsFormSend(true),
    error => {
      if (error.networkError || error.message) {
        toast.error(ErrorMessages.requestIssue, error.message || '');
      }
    },
  );
  const onSubmit = (values: IGoldrushFromValues) => {
    createOpportunity({
      variables: {
        email: values.email,
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        privacyPolicy: Boolean(values.privacyPolicy),
        termsAndConditions: Boolean(values.termsAndCons),
        opportunityType: OpportunityTypeEnum.CALLBACK,
        opportunitySubtype: OpportunitySubtypeEnum.DERANGED,
        communicationsConsent: Boolean(values.consent),
        capId: selectedVehicle.conversionId,
      },
    });
  };

  const onCloseDrawer = () => {
    if (isFormSend) {
      setSelectedVehicle(DEFAULT_DERANGED_FORM_VALUE);
    }
    setIsFormSend(false);
    setIsShowDrawer(false);
  };

  return (
    <Drawer
      onCloseDrawer={onCloseDrawer}
      isShowDrawer={isShowDrawer}
      title="Please Fill In Your Details"
      renderContent={
        <div className="drawer__container">
          <Text className="drawer__subtitle">
            We&apos;ll be in touch within 1-2 business hour
          </Text>
          <Image
            src={selectedVehicle.imageSrc}
            size="expand"
            alt="Deranged Image"
            plain
          />
          <Text className="heading drawer__brand" size="regular" color="black">
            {selectedVehicle.title}
          </Text>
          <Text
            className="heading drawer__description"
            color="dark"
            size="xsmall"
          >
            {selectedVehicle.description}
          </Text>
          {!isFormSend ? (
            <GoldrushForm
              onSubmit={values => onSubmit(values)}
              isSubmitting={loading}
              callBack
              isLabelsShown={{
                fullName: false,
                email: false,
                phoneNumber: false,
              }}
              isPlaceholdersShown={{
                fullName: true,
                email: true,
                phoneNumber: true,
              }}
            />
          ) : (
            <ModalFormSuccessMessage />
          )}
        </div>
      }
    />
  );
};

export default React.memo(DerangedModalForm);
