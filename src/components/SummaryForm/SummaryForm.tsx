import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
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
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink/RouterLink';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  person: SummaryFormPerson;
  orderId: string;
  onComplete?: () => void;
}

const getFinishedSteps = (person: SummaryFormPerson) => {
  const {
    addresses,
    employmentHistories,
    incomeAndExpense,
    bankAccounts,
    ...aboutDetails
  } = person;

  return [
    addresses,
    employmentHistories,
    incomeAndExpense,
    bankAccounts,
    aboutDetails,
  ];
};

const isContainsEmptySteps = (steps: (any | null)[]) =>
  steps.some(step => Object.values(step || {}).length === 0);

const SummaryForm: FCWithFragments<IProps> = ({
  person,
  orderId,
  onComplete,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const onCreditCheckComplete = () => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          submittedAt: new Date().toISOString(),
        },
      },
    }).then(() => onComplete?.());
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
    const params = getUrlParam({ uuid: person.uuid, redirect: router.asPath });
    const href = `${url}${params}`;
    router.push(href, href);
  };

  const isSubmitDisabled = useMemo(
    () => isContainsEmptySteps(getFinishedSteps(person)),
    [person],
  );

  return (
    <>
      <Form className="olaf-summary">
        <Heading
          color="black"
          size="xlarge"
          dataTestId="summary-heading"
          tag="h1"
        >
          Review Your Order
        </Heading>
        <Text color="darker" size="lead" dataTestId="olaf_summary_text">
          You&apos;re nearly there! Just check everything is correct and
          complete your order. We&apos;ll have you in the driving seat in no
          time
        </Text>
        <Button
          className="olaf-summary__continue-btn"
          type="button"
          color="teal"
          label="Complete Your Order"
          dataTestId="olaf_summary_continue_button"
          disabled={isSubmit || isSubmitDisabled}
          onClick={() => {
            setIsSubmit(true);
            return handleSubmit();
          }}
        />
        <SummaryFormDetailsSection
          person={person}
          onEdit={handleEdit('/olaf/about')}
        />
        <SummaryFormAddressHistory
          addresses={person.addresses || []}
          onEdit={handleEdit('/olaf/address-history')}
        />
        <SummaryFormEmploymentHistory
          employments={person.employmentHistories || []}
          onEdit={handleEdit('/olaf/employment-history')}
        />
        {person.incomeAndExpense && (
          <SummaryFormIncomeSection
            income={person.incomeAndExpense}
            onEdit={handleEdit('/olaf/expenses')}
          />
        )}
        {primaryBankAccount && (
          <SummaryFormBankDetailsSection
            account={primaryBankAccount}
            onEdit={handleEdit('/olaf/bank-details')}
          />
        )}
        <Text color="darker">
          By submitting this application you are confirming that the details you
          have entered are accurate and that that the application is made on
          your behalf.{' '}
          <RouterLink
            link={{ href: '', label: '' }}
            onClick={() => setShowModal(true)}
            classNames={{ color: 'teal' }}
          >
            Learn More
          </RouterLink>
        </Text>
        <Button
          type="button"
          color="teal"
          label="Complete Your Order"
          dataTestId="olaf_summary_continue_button"
          disabled={isSubmit || isSubmitDisabled}
          onClick={() => {
            setIsSubmit(true);
            return handleSubmit();
          }}
        />
      </Form>
      {showModal && (
        <Modal
          className="-mt-000 callBack"
          show
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <Text color="darker" size="lead">
            If you have completed this application in your name but you are not
            the main driver of the vehicle, this is a fraudulent act. People may
            do this to help other people get accepted for credit. If you have
            done this, please do not submit this order as it is considered a
            criminal offence. If we suspect fraud or that you’ve intentionally
            given inaccurate information, we may also pass this onto other
            organisations involved in crime and fraud prevention.
          </Text>
        </Modal>
      )}
    </>
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
