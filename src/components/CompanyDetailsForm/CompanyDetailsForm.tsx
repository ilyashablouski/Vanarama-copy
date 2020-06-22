import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React, { useEffect, useReducer } from 'react';
import { FormContext, useForm, OnSubmit } from 'react-hook-form';
import CompanyCard from './CompanyCard';
import CompanyTypeahead from './CompanyTypeahead';
import CompanyDetailsFormFields from './CompanyDetailsFormFields';
import { ICompanyDetailsFormValues, InputMode } from './interfaces';
import reducer from './reducer';
import SearchActions from './SearchActions';
import { SearchCompaniesQuery_searchCompanies_nodes as CompanySearchResult } from '../../../generated/SearchCompaniesQuery';

type SubmissionValues = ICompanyDetailsFormValues & {
  confirmedCompany?: CompanySearchResult;
  inputMode: InputMode;
};

interface IProps {
  onSubmit: OnSubmit<SubmissionValues>;
}

const CompanyDetailsForm: React.FC<IProps> = ({ onSubmit }) => {
  const methods = useForm<ICompanyDetailsFormValues>({
    mode: 'onBlur',
    defaultValues: {
      telephone: '',
    },
  });

  const [
    { companySearchTerm, inputMode, confirmedCompany, tentativeCompany },
    dispatch,
  ] = useReducer(reducer, {
    companySearchTerm: '',
    inputMode: 'search',
  });

  const showForm = confirmedCompany || inputMode === 'manual';
  useEffect(() => {
    // Each time the mode changes to manual, clear the selected company
    if (inputMode === 'manual') {
      dispatch({ type: 'CLEAR_COMPANY' });
    }
  }, [inputMode]);

  useEffect(() => {
    // Each time the tentative company is set, change the mode to search
    if (tentativeCompany) {
      dispatch({ type: 'SET_SEARCH_MODE' });
    }
  }, [tentativeCompany]);

  return (
    <Form
      onSubmit={methods.handleSubmit(values =>
        onSubmit({
          ...values,
          confirmedCompany,
          inputMode,
        }),
      )}
    >
      <Heading color="black" dataTestId="company-details_heading" size="xlarge">
        Company Details
      </Heading>
      <FormContext {...methods}>
        <CompanyTypeahead
          onChange={value => dispatch({ type: 'TYPE_COMPANY_NAME', value })}
          onCompanySelected={company =>
            dispatch({ type: 'COMPANY_SELECTED', company })
          }
          value={companySearchTerm}
        />
        {tentativeCompany && (
          <>
            <CompanyCard company={tentativeCompany} />
            <SearchActions
              confirmedCompany={confirmedCompany}
              onProceed={() =>
                dispatch({ type: 'PROCEED', company: tentativeCompany })
              }
              onSearchAgain={() => dispatch({ type: 'SEARCH_AGAIN' })}
            />
          </>
        )}
        {inputMode === 'search' && (
          <Button
            color="primary"
            dataTestId="company-details_enter-manually"
            fill="clear"
            label="I’d Rather Enter My Details Manually"
            onClick={() => dispatch({ type: 'SET_MANUAL_MODE' })}
            type="button"
          />
        )}
        {showForm && <CompanyDetailsFormFields inputMode={inputMode} />}
      </FormContext>
    </Form>
  );
};

export default CompanyDetailsForm;
