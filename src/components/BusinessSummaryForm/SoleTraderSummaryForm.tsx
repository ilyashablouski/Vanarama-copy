import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import BusinessSummaryFormBankDetailsSection from './BusinessSummaryFormBankDetailsSection';
import { getUrlParam } from '../../utils/url';
import { SummaryFormSoleTrader } from '../../../generated/SummaryFormSoleTrader';
import BusinessSummaryFormVATDetailsSection from './BusinessSummaryFormVATDetailsSection';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { mapDefaultValues } from '../../containers/CompanyBankDetailsFormContainer/mappers';
import SoleTraderDetailsForm from '../SoleTraderDetailsForm';
import SoleTraderCompanyDetailsSummarySection from './SoleTraderCompanyDetailsSummarySection';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink/RouterLink';
import { ICompanyBankDetails } from '../CompanyBankDetails/interfaces';

const Button = dynamic(() => import('core/atoms/button/'), {
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
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const SoleTraderDetailsSummarySection = dynamic(
  () => import('./SoleTraderDetailsSummarySection'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const BusinessSummaryFormAboutSection = dynamic(
  () => import('./BusinessSummaryFormAboutSection'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface IProps {
  company: SummaryFormSoleTrader;
  person: AboutFormPerson;
  creditApplication?: CreditApplication | null;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const SoleTraderSummaryForm: FCWithFragments<IProps> = ({
  creditApplication,
  company,
  person,
  onSubmit,
  isSubmitting,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const primaryBankAccount = useMemo<ICompanyBankDetails | undefined>(
    () =>
      (creditApplication?.bankAccountsV2 || []).length > 0
        ? mapDefaultValues(creditApplication)
        : undefined,
    [creditApplication],
  );

  const selectLabel = isSubmitting ? 'Saving...' : 'Complete Your Order';

  const handleEdit = (
    url: string,
    additionalParameters?: { [key: string]: string },
  ) => () => {
    const params = getUrlParam({
      redirect: router.asPath,
      ...additionalParameters,
    });
    const href = `${url}${params}`;
    router.push(
      href,
      href
        .replace('[companyUuid]', company.uuid)
        .replace('[personUuid]', person.uuid),
    );
  };

  return (
    <>
      <div className="full-width olaf-summary">
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
          disabled={isSubmitting}
          style={{ width: '220px' }}
          className="olaf-summary__continue-btn"
          type="button"
          color="teal"
          label={selectLabel}
          dataTestId="olaf_summary_continue_buttton"
          onClick={onSubmit}
        />
        <Form className="olaf--summary">
          <BusinessSummaryFormAboutSection
            soletrader
            person={person}
            onEdit={handleEdit('/b2b/olaf/about/', {
              companyUuid: company.uuid,
            })}
          />
          <SoleTraderCompanyDetailsSummarySection
            company={company}
            onEdit={handleEdit('/b2b/olaf/sole-trader/company-details', {
              companyUuid: company.uuid,
            })}
          />
          {company.isVatRegistered && (
            <BusinessSummaryFormVATDetailsSection
              vatDetails={company}
              onEdit={handleEdit(
                '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
              )}
            />
          )}
          <SoleTraderDetailsSummarySection
            soleTrader={company.associates?.[0]}
            onEdit={handleEdit(
              '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
            )}
          />
          {primaryBankAccount && (
            <BusinessSummaryFormBankDetailsSection
              account={primaryBankAccount}
              onEdit={handleEdit(
                '/b2b/olaf/sole-trader/bank-details/[companyUuid]',
              )}
            />
          )}
          <div>
            <Text color="darker">
              By submitting this application you are confirming that the details
              you have entered are accurate and that that the application is
              made on your behalf.{' '}
              <RouterLink
                link={{ href: '', label: '' }}
                onClick={() => setShowModal(true)}
                classNames={{ color: 'teal' }}
              >
                Learn More
              </RouterLink>
            </Text>
          </div>
          <Button
            disabled={isSubmitting}
            style={{ width: '100%' }}
            size="large"
            className="-mt-400"
            type="button"
            color="teal"
            label={selectLabel}
            dataTestId="olaf_summary_continue_buttton"
            onClick={onSubmit}
          />
        </Form>
      </div>
      {showModal && (
        <Modal
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

SoleTraderSummaryForm.fragments = {
  company: gql`
    fragment SummaryFormSoleTrader on CompanyType {
      ...SoleTraderCompanyDetailsSummary
      ...VatDetails
      ...SoleTraderAssociate
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
    }
    ${SoleTraderCompanyDetailsSummarySection.fragments.company}
    ${SoleTraderDetailsForm.fragments.soleTrader}
    ${BusinessSummaryFormVATDetailsSection.fragments.vatDetails}
    ${BusinessSummaryFormBankDetailsSection.fragments.account}
  `,
};

export default SoleTraderSummaryForm;
