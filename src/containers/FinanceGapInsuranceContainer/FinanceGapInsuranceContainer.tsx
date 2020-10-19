import { useState } from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Router from 'next/router';
import GoldrushForm from '../../components/GoldrushForm/GoldrushForm';
import { IGoldrushFromValues } from '../../components/GoldrushForm/interfaces';
import InsuranceHeroSection from '../InsurancePageContainer/sections/InsuranceHeroSection';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import InsuranceTypeSection from './sections/InsuranceTypeSection';
import InsuranceFormSection from './sections/InsuranceFormSection';
import { useOpportunityCreation } from '../GoldrushFormContainer/gql';
import { OpportunityTypeEnum } from '../../../generated/globalTypes';
import { pushInsuranceEventDataLayer } from '../../utils/dataLayerHelpers';

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

const toThankYouPage = () => {
  Router.push(`thank-you`);
};

const FinanceGapInsurancePageContainer = ({ sections }: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  const [showModal, setShowModal] = useState(false);

  const [createOppurtunity, { loading }] = useOpportunityCreation(
    () => toThankYouPage(),
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
          onSubmit={(values: IGoldrushFromValues) => {
            pushInsuranceEventDataLayer(Router);
            createOppurtunity({
              variables: {
                email: values.email,
                phoneNumber: values.phoneNumber,
                fullName: values.fullName,
                postcode: values.postcode,
                opportunityType: OpportunityTypeEnum.INSURANCE,
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
            setShowModal(false);
          }}
        >
          <GoldrushForm
            callBack={false}
            className="form-insurance"
            isSubmitting={loading}
            isPostcodeVisible
            termsAndConditionsId="modal"
            isTextInVisible
            noTermsAndConditions
            onSubmit={(values: IGoldrushFromValues) => {
              pushInsuranceEventDataLayer(Router);
              createOppurtunity({
                variables: {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  fullName: values.fullName,
                  postcode: values.postcode,
                  opportunityType: OpportunityTypeEnum.INSURANCE,
                },
              });
            }}
          />
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
