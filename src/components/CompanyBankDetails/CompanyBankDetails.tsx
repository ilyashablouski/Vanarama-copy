import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import SortCode from '@vanarama/uibook/lib/components/molecules/sortcode';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { genMonths, genYears } from '../../utils/helpers';
import validationSchema from './CompanyBankDetails.validation';
import { ICompanyBankDetailsProps, ICompanyBankDetails } from './interfaces';
import FCWithFragments from 'utils/FCWithFragments';
import { responseToInitialFormValues } from './mappers';
import { gql } from '@apollo/client';

const CompanyBankDetails: FCWithFragments<ICompanyBankDetailsProps> = ({
  account,
  onSubmit,
}) => {
  const { handleSubmit, register, control, errors, formState } = useForm<
  ICompanyBankDetails
  >({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(account),
   });

  const months = genMonths();
  const years = genYears(100);
  const sortCodeErrors = (
    ((errors?.sortCode as unknown) as (FieldError | undefined)[]) || []
  ).filter((_): _ is FieldError => Boolean(_));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading color="black" size="xlarge" dataTestId="CompanyBankDetails">
        Company Bank Details
      </Heading>
      <Text color="darker" size="lead">
        Don’t worry, no money will be taken at this stage. We just need these
        details so we can set up the direct debit for your monthly payments.
      </Text>
      <FormGroup
        controlId="accountName"
        label="Bank Account Name"
        error={errors?.accountName?.message?.toString()}
      >
        <TextInput
          id="accountName"
          type="text"
          name="accountName"
          dataTestId="accountName"
          ref={register}
          width="35ch"
        />
      </FormGroup>
      <FormGroup
        controlId="accountNumber"
        label="Bank Account Number"
        error={errors?.accountNumber?.message?.toString()}
      >
        <NumericInput
          id="accountNumber"
          name="accountNumber"
          dataTestId="accountNumber"
          ref={register}
          width="35ch"
        />
      </FormGroup>
      <FormGroup
        label="Bank Sort Code"
        error={
          sortCodeErrors.length
            ? sortCodeErrors[0].message?.toString()
            : undefined
        }
      >
        <Controller
          name="sortCode"
          firstInputProps={{ 'aria-label': 'Sort code first two digits' }}
          middleInputProps={{ 'aria-label': 'Sort code middle two digits' }}
          lastInputProps={{ 'aria-label': 'Sort code last two digits' }}
          as={SortCode}
          control={control}
          onChange={([, parts]) => parts}
        />
      </FormGroup>
      <FormGroup
        controlId="joinedAt"
        label="Time at Bank"
        // error={
        //   errors?.joinedAt?.message?.toString() ||
        //   errors?.joinedAt?.message?.toString()
        // }
        inline
      >
        <Select
          id="joinedAtMonth"
          dataTestId="joinedAtMonth"
          name="joinedAtMonth"
          ref={register}
          placeholder="Month"
        >
          {months.map((value, i) => (
            <option key={value} value={i + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="joinedAtYear"
          name="joinedAtYear"
          ref={register}
          placeholder="Year"
        >
          {years.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <Button
        type="submit"
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
        disabled={formState.isSubmitting}
        color="primary"
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        dataTestId="continue"
      />
    </Form>
  );
};

CompanyBankDetails.fragments = {
  account: gql`
    fragment CompanyBankDetailsAccount on BankAccountType {
      __typename
      uuid
      accountName
      accountNumber
      joinedAt
      sortCode
    }
  `,
};

export default CompanyBankDetails;
