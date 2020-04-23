import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from 'apollo-boost';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import {
  IAddressFormProps,
  IAddressFormValues as IFormValues,
} from './interfaces';
import validationSchema from './validationSchema';
import AddressFormFields from './AddressFormFields';

const AddressForm: FCWithFragments<IAddressFormProps> = ({
  dropDownData,
  onSubmit,
}) => {
  const methods = useForm<IFormValues>({
    defaultValues: {
      history: [{ address: undefined, month: '', status: '', year: '' }],
    },
    mode: 'onBlur',
    validationSchema,
  });

  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
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
        Great, we just need your address history for the past 3 years to
        complete your credit check.
      </Text>
      <FormContext {...methods}>
        <AddressFormFields dropDownData={dropDownData} />
      </FormContext>
      <Button
        color="primary"
        dataTestId="address-history-submit"
        disabled={methods.formState.isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        label={methods.formState.isSubmitting ? 'Saving...' : 'Continue'}
        type="submit"
      />
    </Form>
  );
};

AddressForm.fragments = {
  dropDownData: gql`
    fragment AddressFormDropDownData on DropDownType {
      ...AddressFormFieldsDropDownData
    }
    ${AddressFormFields.fragments.dropDownData}
  `,
};

export default AddressForm;
