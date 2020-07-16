import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import BusinessSummaryFormBankDetailsSection from './BusinessSummaryFormBankDetailsSection';
import BusinessSummaryFormDetailsSection from './BusinessSummaryFormDetailsSection';
import { getUrlParam } from '../../utils/url';
import { SummaryFormCompany } from '../../../generated/SummaryFormCompany';
import BusinessSummaryFormVATDetailsSection from './BusinessSummaryFormVATDetailsSection';
import BusinessSummaryFormDirectorDetailsSection from './BusinessSummaryFormDirectorDetailsSection';

interface IProps {
  company: SummaryFormCompany;
  orderId?: string;
  derivativeId?: string;
}

const BusinessSummaryForm: FCWithFragments<IProps> = ({
  company,
  orderId,
  derivativeId,
}) => {
  const router = useRouter();

  const primaryBankAccount = company.bankAccounts && company.bankAccounts.length && company.bankAccounts[company.bankAccounts.length - 1];

  const handleEdit = (url: string) => () => {
    const href = `${url}?redirect=summary${getUrlParam(
      {
        orderId,
        derivativeId,
      },
      true,
    )}`;
    router.push(href, href.replace('[uuid]', company.uuid));
  };

  return (
    <Form className="olaf--summary">
      <Heading color="black" size="xlarge" dataTestId="summary-heading">
        Summary
      </Heading>
      <BusinessSummaryFormDetailsSection
        company={company}
        onEdit={handleEdit('/b2b/olaf/about/[uuid]')}
      />
      {company.isVatRegistered && <BusinessSummaryFormVATDetailsSection
        vatDetails={company}
        onEdit={handleEdit('/olaf/employment-history/[uuid]')}
      />}
      {primaryBankAccount && (
        <BusinessSummaryFormBankDetailsSection
          account={primaryBankAccount}
          onEdit={handleEdit('/b2b/olaf/company-bank-details/[uuid]')}
        />
      )}
      <Heading color="black" size="large" dataTestId="directors-section-heading" className="olaf--summary-title">
        Director Details
      </Heading>
      <hr />
      {company.associates && company.associates.map(d => <BusinessSummaryFormDirectorDetailsSection
        director={d}
        onEdit={handleEdit('/b2b/olaf/director-details/[uuid]')}
        key={d.uuid || d.firstName + d.lastName}
      />)}
      <Button
        size="large"
        className="-mt-400"
        type="button"
        color="teal"
        label="Continue"
        dataTestId="olaf_summary_continue_buttton"
        onClick={() => {
          router.push(
            `/olaf/thank-you${getUrlParam({ orderId, derivativeId })}`,
          );
        }}
      />
    </Form>
  );
};

BusinessSummaryForm.fragments = {
  company: gql`
    fragment SummaryFormCompany on CompanyType {
      ...SummaryFormDetailsSectionCompany
      ...VatDetails
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
      associates {
        ...CompanyAssociate
      }
    }
    ${BusinessSummaryFormDetailsSection.fragments.company}
    ${BusinessSummaryFormVATDetailsSection.fragments.vatDetails}
    ${BusinessSummaryFormBankDetailsSection.fragments.account}
    ${BusinessSummaryFormDirectorDetailsSection.fragments.director}
  `,
};

export default BusinessSummaryForm;
