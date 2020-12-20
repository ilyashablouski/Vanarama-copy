import dynamic from 'next/dynamic';
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
import { useCompanyProfile } from '../../containers/CompanyDetailsFormContainer/gql';
import { sicCodes_sicCodes_sicData as ISicData } from '../../../generated/sicCodes';
import Skeleton from '../Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Form = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/form'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
  const [selectedCompanyData, setSelectedCompanyData] = useState<
    undefined | SearchResult
  >(undefined);
  const [hasConfirmedCompany, setHasConfirmedCompany] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('search');
  const [proceedCompany, setProceedCompany] = useState<SearchResult>();
  // save applied nature values
  const [applyedNatureOfBusiness, setNatureOfBusiness] = useState<string[]>([]);

  const methods = useForm<ICompanyDetailsFormValues>({
    mode: 'onBlur',
  });

  const companySearchResult = methods.watch('companySearchResult');

  const [getCompanyDetails, { data }] = useCompanyProfile(
    selectedCompanyData?.companyNumber || '',
  );

  useEffect(() => {
    if (company !== undefined && companySearchResult === undefined) {
      methods.reset(company);
      setProceedCompany(company?.companySearchResult);
      setHasConfirmedCompany(true);
      setNatureOfBusiness(company.nature.split('.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (selectedCompanyData?.companyNumber) {
      getCompanyDetails();
    }
  }, [selectedCompanyData, getCompanyDetails]);

  const handleNatureSelect = (selectedNature: string | string[]) => {
    const isArray = Array.isArray(selectedNature);
    setNatureOfBusiness(
      (isArray ? selectedNature : [selectedNature]) as string[],
    );
  };

  useEffect(() => {
    if (data?.companyProfile.sicData) {
      const descriptions = data?.companyProfile.sicData.map(
        (sicData: ISicData) => sicData.description,
      );
      handleNatureSelect(descriptions);
    }
  }, [data]);

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
          nature: applyedNatureOfBusiness.join('.'),
        }),
      )}
    >
      <Heading
        color="black"
        dataTestId="company-details_heading"
        size="xlarge"
        tag="h1"
      >
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
            inputMode={inputMode}
            setNatureValue={handleNatureSelect}
            natureOfBusinessValue={applyedNatureOfBusiness}
          />
        </FormContext>
      )}
    </Form>
  );
};

export default CompanyDetailsForm;
