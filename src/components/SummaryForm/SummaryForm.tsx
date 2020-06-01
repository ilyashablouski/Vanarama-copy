import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { SummaryFormPerson } from '../../../generated/SummaryFormPerson';
import FCWithFragments from '../../utils/FCWithFragments';
import SummaryFormAddressHistory from './SummaryFormAddressHistory';
import SummaryFormBankDetailsSection from './SummaryFormBankDetailsSection';
import SummaryFormDetailsSection from './SummaryFormDetailsSection';
import SummaryFormEmploymentHistory from './SummaryFormEmploymentHistory';
import SummaryFormIncomeSection from './SummaryFormIncomeSection';

interface IProps {
  person: SummaryFormPerson;
}

const SummaryForm: FCWithFragments<IProps> = ({ person }) => {
  const router = useRouter();
  // NOTE: Many are returned so just take the first one?
  const primaryBankAccount = person.bankAccounts?.[0];

  const handleEdit = (url: string) => () => {
    const href = `${url}?redirect=summary`;
    router.push(href, href.replace('[uuid]', person.uuid));
  };

  return (
    <Form>
      <Heading color="black" size="xlarge" dataTestId="summary-heading">
        Summary
      </Heading>
      <Text color="darker" size="lead">
        Here’s a summary of all the details you’ve entered. Have a look below to
        check everything is correct. If you do spot a mistake, simply edit to
        make a change.
      </Text>
      <SummaryFormDetailsSection
        person={person}
        onEdit={handleEdit('/olaf/about/[uuid]')}
      />
      <SummaryFormAddressHistory
        addresses={person.addresses || []}
        onEdit={handleEdit('/olaf/address-history/[uuid]')}
      />
      <SummaryFormEmploymentHistory
        employments={person.employmentHistories || []}
        onEdit={handleEdit('/olaf/employment-history/[uuid]')}
      />
      {person.incomeAndExpense && (
        <SummaryFormIncomeSection
          income={person.incomeAndExpense}
          onEdit={handleEdit('/olaf/expenses/[uuid]')}
        />
      )}
      {primaryBankAccount && (
        <SummaryFormBankDetailsSection
          account={primaryBankAccount}
          onEdit={handleEdit('/olaf/bank-details/[uuid]')}
        />
      )}
      <Button
        type="button"
        color="teal"
        label="Continue"
        onClick={() => {
          router.push('/olaf/thank-you');
        }}
      />
    </Form>
  );
};

SummaryForm.fragments = {
  person: gql`
    fragment SummaryFormPerson on PersonType {
      ...SummaryFormDetailsSectionPerson
      addresses {
        ...SummaryFormAddressHistoryAddress
      }
      employmentHistories {
        ...SummaryFormEmploymentHistoryEmployment
      }
      incomeAndExpense {
        ...SummaryFormIncomeSectionIncome
      }
      bankAccounts {
        ...SummaryFormBankDetailsSectionAccount
      }
    }
    ${SummaryFormAddressHistory.fragments.addresses}
    ${SummaryFormDetailsSection.fragments.person}
    ${SummaryFormEmploymentHistory.fragments.employments}
    ${SummaryFormIncomeSection.fragments.income}
    ${SummaryFormBankDetailsSection.fragments.account}
  `,
};

export default SummaryForm;
