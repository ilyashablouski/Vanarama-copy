import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import BusinessSummaryFormBankDetailsSection from './BusinessSummaryFormBankDetailsSection';
import { getUrlParam } from '../../utils/url';
import { SummaryFormSoleTrader } from '../../../generated/SummaryFormSoleTrader';
import BusinessSummaryFormVATDetailsSection from './BusinessSummaryFormVATDetailsSection';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import BusinessSummaryFormAboutSection from './BusinessSummaryFormAboutSection';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { mapDefaultValues } from '../../containers/CompanyBankDetailsFormContainer/mappers';
import SoleTraderDetailsForm from '../SoleTraderDetailsForm';
import SoleTraderCompanyDetailsSummarySection from './SoleTraderCompanyDetailsSummarySection';
import SoleTraderDetailsSummarySection from './SoleTraderDetailsSummarySection';

interface IProps {
  company: SummaryFormSoleTrader;
  orderId: string;
  person: AboutFormPerson;
  creditApplication?: CreditApplication | null;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const SoleTraderSummaryForm: FCWithFragments<IProps> = ({
  creditApplication,
  company,
  orderId,
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

  const handleEdit = useCallback(
    (url: string, additionalParameters?: { [key: string]: string }) => () => {
      const params = getUrlParam({
        redirect: 'summary',
        ...additionalParameters,
      });
      const href = `${url}${params}`;
      router.push(
        href,
        href
          .replace('[companyUuid]', company.uuid)
          .replace('[personUuid]', person.uuid)
          .replace('[orderId]', orderId),
      );
    },
    [company.uuid, orderId, person.uuid, router],
  );

  return (
    <div>
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
          person={person}
          onEdit={handleEdit('/b2b/olaf/about/[orderId]', {
            companyUuid: company.uuid,
          })}
        />
        <SoleTraderCompanyDetailsSummarySection
          company={company}
          onEdit={handleEdit(
            '/b2b/olaf/sole-trader/company-details/[personUuid]',
            {
              companyUuid: company.uuid,
              orderId,
            },
          )}
        />
        {company.isVatRegistered && (
          <BusinessSummaryFormVATDetailsSection
            vatDetails={company}
            onEdit={handleEdit(
              '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
              {
                orderId,
              },
            )}
          />
        )}
        <SoleTraderDetailsSummarySection
          soleTrader={company.associates?.[0]}
          onEdit={handleEdit(
            '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
            {
              orderId,
            },
          )}
        />
        {primaryBankAccount && (
          <BusinessSummaryFormBankDetailsSection
            account={primaryBankAccount}
            onEdit={handleEdit(
              '/b2b/olaf/sole-Trader/company-bank-details/[companyUuid]',
              {
                orderId,
              },
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
