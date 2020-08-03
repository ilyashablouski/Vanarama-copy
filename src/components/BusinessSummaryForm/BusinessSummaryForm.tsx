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

interface IProps {
  company: SummaryFormCompany;
  orderId: string;
  person: AboutFormPerson;
}

const BusinessSummaryForm: FCWithFragments<IProps> = ({
  company,
  orderId,
  person,
}) => {
  const router = useRouter();

  const primaryBankAccount =
    company.bankAccounts &&
    company.bankAccounts.length &&
    company.bankAccounts[company.bankAccounts.length - 1];

  const handleEdit = useCallback(
    (url: string, additionalParameters?: { [key: string]: string }) => () => {
      const params = getUrlParam({
        orderId,
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
    },
    [company.uuid, orderId, person.uuid, router],
  );

  const directors = useMemo(
    () =>
      (company.associates &&
        company.associates.length &&
        company.associates
          .slice()
          .sort((a, b) => (b.businessShare || 0) - (a.businessShare || 0))
          .map((d, i) => (
            <BusinessSummaryFormDirectorDetailsSection
              director={d}
              orderBySharehold={i}
              onEdit={handleEdit('/b2b/olaf/director-details/[companyUuid]', {
                directorUuid: d.uuid,
              })}
              key={d.uuid}
            />
          ))) ||
      null,
    [company.associates, handleEdit],
  );

  const onButtonPressed = useCallback(
    () =>
      router.push(
        '/olaf/thank-you/[orderId]',
        '/olaf/thank-you/[orderId]'.replace('[orderId]', orderId),
      ),
    [router, orderId],
  );

  return (
    <div>
      <Heading
        color="black"
        size="xlarge"
        dataTestId="summary-heading"
        tag="span"
      >
        Summary
      </Heading>
      <br />
      <Form className="olaf--summary">
        <BusinessSummaryFormAboutSection
          person={person}
          onEdit={handleEdit('/b2b/olaf/about', {
            companyUuid: company.uuid,
          })}
        />
        <BusinessSummaryFormDetailsSection
          company={company}
          onEdit={handleEdit('/b2b/olaf/company-details/[personUuid]', {
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
        size="large"
        className="-mt-400"
        type="button"
        color="teal"
        label="Continue"
        dataTestId="olaf_summary_continue_buttton"
        onClick={onButtonPressed}
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
