import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React from 'react';
import { FormContext, useForm, OnSubmit } from 'react-hook-form';
import CountryTurnoverFieldArray from './CountryTurnoverFieldArray';
import { VatDetailsFormValues } from './interfaces';

interface IProps {
  onSubmit: OnSubmit<VatDetailsFormValues>;
}

const VatDetailsForm: React.FC<IProps> = ({ onSubmit }) => {
  const methods = useForm<VatDetailsFormValues>({
    mode: 'onBlur',
    defaultValues: {
      markets: [{ country: '', percentage: '' }],
    },
  });

  const { errors, formState, handleSubmit, register, watch } = methods;
  const vatRegistered = watch('vatRegistered');
  const outsideUK = watch('outsideUK');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading color="black" dataTestId="vat-details_heading" size="xlarge">
        VAT Details
      </Heading>
      <FormGroup>
        <Checkbox
          dataTestId="vat-details_is-registered"
          id="vatRegistered"
          label="The company is VAT registered"
          name="vatRegistered"
          ref={register}
        />
      </FormGroup>
      {vatRegistered && (
        <FormGroup
          controlId="vatNumber"
          error={errors.vatNumber?.message?.toString()}
          hint="Please enter your VAT number without characters"
          label="VAT Number"
        >
          <TextInput
            dataTestId="vat-details_vat-number"
            id="vatNumber"
            name="vatNumber"
            ref={register({
              required: 'Please fill in VAT Number',
              pattern: {
                value: /\d{9}/,
                message: 'Your VAT number must be 9 digits long',
              },
            })}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Checkbox
          dataTestId="vat-details_outside-uk"
          id="outsideUK"
          label="The company trades outside the UK"
          name="outsideUK"
          ref={register}
        />
      </FormGroup>
      {outsideUK && (
        <FormContext {...methods}>
          <CountryTurnoverFieldArray />
        </FormContext>
      )}
      <Button
        color="primary"
        dataTestId="vat-details_continue"
        disabled={formState.isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
        size="large"
        type="submit"
      />
    </Form>
  );
};

export default VatDetailsForm;
