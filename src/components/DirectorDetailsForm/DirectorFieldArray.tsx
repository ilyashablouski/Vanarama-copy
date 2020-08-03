import Select from '@vanarama/uibook/lib/components/atoms/select';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import React from 'react';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { DirectorFieldsDropDownData } from '../../../generated/DirectorFieldsDropDownData';
import DirectorFields from './DirectorFields';
import { DirectorDetailsFormValues, DirectorFormValues } from './interfaces';

const handleDirectorSelected = (
  fullname: string,
  arrayHelpers: FieldArrayRenderProps,
  directors: DirectorFormValues[],
) => {
  const [lastName, firstName] = fullname.split(', ');
  const selected = directors.find(
    director =>
      director.firstName === firstName && director.lastName === lastName,
  );
  arrayHelpers.push(
    selected || {
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
    },
  );
};

type Props = {
  dropdownData: DirectorFieldsDropDownData;
  directors: DirectorFormValues[];
};

export default function DirectorFieldArray({ dropdownData, directors }: Props) {
  const { errors, touched, values, submitCount } = useFormikContext<
    DirectorDetailsFormValues
  >();

  const selectedDirectors = values.directors.map(
    _ => `${_.lastName}, ${_.firstName}`,
  );

  const hasMultipleDirectors = directors.length > 1;
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
            <Formgroup
              error={
                submitCount > 0 &&
                showMinimumPercentageMessage &&
                'Please select a director'
              }
            >
              <Select
                aria-label="Select director"
                placeholder="Select Director..."
                onChange={e =>
                  handleDirectorSelected(
                    e.target.value,
                    arrayHelpers,
                    directors,
                  )
                }
              >
                {directors.map(_ => (
                  <option
                    key={`${_.lastName}, ${_.firstName}`}
                    value={`${_.lastName}, ${_.firstName}`}
                    disabled={selectedDirectors.includes(
                      `${_.lastName}, ${_.firstName}`,
                    )}
                  >
                    {`${_.lastName}, ${_.firstName}`}
                  </option>
                ))}
              </Select>
            </Formgroup>
          )}
        </>
      )}
    </FieldArray>
  );
}
