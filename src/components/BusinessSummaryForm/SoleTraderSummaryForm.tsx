import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
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

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
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

  const primaryBankAccount = useMemo(
    () => (creditApplication ? mapDefaultValues(creditApplication) : undefined),
    [creditApplication],
  );

  const selectLabel = isSubmitting ? 'Saving...' : 'Continue';

  const handleEdit = (
    url: string,
    additionalParameters?: { [key: string]: string },
  ) => () => {
    const params = getUrlParam({
      redirect: 'summary',
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
    <div className="full-width">
      <Heading
        color="black"
        size="xlarge"
        dataTestId="summary-heading"
        tag="h1"
      >
        Summary
      </Heading>
      <br />
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
          onEdit={handleEdit(
            '/b2b/olaf/sole-trader/company-details/[personUuid]',
            {
              companyUuid: company.uuid,
            },
          )}
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
      </Form>
      <Button
        disabled={isSubmitting}
        size="large"
        className="-mt-400"
        type="button"
        color="teal"
        label={selectLabel}
        dataTestId="olaf_summary_continue_buttton"
        onClick={onSubmit}
      />
    </div>
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
