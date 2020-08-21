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
import parseCreditApplicationData from './Utils';
import {
  fullCreditChecker,
  fullCreditCheckerVariables,
} from '../../../generated/fullCreditChecker';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  FULL_CREDIT_CHECKER_MUTATION,
  GET_CREDIT_APPLICATION_BY_ORDER_UUID,
  GET_PARTY_BY_UUID,
} from './gql';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';

interface IProps {
  person: SummaryFormPerson;
  orderId: string;
}

const SummaryForm: FCWithFragments<IProps> = ({ person, orderId }) => {
  const router = useRouter();

  const onCreditCheckComplete = () => {
    router.push(
      '/olaf/thank-you/[orderId]',
      '/olaf/thank-you/[orderId]'.replace('[orderId]', orderId),
    );
  };

  const [createCreditCheckMutation] = useMutation<
    fullCreditChecker,
    fullCreditCheckerVariables
  >(FULL_CREDIT_CHECKER_MUTATION, {
    onCompleted: onCreditCheckComplete,
  });

  const creditCheck = React.useCallback(
    (
      partyUuid: string,
      creditAppUuid: string,
      vehicleType: VehicleTypeEnum,
      monthlyPayment: number,
      depositPayment: number,
    ) => {
      createCreditCheckMutation({
        variables: {
          partyId: partyUuid,
          creditApplicationUuid: creditAppUuid,
          orderUuid: orderId,
          vehicleType,
          monthlyPayment,
          depositPayment,
        },
      });
    },
    [createCreditCheckMutation, orderId],
  );

  const getParty = useImperativeQuery(GET_PARTY_BY_UUID);

  const getCreditApplication = useImperativeQuery(
    GET_CREDIT_APPLICATION_BY_ORDER_UUID,
  );

  const handleSubmit = React.useCallback(() => {
    getCreditApplication({
      orderUuid: orderId,
    }).then(response => {
      const partyUuid =
        response.data?.creditApplicationByOrderUuid?.lineItem?.order
          ?.partyUuid || '';
      getParty({
        uuid: partyUuid,
      }).then(resp => {
        const {
          creditAppUuid,
          vehicleType,
          monthlyPayment,
          depositPayment,
        } = parseCreditApplicationData(
          response.data.creditApplicationByOrderUuid,
        );
        creditCheck(
          resp.data.partyByUuid?.person?.partyId || '',
          creditAppUuid,
          vehicleType,
          monthlyPayment,
          depositPayment,
        );
      });
    });
  }, [getCreditApplication, orderId, getParty, creditCheck]);

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
          handleSubmit();
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
