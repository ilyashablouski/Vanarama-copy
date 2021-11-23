import React, { Dispatch, SetStateAction } from 'react';
import * as toast from 'core/atoms/toast/Toast';
import dynamic from 'next/dynamic';
import Skeleton from '../../../../components/Skeleton';
import { ISelectedVehicle } from '../interfaces';
import { useOpportunityCreation } from '../../../GoldrushFormContainer/gql';
import {
  OpportunitySubtypeEnum,
  OpportunityTypeEnum,
} from '../../../../../generated/globalTypes';
import ModalFormSuccessMessage from './ModalFormSuccessMessage';
import { IGoldrushFromValues } from '../../../../components/GoldrushForm/interfaces';
import ErrorMessages from '../../../../models/enum/ErrorMessages';
import {
  DERANGED_FORM_LABELS_VALUES,
  DERANGED_FORM_PLACEHOLDERS_VALUES,
} from '../constants';

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

interface IDerangedForm {
  isFormSend: boolean;
  setIsFormSend: Dispatch<SetStateAction<boolean>>;
  selectedVehicle: ISelectedVehicle;
}

const DerangedForm: React.FC<IDerangedForm> = ({
  isFormSend,
  setIsFormSend,
  selectedVehicle,
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
        capId: selectedVehicle.capId,
        conversionId: selectedVehicle.conversionId,
      },
    });
  };

  return (
    <div className="drawer__container">
      <Text className="drawer__subtitle">
        We&apos;ll be in touch within 1-2 business hours
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
      <Text className="heading drawer__description" color="dark" size="xsmall">
        {selectedVehicle.description}
      </Text>
      {!isFormSend ? (
        <>
          <GoldrushForm
            onSubmit={values => onSubmit(values)}
            isSubmitting={loading}
            callBack
            isLabelsShown={DERANGED_FORM_LABELS_VALUES}
            isPlaceholdersShown={DERANGED_FORM_PLACEHOLDERS_VALUES}
          />
          <Text className="drawer__text-footer" size="xsmall" color="dark">
            Price is subject to change based on your lease term
          </Text>
        </>
      ) : (
        <ModalFormSuccessMessage />
      )}
    </div>
  );
};

export default React.memo(DerangedForm);
