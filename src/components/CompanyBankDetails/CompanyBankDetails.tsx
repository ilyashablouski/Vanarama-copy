import dynamic from 'next/dynamic';
import NumericInput from 'core/atoms/numeric-input';
import Select from 'core/atoms/select';
import TextInput from 'core/atoms/textinput';
import SortCode from 'core/molecules/sortcode';
import React, { useMemo } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import validationSchema from './CompanyBankDetails.validation';
import { ICompanyBankDetailsProps, ICompanyBankDetails } from './interfaces';
import { responseToInitialFormValues } from './mappers';
import Skeleton from '../Skeleton';
import BankAccountValidator from '../BankAccountValidator';

const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={1} />,
});

const CompanyBankDetails: FCWithFragments<ICompanyBankDetailsProps> = ({
  account,
  onSubmit,
  isEdited,
}) => {
  const { handleSubmit, register, control, errors, formState, watch } = useForm<
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

  const selectLabel = useMemo(() => {
    if (isEdited) {
      return 'Save & Return';
    }
    return formState.isSubmitting ? 'Saving...' : 'Continue';
  }, [isEdited, formState.isSubmitting]);

  const sortCode = watch('sortCode');
  const accountNumber = watch('accountNumber');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading
        color="black"
        size="xlarge"
        dataTestId="companyBankDetails"
        tag="h1"
      >
        Company Bank Details
      </Heading>
      <Text color="black" size="regular">
        Don’t worry, no money will be taken at this stage. We just need these
        details so we can set up the direct debit for your monthly payments.
      </Text>
      <br />
      <FormGroup
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
          width="35ch"
        />
      </FormGroup>
      <FormGroup
        controlId="accountName"
        label="Account Name"
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
      <BankAccountValidator
        accountNumber={accountNumber ?? ''}
        sortCode={sortCode?.join('') ?? ''}
      />
      <FormGroup
        controlId="joinedAt"
        label="Account Open Since"
        error={
          errors?.joinedAtMonth?.message?.toString() ||
          errors?.joinedAtYear?.message?.toString()
        }
        className="-inline-preserved"
      >
        <Select
          id="joinedAtMonth"
          dataTestId="joinedAtMonth"
          name="joinedAtMonth"
          ref={register}
          // Error for the joinedAt form group is 2 separate errors, it's shown if any of them exists
          // we need to remove outdated errors
          // example (joined at date must be in the past): user selects current year => user selects month in future => an error for the month field appears =>
          // => user selects previous year => date is not in the future => an error in month field not updated because it wasn't changed
          onBlur={() => {
            errors.joinedAtYear = undefined;
          }}
          placeholder="Month"
        >
          {months.map((value, index) => (
            <option key={value} value={index + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          id="joinedAtYear"
          dataTestId="joinedAtYear"
          name="joinedAtYear"
          ref={register}
          placeholder="Year"
          onBlur={() => {
            errors.joinedAtMonth = undefined;
          }}
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
        label={selectLabel}
        disabled={formState.isSubmitting}
        className="-mt-400"
        color="primary"
        size="large"
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
