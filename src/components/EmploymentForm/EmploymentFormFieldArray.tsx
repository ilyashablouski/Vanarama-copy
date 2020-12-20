import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from '@apollo/client';
import { FieldArrayRenderProps } from 'formik';
import React from 'react';
import FormikTypeAheadField from '../FormikTypeAhead/FormikTypeAheadField';
import { EmploymentFormFieldArrayDownData } from '../../../generated/EmploymentFormFieldArrayDownData';
import useHistory from '../../hooks/useHistory';
import FCWithFragments from '../../utils/FCWithFragments';
import FormikAddressField from '../FormikAddressField/FormikAddressField';
import FormikMonthField from '../FormikMonthField/FormikMonthField';
import FormikRadioField from '../FormikRadioField/FormikRadioField';
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikNumericField from '../FormikNumericField/FormikNumericField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import RemainingMonthsMessage from '../RemainingMonthsMessage/RemainingMonthsMessage';
import { EMPTY_EMPLOYMENT_ENTRY, IEmploymentFormValues } from './interfaces';

interface IProps {
  arrayHelpers: FieldArrayRenderProps;
  dropDownData: EmploymentFormFieldArrayDownData;
  values: IEmploymentFormValues;
  requiredMonths?: number;
}

const EmploymentFormFieldArray: FCWithFragments<IProps> = ({
  arrayHelpers,
  dropDownData,
  values,
  requiredMonths = 36,
}) => {
  const { remainingMonths } = useHistory(values.history, requiredMonths, {
    onAppend: () => {
      arrayHelpers.push(EMPTY_EMPLOYMENT_ENTRY);
    },
    onRemove: arrayHelpers.remove,
    onSwap: arrayHelpers.swap,
  });

  return (
    <>
      {values.history.map((history, index) => (
        <RemainingMonthsMessage
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          entries={values.history}
          formatString="We need another %s of employment history."
          index={index}
          remainingMonths={remainingMonths}
        >
          <Tile>
            <FormikSelectField
              name={`history[${index}].status`}
              label={
                index === 0
                  ? 'Your Current Employment Status'
                  : 'Your Previous Employment Status'
              }
            >
              <OptionsWithFavourites
                options={dropDownData.employmentStatuses}
              />
            </FormikSelectField>
            {(history.status === 'Employed' ||
              history.status === 'Self employed') && (
              <>
                <FormikRadioField
                  name={`history[${index}].contract`}
                  label="Are You Working"
                >
                  <FormikRadioField.Radio
                    id={`history[${index}].contract_fulltime`}
                    label="Full Time"
                    value="Full time"
                  />
                  <FormikRadioField.Radio
                    id={`history[${index}].contract_parttime`}
                    label="Part Time"
                    value="Part time"
                  />
                </FormikRadioField>
                <FormikTypeAheadField
                  name={`history[${index}].title`}
                  label="Job Title"
                />
                <FormikTextField
                  name={`history[${index}].company`}
                  label="Company Name"
                />
                <FormikTextField
                  name={`history[${index}].phoneNumber`}
                  label="Work Phone Number"
                />
                <FormikAddressField
                  name={`history[${index}].address`}
                  label="Company Postcode or Address"
                />
                <FormikNumericField
                  name={`history[${index}].income`}
                  label="Gross Annual Income"
                  prefix="£"
                />
              </>
            )}
            {history.status && (
              <FormikMonthField
                label="Since"
                monthName={`history[${index}].month`}
                yearName={`history[${index}].year`}
              />
            )}
          </Tile>
        </RemainingMonthsMessage>
      ))}
    </>
  );
};

EmploymentFormFieldArray.fragments = {
  dropDownData: gql`
    fragment EmploymentFormFieldArrayDownData on DropDownType {
      __typename
      employmentStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default EmploymentFormFieldArray;
