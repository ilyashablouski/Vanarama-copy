import dynamic from 'next/dynamic';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import SortCode from '@vanarama/uibook/lib/components/molecules/sortcode';
import React, { useMemo } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import validationSchema from './CompanyBankDetails.validation';
import { ICompanyBankDetailsProps, ICompanyBankDetails } from './interfaces';
import { responseToInitialFormValues } from './mappers';
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
const FormGroup = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/formgroup'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const CompanyBankDetails: FCWithFragments<ICompanyBankDetailsProps> = ({
  account,
  onSubmit,
  isEdited,
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

  const selectLabel = useMemo(() => {
    if (isEdited) {
      return 'Save & Return';
    }
    return formState.isSubmitting ? 'Saving...' : 'Continue';
  }, [isEdited, formState.isSubmitting]);

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
      <FormGroup
        controlId="joinedAt"
        label="Account Open Since"
        error={
          errors?.joinedAtMonth?.message?.toString() ||
          errors?.joinedAtYear?.message?.toString()
        }
        inline
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
          {months.map((value, i) => (
            <option key={value} value={i + 1}>
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
      updatedAt
    }
  `,
};

export default CompanyBankDetails;
