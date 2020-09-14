import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React, { useState, useEffect } from 'react';
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
import { useCompanyProfile, useSicCodes } from '../../containers/CompanyDetailsFormContainer/gql';
import { isArraySame } from 'utils/helpers';
import useDebounce from 'hooks/useDebounce';

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
  const [selectedCompanyData, setSelectedCompanyData] = useState<undefined|SearchResult>(undefined);
  const [hasConfirmedCompany, setHasConfirmedCompany] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('search');
  const [proceedCompany, setProceedCompany] = useState<SearchResult>()
  // save applied natural values
  const [applyedNatureOfBusiness, setNatureOfBusiness] = useState<string[]>([]);
  // value for autocomplete
  const [natureSearchValue, setNatureSearchValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(natureSearchValue);
  // variants
  const suggestions = useSicCodes(debouncedSearchTerm);


  // TODO: set natural values to field

  const methods = useForm<ICompanyDetailsFormValues>({
    mode: 'onBlur',
  });

  const companySearchResult = methods.watch('companySearchResult');
  const natureOfBusiness = methods.watch('nature');

  const [getCompanyDetails, {data}] = useCompanyProfile(selectedCompanyData?.companyNumber || '');

  // find changable part of string for pass to search nature request
  useEffect(() => {
    if(applyedNatureOfBusiness.length) {
      const trimArray = natureOfBusiness.split(',').filter(Boolean);
      if(!isArraySame(trimArray, applyedNatureOfBusiness)) {
        const [searchValue] = trimArray.filter( ( el ) => !applyedNatureOfBusiness.includes( el ) );
        setNatureSearchValue(searchValue);
      }
    }
  }, [natureOfBusiness])

  useEffect(() => {
    if (company !== undefined && companySearchResult === undefined) {
      methods.reset(company);
      setProceedCompany(company?.companySearchResult);
      setHasConfirmedCompany(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (selectedCompanyData?.companyNumber) {
      getCompanyDetails();
    }
  }, [selectedCompanyData?.companyNumber]);

  useEffect(() => {
    if (data?.companyProfile.sicCodes) {
      methods.setValue('nature', data?.companyProfile.sicCodes.join(), true);
    }
  }, [data?.companyProfile, methods]);

  const clearSearchResult = () => {
    setCompanySearchTerm('');
    methods.reset({
      companySearchResult: undefined,
    });
    setHasConfirmedCompany(false);
    setProceedCompany(undefined);
  };

  const handleManualClick = () => {
    setInputMode('manual');
    clearSearchResult();
  };

  const handleCompanySelect = (selectedCompany: SearchResult) => {
    methods.setValue('companySearchResult', selectedCompany, true);
    setSelectedCompanyData(selectedCompany);
    setInputMode('search');
  };

  // handle nature select
  const handleNatureSelect = () => {
    // input data

    // get value from input -> compare with applyedNatureOfBusiness -> save only includes values -> push new value
    // set value to form
  }

  const handleProceed = () => {
    setHasConfirmedCompany(true);
    setProceedCompany(companySearchResult);
  };

  return (
    <Form
      onSubmit={methods.handleSubmit(values =>
        onSubmit({
          ...values,
          uuid: company?.uuid,
          companySearchResult: values.companySearchResult ?? proceedCompany,
          inputMode,
        }),
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
          <CompanyDetailsFormFields isEdited={isEdited} inputMode={inputMode} />
        </FormContext>
      )}
    </Form>
  );
};

export default CompanyDetailsForm;
