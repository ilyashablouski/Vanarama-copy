import React from 'react';
import dynamic from 'next/dynamic';
import AddressFinder from 'core/molecules/address-finder';
import { Controller, useFormContext, ValidationOptions } from 'react-hook-form';

const FormGroup = dynamic(() => import('core/molecules/formgroup'));

interface IProps {
  dataTestId: string;
  id: string;
  label: string;
  rules?: ValidationOptions;
  skipManualInput?: boolean;
  hint?: string;
}

export default function AddressFormField({
  dataTestId,
  id,
  label,
  rules,
  skipManualInput,
  hint,
}: IProps) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={id}
      valueName="selected"
      onChangeName="onSuggestionChange"
      as={
        <AddressFinder
          apiKey={process.env.LOQATE_KEY!}
          onSuggestionChange={() => {}}
        >
          <FormGroup
            controlId={id}
            label={label}
            error={errors[id]?.message?.toString()}
            hint={hint}
          >
            <AddressFinder.Input id={id} dataTestId={dataTestId} />
            <AddressFinder.Selected dataTestId={dataTestId} />
            <AddressFinder.Intermediate />
          </FormGroup>
          <AddressFinder.Results />
          {!skipManualInput && (
            <>
              <AddressFinder.ManualAddingButton />
              <AddressFinder.ManualAddressForm />
            </>
          )}
        </AddressFinder>
      }
      control={control}
      rules={rules}
    />
  );
}
