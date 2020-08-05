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
  FulCreditCheckerMutation,
  FulCreditCheckerMutationVariables,
} from '../../../generated/FulCreditCheckerMutation';

interface IProps {
  person: SummaryFormPerson;
  orderId: string;
}

const SummaryForm: FCWithFragments<IProps> = ({ person, orderId }) => {
  const router = useRouter();
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

// export const FULL_CREDIT_CHECKER_MUTATION = gql`
//   mutation fullCreditChecker(
//     $partyId: String!
//     $creditApplicationUuid: String!
//     $orderUuid: String,
//     $vehicleType: VehicleTypeEnum!
//     $monthlyPayment: Float!
//     $depositPayment: Float!
//   ){
//     fullCreditChecker(
//      partyId: $partyId,
//           creditApplicationUuid: $creditApplicationUuid,
//           orderUuid: $orderUuid,
//           vehicleType: $vehicleType,
//           monthlyPayment: $Float,
//           depositPayment: $depositPayment
//          ){
// 		        creditCheck{
//             uuid
//             creditCheckType
//             creditCheckLines{
//               uuid
//               funder
//               likelihood
//               }
//             }
//           party{
//             uuid
//             person{
//                 uuid
//                 partyId
//                 partyUuid
//                 firstName
//                 lastName
//               }
//     }
//   }
// }

// `;

//  function useFullCreditChecker(
//   onCompleted?: (data: FulCreditCheckerMutation) => void,
// ) {
//   return useMutation<FulCreditCheckerMutation, FulCreditCheckerMutationVariables>(
//     FULL_CREDIT_CHECKER_MUTATION,
//     { onCompleted },
//   );
// }

// enum VehicleTypeEnum {
//   Car,
//   LCV
// }

export default SummaryForm;
