import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React, { useState, useMemo } from 'react';
import { FormContext, OnSubmit, useForm } from 'react-hook-form';
import moment from 'moment';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import CompanyCard from './CompanyCard';
import CompanyDetailsFormFields from './CompanyDetailsFormFields';
import CompanyTypeahead from './CompanyTypeahead';
import {
  ICompanyDetailsFormValues,
  InputMode,
  SubmissionValues,
} from './interfaces';
import SearchActions from './SearchActions';
import { SummaryFormDetailsSectionCompany } from '../../../generated/SummaryFormDetailsSectionCompany';
import { addressToDisplay } from '../../utils/address';

interface IProps {
  onSubmit: OnSubmit<SubmissionValues>;
  company?: SummaryFormDetailsSectionCompany | null;
  isEdited: boolean;
}

const CompanyDetailsForm: React.FC<IProps> = ({
  onSubmit,
  company,
  isEdited,
}) => {
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [hasConfirmedCompany, setHasConfirmedCompany] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>(
    company ? 'search' : 'manual',
  );

  const tradingSince =
    (company?.tradingSince && moment(company.tradingSince)) || undefined;
  const registeredAddresses =
    company?.addresses &&
    company.addresses.filter(a => a.kind === 'registered');
  const registeredAddress =
    (registeredAddresses &&
      registeredAddresses[0] && {
        id: registeredAddresses[0].serviceId || '',
        label: addressToDisplay(registeredAddresses[0]),
      }) ||
    undefined;
  const tradingAddresses =
    company?.addresses && company.addresses.filter(a => a.kind === 'trading');
  const tradingAddress =
    (tradingAddresses &&
      tradingAddresses[0] && {
        id: tradingAddresses[0].serviceId || '',
        label: addressToDisplay(tradingAddresses[0]),
      }) ||
    registeredAddress ||
    undefined;
  const defaultValues = useMemo(
    () => ({
      companyName: company?.legalName || '',
      companyNumber: company?.companyNumber || '',
      tradingSinceMonth: tradingSince && (tradingSince.month() + 1).toString(),
      tradingSinceYear: tradingSince && tradingSince.year().toString(),
      nature: company?.companyNature || '',
      registeredAddress,
      tradingAddress,
      tradingDifferent:
        (registeredAddress && registeredAddress !== tradingAddress) || false,
      telephone:
        (company?.telephoneNumbers && company?.telephoneNumbers[0].value) || '',
      email:
        (company?.emailAddresses && company?.emailAddresses[0].value) || '',
    }),
    [company, tradingSince, registeredAddress, tradingAddress],
  );
  const methods = useForm<ICompanyDetailsFormValues>({
    mode: 'onBlur',
    defaultValues,
  });

  const companySearchResult = methods.watch('companySearchResult');
  const clearSearchResult = () => {
    setCompanySearchTerm('');
    methods.setValue('companySearchResult', undefined, true);
    setHasConfirmedCompany(false);
  };

  const handleManualClick = () => {
    setInputMode('manual');
    clearSearchResult();
  };

  const handleCompanySelect = (selectedCompany: SearchResult) => {
    methods.setValue('companySearchResult', selectedCompany, true);
    setInputMode('search');
  };

  const handleProceed = () => {
    setHasConfirmedCompany(true);
  };

  return (
    <Form
      onSubmit={methods.handleSubmit(values =>
        onSubmit({ ...values, inputMode }),
      )}
    >
      <Heading color="black" dataTestId="company-details_heading" size="xlarge">
        Company Details
      </Heading>
      <FormContext {...methods}>
        <CompanyTypeahead
          onChange={setCompanySearchTerm}
          onCompanySelected={handleCompanySelect}
          value={companySearchTerm}
        />
      </FormContext>
      {companySearchResult && (
        <>
          <CompanyCard company={companySearchResult} />
          <SearchActions
            hasConfirmedCompany={hasConfirmedCompany}
            onProceed={handleProceed}
            onSearchAgain={clearSearchResult}
          />
        </>
      )}
      {inputMode === 'search' && (
        <Button
          color="primary"
          dataTestId="company-details_enter-manually"
          fill="clear"
          label="I’d Rather Enter My Details Manually"
          onClick={handleManualClick}
          type="button"
        />
      )}
      {(hasConfirmedCompany || inputMode === 'manual') && (
        <FormContext {...methods}>
          <CompanyDetailsFormFields
            isEdited={isEdited}
            defaultValues={defaultValues}
            inputMode={inputMode}
          />
        </FormContext>
      )}
    </Form>
  );
};

export default CompanyDetailsForm;
