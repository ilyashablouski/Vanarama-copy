import { useState } from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import GoldrushForm from '../../components/GoldrushForm/GoldrushForm';
import { IGoldrushFromValues } from '../../components/GoldrushForm/interfaces';
import InsuranceHeroSection from '../InsurancePageContainer/sections/InsuranceHeroSection';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import InsuranceTypeSection from './sections/InsuranceTypeSection';
import InsuranceFormSection from './sections/InsuranceFormSection';
import { useOpportunityCreation } from '../GoldrushFormContainer/gql';
import {
  OpportunityTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';

interface IProps {
  sections: Section | null;
}

interface IValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  consent: boolean;
  termsAndCons: boolean;
}

export const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

const FinanceGapInsurancePageContainer = ({ sections }: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  const [isGratitudeVisible, toggleGratitude] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [createOppurtunity, { loading }] = useOpportunityCreation(
    () => toggleGratitude(true),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
    },
  );

  return (
    <>
      {hero && <InsuranceHeroSection {...hero} />}
      {leadText && <InsuranceTypeSection {...leadText} />}
      {featured1 && (
        <InsuranceFormSection
          {...featured1}
          isSubmitting={loading}
          isGratitudeVisible={isGratitudeVisible}
          onCompleted={() => {
            toggleGratitude(false);
          }}
          onSubmit={(values: IGoldrushFromValues) => {
            createOppurtunity({
              variables: {
                email: values.email,
                phoneNumber: values.phoneNumber,
                fullName: values.fullName,
                postcode: values.postcode,
                opportunityType: OpportunityTypeEnum.INSURANCE,
                vehicleType: VehicleTypeEnum.LCV,
                marketingPreference: Boolean(values.consent),
                termsAndConditions: Boolean(values.termsAndCons),
              },
            });
          }}
        />
      )}
      {showModal && (
        <Modal
          className="-mt-000 callBack"
          show
          onRequestClose={() => {
            toggleGratitude(false);
            setShowModal(false);
          }}
        >
          {isGratitudeVisible ? (
            <>
              <Heading size="regular" color="black">
                Thank you for submitting the form. We will be in touch shortly.
              </Heading>
              <Button
                className="-mt-600"
                dataTestId="goldrush-button_close"
                label="Close"
                size="lead"
                fill="solid"
                color="teal"
                onClick={() => {
                  toggleGratitude(false);
                  setShowModal(false);
                }}
              />
            </>
          ) : (
            <GoldrushForm
              callBack={false}
              isSubmitting={loading}
              isPostcodeVisible
              termsAndConditionsId="modal"
              isTextInVisible
              onSubmit={(values: IGoldrushFromValues) => {
                createOppurtunity({
                  variables: {
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    fullName: values.fullName,
                    postcode: values.postcode,
                    opportunityType: OpportunityTypeEnum.INSURANCE,
                    vehicleType: VehicleTypeEnum.LCV,
                    marketingPreference: Boolean(values.consent),
                    termsAndConditions: Boolean(values.termsAndCons),
                  },
                });
              }}
            />
          )}
        </Modal>
      )}
      <hr className="-fullwidth" />
      {rowText && (
        <InsuranceTypeSection
          showModal={() => setShowModal(true)}
          {...rowText}
          link1={featured1?.link}
          link2={featured2?.link}
        />
      )}
    </>
  );
};

export default FinanceGapInsurancePageContainer;
