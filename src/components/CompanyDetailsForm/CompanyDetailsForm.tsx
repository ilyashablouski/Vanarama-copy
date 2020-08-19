import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React, { useState } from 'react';
import { FormContext, OnSubmit, useForm } from 'react-hook-form';
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

interface IProps {
  onSubmit: OnSubmit<SubmissionValues>;
  company?: ICompanyDetailsFormValues;
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
    company?.companyNumber ? 'manual' : 'search',
  );

  const methods = useForm<ICompanyDetailsFormValues>({
    mode: 'onBlur',
    defaultValues: company,
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
            defaultValues={company}
            inputMode={inputMode}
          />
        </FormContext>
      )}
    </Form>
  );
};

export default CompanyDetailsForm;
