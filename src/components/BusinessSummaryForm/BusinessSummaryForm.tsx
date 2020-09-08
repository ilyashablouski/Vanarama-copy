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
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { mapDefaultValues } from '../../containers/CompanyBankDetailsFormContainer/mappers';

interface IProps {
  company: SummaryFormCompany;
  orderId: string;
  person: AboutFormPerson;
  creditApplication?: CreditApplication | null;
}

const BusinessSummaryForm: FCWithFragments<IProps> = ({
  creditApplication,
  company,
  orderId,
  person,
}) => {
  const router = useRouter();
  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});

  const primaryBankAccount = useMemo(
    () => (creditApplication ? mapDefaultValues(creditApplication) : undefined),
    [creditApplication],
  );

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
    const providedDirectorsData =
      mapDirectorsDefaultValues(creditApplication?.directorsDetails)
        .directors || [];
    const fullProvidedDirectorsData = (
      company?.associates || []
    ).filter(director =>
      providedDirectorsData?.find(
        associate =>
          associate.firstName === director.firstName &&
          associate.lastName === director.lastName,
      ),
    );

    return fullProvidedDirectorsData
      .slice()
      .sort((a, b) => (b.businessShare || 0) - (a.businessShare || 0))
      .map((d, i) => (
        <BusinessSummaryFormDirectorDetailsSection
          director={d}
          orderBySharehold={i}
          onEdit={handleEdit('/b2b/olaf/director-details/[companyUuid]', {
            directorUuid: d.uuid,
            orderId,
          })}
          key={d.uuid}
        />
      ));
  }, [company, handleEdit, orderId, creditApplication]);

  const onButtonPressed = useCallback(
    () =>
      router.push(
        '/olaf/thank-you/[orderId]?isB2b=1',
        '/olaf/thank-you/[orderId]?isB2b=1'.replace('[orderId]', orderId),
      ),
    [router, orderId],
  );

  const onClickBtn = () => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          submittedAt: new Date(),
        },
      },
    });
    onButtonPressed();
  };

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
        size="large"
        className="-mt-400"
        type="button"
        color="teal"
        label="Continue"
        dataTestId="olaf_summary_continue_buttton"
        onClick={onClickBtn}
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
