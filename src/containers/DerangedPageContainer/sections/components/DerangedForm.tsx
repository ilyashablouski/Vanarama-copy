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

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
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
  dataUiTestId?: string;
}

const DerangedForm: React.FC<IDerangedForm> = ({
  isFormSend,
  setIsFormSend,
  selectedVehicle,
  dataUiTestId,
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
      <Text
        className="drawer__subtitle"
        dataUiTestId={dataUiTestId ? `${dataUiTestId}_subtitle` : undefined}
      >
        We&apos;ll be in touch within 1-2 business hours
      </Text>
      <ImageV2
        width={800}
        height={500}
        src={selectedVehicle.imageSrc}
        alt={selectedVehicle.title}
        size="expand"
        plain
      />
      <Text
        className="heading drawer__brand"
        size="regular"
        color="black"
        dataUiTestId={dataUiTestId ? `${dataUiTestId}_drawer-brand` : undefined}
      >
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
            isCallBackForm
            isLabelsShown={DERANGED_FORM_LABELS_VALUES}
            isPlaceholdersShown={DERANGED_FORM_PLACEHOLDERS_VALUES}
            dataUiTestId={dataUiTestId}
          />
          <Text
            className="drawer__text-footer"
            size="xsmall"
            color="dark"
            dataUiTestId={
              dataUiTestId ? `${dataUiTestId}_from-price-text` : undefined
            }
          >
            Price is subject to change based on your lease term
          </Text>
        </>
      ) : (
        <ModalFormSuccessMessage dataUiTestId={dataUiTestId} />
      )}
    </div>
  );
};

export default React.memo(DerangedForm);
