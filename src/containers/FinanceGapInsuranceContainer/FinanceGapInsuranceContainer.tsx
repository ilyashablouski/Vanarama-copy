import { useState } from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
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
          onSubmit={(values: IValues) => {
            createOppurtunity({
              variables: {
                email: values.email,
                phoneNumber: values.phoneNumber,
                fullName: values.fullName,
                postcode: values.postcode,
                marketingPreference: true,
                opportunityType: OpportunityTypeEnum.INSURANCE,
                vehicleType: VehicleTypeEnum.LCV,
                termsAndConditions: true,
              },
            });
          }}
        />
      )}
      <hr className="-fullwidth" />
      {rowText && (
        <InsuranceTypeSection
          {...rowText}
          link1={featured1?.link}
          link2={featured2?.link}
        />
      )}
    </>
  );
};

export default FinanceGapInsurancePageContainer;
