import Select from '@vanarama/uibook/lib/components/atoms/select';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import React from 'react';
import { DirectorFieldsDropDownData } from '../../../generated/DirectorFieldsDropDownData';
import { GetDirectorDetailsQuery_companyOfficers_nodes as DirectorFieldsOfficer } from '../../../generated/GetDirectorDetailsQuery';
import DirectorFields from './DirectorFields';
import { DirectorDetailsFormValues } from './interfaces';

type Props = {
  dropdownData: DirectorFieldsDropDownData;
  officers: DirectorFieldsOfficer[];
};

export default function DirectorFieldArray({ dropdownData, officers }: Props) {
  const { errors, touched, values } = useFormikContext<
    DirectorDetailsFormValues
  >();

  const selectedDirectors = values.directors.map(
    _ => `${_.lastName}, ${_.firstName}`,
  );

  const hasMultipleDirectors = officers.length > 1;
  const showMinimumPercentageMessage =
    errors.totalPercentage === 'TOO_LOW' &&
    touched.directors?.some(_ => _.shareOfBusiness);

  const showDirectorDropdown =
    hasMultipleDirectors &&
    (showMinimumPercentageMessage || values.directors.length === 0);

  return (
    <FieldArray name="directors">
      {arrayHelpers => (
        <>
          {values.directors.map((_, index) => (
            <DirectorFields
              key={index} // eslint-disable-line react/no-array-index-key
              canBeRemoved={hasMultipleDirectors}
              dropDownData={dropdownData}
              index={index}
              onRemoveClick={() => arrayHelpers.remove(index)}
            />
          ))}
          {showMinimumPercentageMessage && (
            <Text tag="span" color="darker" size="regular">
              We require details of a director(s) with a combined shareholding
              of over 25%. Please add another director.
            </Text>
          )}
          {showDirectorDropdown && (
            <Select
              aria-label="Select director"
              placeholder="Select Director..."
              onChange={e =>
                handleDirectorSelected(e.target.value, arrayHelpers)
              }
            >
              {officers.map(_ => (
                <option
                  key={_.name}
                  value={_.name}
                  disabled={selectedDirectors.includes(_.name)}
                >
                  {_.name}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
    </FieldArray>
  );
}

function handleDirectorSelected(
  fullname: string,
  arrayHelpers: FieldArrayRenderProps,
) {
  const [lastName, firstName] = fullname.split(', ');
  arrayHelpers.push({
    title: '',
    firstName,
    lastName,
    gender: '',
    shareOfBusiness: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    numberOfDependants: '',
    history: [],
  });
}
