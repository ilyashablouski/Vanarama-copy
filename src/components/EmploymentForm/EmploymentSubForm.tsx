import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmploymentSubFormDropDownData } from '../../../generated/EmploymentSubFormDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import CompanyAddressInput from './CompanyAddressInput';
import CompanyNameInput from './CompanyNameInput';
import EmployedSinceInput from './EmployedSinceInput';
import EmploymentStatusInput from './EmploymentStatusInput';
import EmploymentTypeRadioGroup from './EmploymentTypeRadioGroup';
import GrossIncomeInput from './GrossIncomeInput';
import { IEmploymentFormValues } from './interfaces';
import JobTitleInput from './JobTitleInput';
import WorkPhoneNumberInput from './WorkPhoneNumberInput';

interface IProps {
  dropDownData: EmploymentSubFormDropDownData;
  index: number;
}

const EmploymentSubForm: FCWithFragments<IProps> = ({
  dropDownData,
  index,
}) => {
  const { watch } = useFormContext<IEmploymentFormValues>();

  // This is a hack to ensure that `status` is not cleared when an entry is removed
  // see: https://github.com/react-hook-form/react-hook-form/issues/1336
  const [status, setStatus] = useState(() => watch('history')?.[index]?.status);
  useEffect(() => {
    setStatus(watch('history')?.[index]?.status);
  }, [index, watch]);

  return (
    <Tile>
      <EmploymentStatusInput dropDownData={dropDownData} index={index} />
      {(status === 'Employed' || status === 'Self employed') && (
        <>
          <EmploymentTypeRadioGroup index={index} />
          <JobTitleInput index={index} />
          <CompanyNameInput index={index} />
          <WorkPhoneNumberInput index={index} />
          <CompanyAddressInput index={index} />
          <GrossIncomeInput index={index} />
        </>
      )}
      {status && <EmployedSinceInput index={index} />}
    </Tile>
  );
};

EmploymentSubForm.fragments = {
  dropDownData: gql`
    fragment EmploymentSubFormDropDownData on DropDownType {
      __typename
      employmentStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default EmploymentSubForm;
