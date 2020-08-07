import { gql } from '@apollo/client';
import CloseSharp from '@vanarama/uibook/lib/assets/icons/CloseSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { FieldArray, useField, useFormikContext } from 'formik';
import React from 'react';
import { DirectorFieldsDropDownData } from '../../../generated/DirectorFieldsDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressFormFieldArray from '../AddressForm/AddressFormFieldArray';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import FormikTextField from '../FormikTextField/FormikTextField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { createKeyGenerator } from './helpers';
import { DirectorDetailsFormValues } from './interfaces';

type Props = {
  canBeRemoved: boolean;
  dropDownData: DirectorFieldsDropDownData;
  index: number;
  onRemoveClick: () => void;
};

const DirectorFields: FCWithFragments<Props> = ({
  canBeRemoved,
  dropDownData,
  index,
  onRemoveClick,
}) => {
  const { values, errors } = useFormikContext<DirectorDetailsFormValues>();
  const currentDirector = values.directors[index];
  const generateFieldKey = createKeyGenerator(index);

  // Manually reguster the shareOfBusiness field because it has validation rules
  // based on itself and the total percentage
  const shareFieldName = generateFieldKey('shareOfBusiness');
  const [shareField, shareMeta] = useField(shareFieldName);
  const shareError =
    (shareMeta.touched && shareMeta.error) ||
    (errors.totalPercentage === 'TOO_HIGH'
      ? 'Combined shareholding is over 100%. Please review'
      : undefined);

  return (
    <Tile className="tilebox -p-300">
      {canBeRemoved && (
        <Button
          aria-label={`Remove director ${index + 1}`}
          className="tilebox--button"
          color="teal"
          fill="clear"
          icon={<CloseSharp />}
          iconColor="teal"
          iconPosition="after"
          onClick={onRemoveClick}
          round
          size="regular"
          type="button"
        />
      )}
      <FormikSelectField name={generateFieldKey('title')} label="Title">
        <OptionsWithFavourites options={dropDownData.titles} />
      </FormikSelectField>
      <FormikTextField
        name={generateFieldKey('firstName')}
        label="First Name"
        dataTestId="first-name"
      />
      <FormikTextField name={generateFieldKey('lastName')} label="Last Name" />
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
      <Formgroup
        controlId={shareFieldName}
        label="% Shareholding of Business"
        error={shareError}
      >
        <NumericInput
          id={shareFieldName}
          min="1"
          suffix="%"
          type="number"
          width="9ch"
          {...shareField}
        />
      </Formgroup>
      <hr className="mv-400" />
      <Heading color="dark" size="small">
        Address History
      </Heading>
      <Text color="dark" size="small">
        Please provide your personal address history for the past five years.
      </Text>
      <FieldArray name={generateFieldKey('history')}>
        {arrayHelpers => (
          <AddressFormFieldArray
            arrayHelpers={arrayHelpers}
            dropDownData={dropDownData}
            idPrefix={`directors[${index}].`}
            requiredMonths={60}
            values={currentDirector}
          />
        )}
      </FieldArray>
    </Tile>
  );
};

DirectorFields.fragments = {
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
