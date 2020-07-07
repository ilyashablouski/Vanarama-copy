import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import SortCode from '@vanarama/uibook/lib/components/molecules/sortcode';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import React from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import validationSchema from './CompanyBankDetails.validation';
import { ICompanyBankDetails, ICompanyBankDetailsProps } from './interfaces';
import { responseToInitialFormValues } from './mappers';

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
        Don’t worry, no money will be taken at this stage. We just need these details so we can set up the direct debit for your monthly payments.
      </Text>
      <FormGroup
        controlId="bankAccountName"
        label="Bank Account Name"
        //TODO
        error={errors?.nameOnTheAccount?.message?.toString()}
      >
        <TextInput
          id="bankAccountName"
          type="text"
          name="bankAccountName"
          dataTestId="bankAccountName"
          ref={register}
          width="35ch"
        />
      </FormGroup>
      <FormGroup
        controlId="bankAccountNumber"
        label="Bank Account Number"
        //TODO
        error={errors?.accountNumber?.message?.toString()}
      >
        <NumericInput
          id="bankAccountNumber"
          name="bankAccountNumber"
          dataTestId="bankAccountNumber"
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
          name="bankSortCode"
          firstInputProps={{ 'aria-label': 'Sort code first two digits' }}
          middleInputProps={{ 'aria-label': 'Sort code middle two digits' }}
          lastInputProps={{ 'aria-label': 'Sort code last two digits' }}
          as={SortCode}
          control={control}
          onChange={([, parts]) => parts}
        />
      </FormGroup>
      {/* <FormGroup
        controlId="bankName"
        label="Bank Name"
        error={errors?.bankName?.message?.toString()}
      >
        <TextInput
          id="bankName"
          type="text"
          name="bankName"
          dataTestId="bankName"
          ref={register}
          width="45ch"
        />
      </FormGroup> */}
      <FormGroup
        controlId="timeAtBank"
        label="Time at Bank"
        error={
          errors?.openingMonth?.message?.toString() ||
          errors?.openingYear?.message?.toString()
        }
        inline
      >
        <Select
          id="timeAtBankMonth"
          dataTestId="timeAtBankMonth"
          name="timeAtBankMonth"
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
          dataTestId="timeAtBankYear"
          name="timeAtBankYear"
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
      bankName
      joinedAt
      sortCode
    }
  `,
};

export default CompanyBankDetails;
