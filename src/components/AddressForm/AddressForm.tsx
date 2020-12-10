import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import { FieldArray, Formik } from 'formik';
import { OlafContext } from '../../layouts/OLAFLayout/helpers';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressFormFieldArray from './AddressFormFieldArray';
import {
  IAddressFormProps,
  IAddressFormValues as IFormValues,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import validationSchema from './validationSchema';
import Skeleton from '../Skeleton';

const ChevronForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Form = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/form'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const AddressForm: FCWithFragments<IAddressFormProps> = ({
  addresses,
  dropDownData,
  onSubmit,
}) => {
  const context = useContext(OlafContext);
  return (
    <Formik<IFormValues>
      initialValues={responseToInitialFormValues(addresses)}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <Form onSubmit={formikProps.handleSubmit}>
          <Heading
            dataTestId="address-history-heading"
            tag="h1"
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
            {` We just need your address history for the past ${context.requiredMonths /
              12} years to complete your order.`}
          </Text>
          <FieldArray name="history">
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                values={formikProps.values}
                requiredMonths={context.requiredMonths}
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
};

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
