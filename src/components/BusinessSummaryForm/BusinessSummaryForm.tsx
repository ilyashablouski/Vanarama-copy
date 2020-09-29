import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import BusinessSummaryFormBankDetailsSection from './BusinessSummaryFormBankDetailsSection';
import BusinessSummaryFormDetailsSection from './BusinessSummaryFormDetailsSection';
import { getUrlParam } from '../../utils/url';
import { SummaryFormCompany } from '../../../generated/SummaryFormCompany';
import BusinessSummaryFormVATDetailsSection from './BusinessSummaryFormVATDetailsSection';
import BusinessSummaryFormDirectorDetailsSection from './BusinessSummaryFormDirectorDetailsSection';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import BusinessSummaryFormAboutSection from './BusinessSummaryFormAboutSection';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { mapDirectorsDefaultValues } from '../../containers/DirectorDetailsFormContainer/mappers';
import { mapDefaultValues } from '../../containers/CompanyBankDetailsFormContainer/mappers';
import { DirectorDetails } from '../DirectorDetailsForm/interfaces';

interface IProps {
  company: SummaryFormCompany;
  orderId: string;
  person: AboutFormPerson;
  creditApplication?: CreditApplication | null;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const BusinessSummaryForm: FCWithFragments<IProps> = ({
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

  const directors = useMemo(() => {
    const providedDirectorsData = (mapDirectorsDefaultValues(
      creditApplication?.directorsDetails,
    ).directors || []) as DirectorDetails[];

    return providedDirectorsData
      .slice()
      .sort((a, b) => (+b.shareOfBusiness || 0) - (+a.shareOfBusiness || 0))
      .map((d, i) => (
        <BusinessSummaryFormDirectorDetailsSection
          director={d}
          orderBySharehold={i}
          onEdit={handleEdit('/b2b/olaf/director-details/[companyUuid]', {
            directorUuid: d.uuid || '',
            orderId,
          })}
          key={d.uuid}
        />
      ));
  }, [handleEdit, orderId, creditApplication]);

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
        <BusinessSummaryFormDetailsSection
          company={company}
          onEdit={handleEdit('/b2b/olaf/company-details/[personUuid]', {
            companyUuid: company.uuid,
            orderId,
          })}
        />
        {company.isVatRegistered && (
          <BusinessSummaryFormVATDetailsSection
            vatDetails={company}
            onEdit={handleEdit('/b2b/olaf/vat-details/[companyUuid]', {
              orderId,
            })}
          />
        )}
        <Heading
          color="black"
          size="large"
          dataTestId="directors-section-heading"
          className="olaf--summary-title"
        >
          Director Details
        </Heading>
        <hr />
        <div>{directors}</div>
        {primaryBankAccount && (
          <BusinessSummaryFormBankDetailsSection
            account={primaryBankAccount}
            onEdit={handleEdit('/b2b/olaf/company-bank-details/[companyUuid]', {
              orderId,
            })}
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
