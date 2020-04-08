import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Heading from '@vanarama/uibook/packages/ui-components/src/components/atoms/heading';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import Form from '@vanarama/uibook/packages/ui-components/src/components/organisms/form';
import { gql } from 'apollo-boost';
import React from 'react';
import { FormContext } from 'react-hook-form';
import useHistoryForm from '../../hooks/useHistoryForm/useHistoryForm';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressSubForm from './AddressSubForm';
import {
  IAddressFormProps,
  IAddressFormValues as IFormValues,
} from './interfaces';
import validationSchema from './validationSchema';

const AddressForm: FCWithFragments<IAddressFormProps> = ({
  dropDownData,
  onSubmit,
}) => {
  const { fields, remaining, ...methods } = useHistoryForm<IFormValues>({
    defaultValues: {
      history: [{}],
    },
    fieldArrayKey: 'history',
    mode: 'onBlur',
    requiredMonths: 36,
    validationSchema,
  });

  return (
    <Form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
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
        {fields.map((field, index) => {
          const isLastEntry = index === fields.length - 1;
          const hasMultipleEntries = fields.length > 1;
          return (
            <React.Fragment key={field.id}>
              {isLastEntry && remaining > 0 && hasMultipleEntries && (
                <Text tag="span" size="regular" color="darker">
                  We need another {remaining} months of address history.
                </Text>
              )}
              <AddressSubForm dropDownData={dropDownData} index={index} />
            </React.Fragment>
          );
        })}
      </FormContext>
      <Button
        dataTestId="address-history-submit"
        color="primary"
        disabled={methods.formState.isSubmitting}
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
      ...AddressSubFormDropDownData
    }
    ${AddressSubForm.fragments.dropDownData}
  `,
};

export default AddressForm;
