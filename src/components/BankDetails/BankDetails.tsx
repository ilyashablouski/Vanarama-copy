import dynamic from 'next/dynamic';
import CheckBox from 'core/atoms/checkbox';
import NumericInput from 'core/atoms/numeric-input';
import Select from 'core/atoms/select';
import TextInput from 'core/atoms/textinput';
import SortCode from 'core/molecules/sortcode';
import { gql } from '@apollo/client';
import React from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import validationSchema from './BankDetails.validation';
import { IBankDetails, IBankDetailsProps } from './interfaces';
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
const FormGroup = dynamic(() => import('core/molecules/formgroup'));

const BankDetails: FCWithFragments<IBankDetailsProps> = ({
  account,
  onSubmit,
  isSubmit,
}) => {
  const { handleSubmit, register, control, errors, watch } = useForm<
    IBankDetails
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

  const sortCode = watch('sortCode');
  const accountNumber = watch('accountNumber');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading color="black" size="xlarge" dataTestId="bankDetails" tag="h1">
        Bank Details
      </Heading>
      <Text color="darker" size="lead">
        Don&apos;t worry, we won&apos;t take any money now, we just need to
        check that you have a valid UK bank account as part of our credit check
        process.
      </Text>
      <FormGroup
        controlId="nameOnTheAccount"
        label="Name on the Account"
        error={errors?.nameOnTheAccount?.message?.toString()}
      >
        <TextInput
          id="nameOnTheAccount"
          type="text"
          name="nameOnTheAccount"
          dataTestId="nameOnTheAccount"
          ref={register}
          width="35ch"
        />
      </FormGroup>
      <FormGroup
        controlId="accountNumber"
        label="Account Number"
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
        label="Sort Code"
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
      </FormGroup>
      <FormGroup
        controlId="accountOpenSince"
        label="Account Open Since"
        error={
          errors?.openingMonth?.message?.toString() ||
          errors?.openingYear?.message?.toString()
        }
        className="-inline-preserved"
      >
        <Select
          id="accountOpenSinceMonth"
          dataTestId="accountOpenSinceMonth"
          name="openingMonth"
          ref={register}
          placeholder="Month"
        >
          {months.map((value, index) => (
            <option key={value} value={index + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="accountOpenSinceYear"
          name="openingYear"
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
      <div className="olaf--bank-details-legal">
        <Heading
          tag="h4"
          className="-lead -black"
          dataTestId="creditApplications"
        >
          Credit Applications
        </Heading>
        <Text
          tag="p"
          size="small"
          color="darker"
          dataTestId="creditApplicationsContent"
        >
          It&apos;s important that you know how &quot;Your Information&quot;
          will be used in connection with your application. &quot;Your
          Information&quot; means the information you have given us, which we
          pass on to the finance company or a funding partner, so they may
          complete searches with the credit reference and fraud prevention
          agencies. This applies to all applicants, including directors and
          partners if the application is made by a limited company, partnership
          or an incorporated association. The finance company check your details
          with credit reference and fraud prevention agencies, and these
          agencies will record the check. They will provide the agencies with
          your current and previous names, address and dates of birth of all
          parties, so if you are providing information about others, on a joint
          application, you must be sure that you have their agreement. The
          agencies will provide them with public information about you and any
          third party financially linked to you. Information such as county
          court judgements (CCJs) and bankruptcies, electoral register and fraud
          prevention information on you and your financial associates, current
          and previous names, addresses and dates of birth. If false or
          inaccurate information is provided and fraud is identified, details
          will be passed to fraud prevention agencies. Law enforcement agencies
          may access and use this information. The agency searches that the
          finance company make, will leave a search footprint, both on their
          records and on your credit file at the agencies they have used,
          whether or not this application proceeds. If the search was for a
          credit application, the record of that search (but not in their name)
          may be seen by other organisations when you apply for credit in the
          future. If you made a joint application, they may link together the
          records of joint applicants, called financial associates. They will
          also link all your previous and subsequent names and addresses. Links
          between financial associates will remain on your and their files until
          such time as you or your associate successfully files for a
          disassociation with the credit reference agencies. Information
          provided may be supplied to other organisations and used by the
          agencies and them to assess you and your household for:- credit and
          credit related services; household, credit , life and other insurance
          proposals and claims; debt tracing and recovery; checking details of
          job applicants and employees, prevention of fraud and money
          laundering; managing your accounts; statistical analysis about credit,
          insurance and fraud; market research, and to verify your identity if
          you or your financial associate applies for other facilities,
          including all types of insurance applications and claims. They and
          other organisations may access and use the information recorded by
          fraud prevention agencies from other countries. Information about you
          may also be used for other purposes for which you have given specific
          information, or, in very limited circumstances, when required by law
          or where permitted under the terms of the Data Protection Act 1998.
          Credit scoring techniques will be used to assess your application.
          Data Protection Notice So that we may assess your application for
          finance, you agree that we may search the files of any licensed credit
          reference agency who will keep a record of that search. If the funder
          enters into this agreement with you, they will declare information
          about you and the conduct of your account at any time to any licensed
          credit reference agency. This information may be used by other lenders
          in assessing applications for finance from you and members of your
          household and occasionally for fraud prevention and trading orders.
          They may also disclose information about you and your conduct of this
          agreement at any time to any motor trader, insurance company, vehicle
          recovery tracing agent, lawyer, law enforcement agency, mailing
          agency, and our parent, associated and subsidiary companies and their
          respective agencies and contractors. I confirm that the information
          above is true and accurate. By submitting this form you confirm your
          authority for your application to be credit scored Cancellation
          Policy: Even if you&apos;ve signed an order and paid a deposit, we
          guarantee to give you a no quibble refund and we won&apos;t charge you
          a thing should you need to cancel your order. Our finance partners
          will have their own cancellation policy should you wish to cancel your
          contract once you have taken delivery of your vehicle. For more
          information on the individual cancellation policies please your
          finance documentation.
        </Text>
      </div>
      <FormGroup error={errors?.understand?.message?.toString()}>
        <CheckBox
          id="understand"
          dataTestId="understand"
          name="understand"
          label="I have read and understood the above."
          ref={register}
        />
      </FormGroup>
      <FormGroup
        label="Please Confirm"
        error={
          errors?.affordRental?.message?.toString() ||
          errors?.checkCreditHistory?.message?.toString() ||
          errors?.termsAndConditions?.message?.toString()
        }
      >
        <CheckBox
          id="affordRental"
          dataTestId="affordRental"
          name="affordRental"
          label="I can afford the monthly rentals without creating undue financial hardship."
          ref={register}
        />
        <CheckBox
          id="checkCreditHistory"
          dataTestId="checkCreditHistory"
          name="checkCreditHistory"
          label="I allow the Funder (the company lending me the money) to check my credit history. I am aware it might affect my credit score."
          ref={register}
        />
        <CheckBox
          id="termsAndConditions"
          dataTestId="bank-details_terms-and-conditions"
          name="termsAndConditions"
          label={[
            'I agree to the ',
            <a
              key="a"
              className="link -teal"
              href="/legal/terms-and-conditions/"
              target="_blank"
            >
              Terms and Conditions
            </a>,
          ]}
          ref={register}
        />
      </FormGroup>
      <Button
        type="submit"
        label={isSubmit ? 'Saving...' : 'Continue'}
        disabled={isSubmit}
        color="primary"
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        dataTestId="continue"
      />
    </Form>
  );
};

BankDetails.fragments = {
  account: gql`
    fragment BankDetailsAccount on BankAccountType {
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

export default BankDetails;
