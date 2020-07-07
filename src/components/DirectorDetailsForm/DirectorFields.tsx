import { gql } from '@apollo/client';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { useFormikContext, FieldArray } from 'formik';
import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { DirectorFieldsDropDownData } from '../../../generated/DirectorFieldsDropDownData';
import { DirectorFieldsOfficer } from '../../../generated/DirectorFieldsOfficer';
import FCWithFragments from '../../utils/FCWithFragments';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikNumericField from '../FormikNumericField/FormikNumericField';
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import FormikTextField from '../FormikTextField/FormikTextField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { createKeyGenerator, usePrepopulateName } from './helpers';
import { DirectorDetailsFormValues } from './interfaces';
import AddressFormFieldArray from '../AddressForm/AddressFormFieldArray';

type Props = {
  allOfficers: DirectorFieldsOfficer[];
  dropDownData: DirectorFieldsDropDownData;
  hideSelection?: boolean;
  index: number;
};

const DirectorFields: FCWithFragments<Props> = ({
  allOfficers,
  dropDownData,
  hideSelection,
  index,
}) => {
  const { values } = useFormikContext<DirectorDetailsFormValues>();
  const selectedDirector = values.directors[index];
  usePrepopulateName(selectedDirector.fullname, index);

  const generateFieldKey = createKeyGenerator(index);
  return (
    <>
      {!hideSelection && (
        <FormikSelectField
          aria-label={`Select director ${index + 1}`}
          name={generateFieldKey('fullname')}
          placeholder="Select Director..."
        >
          {allOfficers.map(_ => (
            <option key={_?.name} value={_?.name}>
              {_?.name}
            </option>
          ))}
        </FormikSelectField>
      )}
      {(selectedDirector.fullname || hideSelection) && (
        <Tile className="-p-300">
          <FormikSelectField name={generateFieldKey('title')} label="Title">
            <OptionsWithFavourites options={dropDownData.titles} />
          </FormikSelectField>
          <FormikTextField
            name={generateFieldKey('firstName')}
            label="First Name"
          />
          <FormikTextField
            name={generateFieldKey('lastName')}
            label="Last Name"
          />
          <FormikSelectField name={generateFieldKey('gender')} label="Gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </FormikSelectField>
          <FormikDateField
            label="Date Of Birth"
            fieldNames={[
              generateFieldKey('dayOfBirth'),
              generateFieldKey('monthOfBirth'),
              generateFieldKey('yearOfBirth'),
            ]}
          />
          <FormikSelectField
            name={generateFieldKey('numberOfDependants')}
            label="Number of Dependants"
          >
            <OptionsWithFavourites options={dropDownData.noOfDependants} />
          </FormikSelectField>
          <FormikNumericField
            label="% Shareholder of Business"
            min="1"
            name={generateFieldKey('shareOfBusiness')}
            suffix="%"
            type="number"
            width="9ch"
          />
          <hr className="mv-400" />
          <Heading color="dark" size="small">
            Address History
          </Heading>
          <Text color="dark" size="small">
            Please provide your personal address history for the past five
            years.
          </Text>
          <FieldArray name={generateFieldKey('history')}>
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                idPrefix={`directors[${index}].`}
                requiredMonths={60}
                values={selectedDirector}
              />
            )}
          </FieldArray>
        </Tile>
      )}
    </>
  );
};

DirectorFields.fragments = {
  allOfficers: gql`
    fragment DirectorFieldsOfficer on CompanyOfficersDataType {
      __typename
      name
    }
  `,
  dropDownData: gql`
    fragment DirectorFieldsDropDownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
      noOfDependants {
        __typename
        data
        favourites
      }
      ...AddressFormFieldArrayDownData
    }
    ${AddressFormFieldArray.fragments.dropDownData}
  `,
};

export default DirectorFields;
