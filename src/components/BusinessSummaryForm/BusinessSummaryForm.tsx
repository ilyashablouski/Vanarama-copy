import dynamic from 'next/dynamic';
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
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  company: SummaryFormCompany;
  person: AboutFormPerson;
  creditApplication?: CreditApplication | null;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const BusinessSummaryForm: FCWithFragments<IProps> = ({
  creditApplication,
  company,
  person,
  onSubmit,
  isSubmitting,
}) => {
  const router = useRouter();

  const primaryBankAccount = useMemo(
    () =>
      (creditApplication?.bankAccountsV2 || []).length > 0
        ? mapDefaultValues(creditApplication)
        : undefined,
    [creditApplication],
  );

  const selectLabel = isSubmitting ? 'Saving...' : 'Complete Your Order';

  const handleEdit = useCallback(
    (url: string, additionalParameters?: { [key: string]: string }) => () => {
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
    },
    [company.uuid, person.uuid, router],
  );

  const directors = useMemo(() => {
    const providedDirectorsData = (mapDirectorsDefaultValues(
      creditApplication?.directorsDetailsV2,
    ).directors || []) as DirectorDetails[];

    return providedDirectorsData
      .slice()
      .sort((a, b) => (+b.shareOfBusiness ?? 0) - (+a.shareOfBusiness ?? 0))
      .map((d, i) => (
        <BusinessSummaryFormDirectorDetailsSection
          director={d}
          orderBySharehold={i}
          onEdit={handleEdit('/b2b/olaf/director-details/[companyUuid]', {
            directorUuid: d.uuid || '',
          })}
          key={d.uuid}
        />
      ));
  }, [handleEdit, creditApplication]);

  return (
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
        You&apos;re nearly there! Just check everything is correct and complete
        your order. We&apos;ll have you in the driving seat in no time
      </Text>
      <Button
        disabled={isSubmitting}
        className="olaf-summary__continue-btn"
        type="button"
        color="teal"
        label={selectLabel}
        dataTestId="olaf_summary_continue_button"
        onClick={onSubmit}
      />
      <Form className="olaf--summary">
        <BusinessSummaryFormAboutSection
          person={person}
          onEdit={handleEdit('/b2b/olaf/about', {
            companyUuid: company.uuid,
          })}
        />
        <BusinessSummaryFormDetailsSection
          company={company}
          onEdit={handleEdit('/b2b/olaf/company-details', {
            companyUuid: company.uuid,
          })}
        />
        {company.isVatRegistered && (
          <BusinessSummaryFormVATDetailsSection
            vatDetails={company}
            onEdit={handleEdit('/b2b/olaf/vat-details/[companyUuid]')}
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
            onEdit={handleEdit('/b2b/olaf/company-bank-details/[companyUuid]')}
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
        dataTestId="olaf_summary_continue_button"
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
