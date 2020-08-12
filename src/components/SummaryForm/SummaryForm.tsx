import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { SummaryFormPerson } from '../../../generated/SummaryFormPerson';
import FCWithFragments from '../../utils/FCWithFragments';
import SummaryFormAddressHistory from './SummaryFormAddressHistory';
import SummaryFormBankDetailsSection from './SummaryFormBankDetailsSection';
import SummaryFormDetailsSection from './SummaryFormDetailsSection';
import SummaryFormEmploymentHistory from './SummaryFormEmploymentHistory';
import SummaryFormIncomeSection from './SummaryFormIncomeSection';
import { getUrlParam } from '../../utils/url';
import {
  useGetCreditApplicationByOrderUuid,
  FULL_CREDIT_CHECKER_MUTATION,
  parseCreditApplicationData,
} from './Utils';
import {
  fullCreditChecker,
  fullCreditCheckerVariables,
} from '../../../generated/fullCreditChecker';

interface IProps {
  person: SummaryFormPerson;
  orderId: string;
}

const SummaryForm: FCWithFragments<IProps> = ({ person, orderId }) => {
  const router = useRouter();
  const { data: creditApplicationData } = useGetCreditApplicationByOrderUuid(
    orderId,
  );

  const [useFullCreditChecker] = useMutation<
    fullCreditChecker,
    fullCreditCheckerVariables
  >(FULL_CREDIT_CHECKER_MUTATION, {
    onCompleted: properties => {
      //if need to react on mutation completed
    },
  });

  // NOTE: Many are returned so just take the first one?
  const primaryBankAccount = person.bankAccounts?.[0];

  const handleEdit = (url: string) => () => {
    const params = getUrlParam({ uuid: person.uuid, redirect: 'summary' });
    const href = `${url}${params}`;
    router.push(href, href.replace('[orderId]', orderId));
  };
  return (
    <Form>
      <Heading color="black" size="xlarge" dataTestId="summary-heading">
        Summary
      </Heading>
      <Text color="darker" size="lead" dataTestId="olaf_summary_text">
        Here’s a summary of all the details you’ve entered. Have a look below to
        check everything is correct. If you do spot a mistake, simply edit to
        make a change.
      </Text>
      <SummaryFormDetailsSection
        person={person}
        onEdit={handleEdit('/olaf/about/[orderId]')}
      />
      <SummaryFormAddressHistory
        addresses={person.addresses || []}
        onEdit={handleEdit('/olaf/address-history/[orderId]')}
      />
      <SummaryFormEmploymentHistory
        employments={person.employmentHistories || []}
        onEdit={handleEdit('/olaf/employment-history/[orderId]')}
      />
      {person.incomeAndExpense && (
        <SummaryFormIncomeSection
          income={person.incomeAndExpense}
          onEdit={handleEdit('/olaf/expenses/[orderId]')}
        />
      )}
      {primaryBankAccount && (
        <SummaryFormBankDetailsSection
          account={primaryBankAccount}
          onEdit={handleEdit('/olaf/bank-details/[orderId]')}
        />
      )}
      <Button
        type="button"
        color="teal"
        label="Continue"
        dataTestId="olaf_summary_continue_buttton"
        onClick={() => {
          router
            .push(
              '/olaf/thank-you/[orderId]',
              '/olaf/thank-you/[orderId]'.replace('[orderId]', orderId),
            )
            .then(() => {
              const {
                partyUuid,
                creditAppUuid,
                vehicleType,
                monthlyPayment,
                depositPayment,
              } = parseCreditApplicationData(creditApplicationData);

              useFullCreditChecker({
                variables: {
                  partyId: partyUuid,
                  creditApplicationUuid: creditAppUuid,
                  orderUuid: orderId,
                  vehicleType: vehicleType,
                  monthlyPayment: monthlyPayment,
                  depositPayment: depositPayment,
                },
              });
            });
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
