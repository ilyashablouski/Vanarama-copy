import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import CountryTurnoverFieldArray from './CountryTurnoverFieldArray';
import { VatDetailsFormValues } from './interfaces';

const VatDetailsForm: React.FC = () => {
  const methods = useForm<VatDetailsFormValues>({
    mode: 'onBlur',
    defaultValues: {
      trade: [{ country: '', percentage: '' }],
    },
  });

  const { errors, formState, handleSubmit, register, watch } = methods;
  const vatRegistered = watch('vatRegistered');
  const outsideUK = watch('outsideUK');

  return (
    <Form
      onSubmit={handleSubmit(values => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(values, null, 2)); // temporary until BE integration done
      })}
    >
      <Heading color="black" dataTestId="vat-details_heading" size="xlarge">
        VAT Details
      </Heading>
      <Formgroup>
        <Checkbox
          dataTestId="vat-details_is-registered"
          id="vatRegistered"
          label="The company is VAT registered"
          name="vatRegistered"
          ref={register}
        />
      </Formgroup>
      {vatRegistered && (
        <Formgroup
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
        </Formgroup>
      )}
      <Formgroup>
        <Checkbox
          dataTestId="vat-details_outside-uk"
          id="outsideUK"
          label="The company trades outside the UK"
          name="outsideUK"
          ref={register}
        />
      </Formgroup>
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
