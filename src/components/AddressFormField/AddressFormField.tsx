import React from 'react';
import dynamic from 'next/dynamic';
import AddressFinder from 'core/molecules/address-finder';
import { Controller, useFormContext, ValidationOptions } from 'react-hook-form';

const Formgroup = dynamic(() => import('core/molecules/formgroup'));

interface IProps {
  dataTestId: string;
  id: string;
  label: string;
  rules?: ValidationOptions;
}

export default function AddressFormField({
  dataTestId,
  id,
  label,
  rules,
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
          <Formgroup
            controlId={id}
            label={label}
            error={errors[id]?.message?.toString()}
          >
            <AddressFinder.Input id={id} dataTestId={dataTestId} />
            <AddressFinder.Selected />
            <AddressFinder.Intermediate />
          </Formgroup>
          <AddressFinder.Results />
        </AddressFinder>
      }
      control={control}
      rules={rules}
    />
  );
}
