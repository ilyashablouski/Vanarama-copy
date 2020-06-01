import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { FieldArray, Formik } from 'formik';
import React from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressFormFieldArray from './AddressFormFieldArray';
import {
  IAddressFormProps,
  IAddressFormValues as IFormValues,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import validationSchema from './validationSchema';

const AddressForm: FCWithFragments<IAddressFormProps> = ({
  addresses,
  dropDownData,
  onSubmit,
}) => (
  <Formik<IFormValues>
    initialValues={responseToInitialFormValues(addresses)}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {formikProps => (
      <Form onSubmit={formikProps.handleSubmit}>
        <Heading
          dataTestId="address-history-heading"
          tag="span"
          size="xlarge"
          color="black"
        >
          Address History
        </Heading>
        <Text
          dataTestId="address-history-lead"
          size="lead"
          color="darker"
          tag="span"
        >
          just need your address history for the past 3 years to complete your
          credit check.
        </Text>
        <FieldArray name="history">
          {arrayHelpers => (
            <AddressFormFieldArray
              arrayHelpers={arrayHelpers}
              dropDownData={dropDownData}
              values={formikProps.values}
            />
          )}
        </FieldArray>
        <Button
          color="primary"
          dataTestId="address-history-submit"
          disabled={formikProps.isSubmitting}
          icon={<ChevronForwardSharp />}
          iconColor="white"
          iconPosition="after"
          label={formikProps.isSubmitting ? 'Saving...' : 'Continue'}
          type="submit"
        />
      </Form>
    )}
  </Formik>
);

AddressForm.fragments = {
  addresses: gql`
    fragment AddressFormAddresses on AddressType {
      __typename
      uuid
      serviceId
      lineOne
      lineTwo
      postcode
      city
      propertyStatus
      startedOn
    }
  `,
  dropDownData: gql`
    fragment AddressFormDropDownData on DropDownType {
      ...AddressFormFieldArrayDownData
    }
    ${AddressFormFieldArray.fragments.dropDownData}
  `,
};

export default AddressForm;
