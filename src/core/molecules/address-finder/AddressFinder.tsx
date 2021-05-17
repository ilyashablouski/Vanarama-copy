import cx from 'classnames';
import React, { useEffect, useReducer, useCallback } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useLoqate from '../../../hooks/useLoqate';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import AddressFinderInput from './components/AddressFinderInput';
import ManualAddingButton from './components/ManualAddingButton';
import ManualAddressForm from './components/ManualAddressForm';
import AddressFinderIntermediate from './components/AddressFinderIntermediate';
import AddressFinderResults from './components/AddressFinderResults';
import AddressFinderSelected from './components/AddressFinderSelected';
import { AddressFinderProvider } from './context';
import { IAddressFinderProps, IManualAddressFormValues } from './interfaces';
import reducer, { initialState, InputTypeEnum } from './reducer';
import { suggestionToDisplay } from './utils';

export type AddressFinderComponent = React.FC<IAddressFinderProps> & {
  Input: typeof AddressFinderInput;
  ManualAddingButton: typeof ManualAddingButton;
  Results: typeof AddressFinderResults;
  Selected: typeof AddressFinderSelected;
  ManualAddressForm: typeof ManualAddressForm;
  Intermediate: typeof AddressFinderIntermediate;
};

const formatAddress = (values: any) =>
  `${values?.lineOne}${(values?.lineTwo || '') && `, ${values?.lineTwo}`} - ${
    values?.city
  }, ${values?.postcode}`;

const AddressFinder: AddressFinderComponent = ({
  apiKey,
  children,
  className,
  dataTestId,
  onSuggestionChange,
  selected,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Debounce state changes to value so we don't execute lots of XHR requests
  const text = useDebounce(state.value.label || '');
  const query = {
    text:
      state.inputType === InputTypeEnum.LOOKUP ? selected?.label || text : text,
    postcode: state.intermediate?.id,
  };
  const shouldSkipLookUp = state.inputType === InputTypeEnum.MANUAL;
  const { data } = useLoqate(
    query,
    { apiKey, country: 'GB', limit: 50 },
    shouldSkipLookUp,
  );

  function handleSuggestionSelect(loqateSuggestion: ILoqateSuggestion) {
    // only suggestions with type Address have ID
    if (loqateSuggestion.type === 'Address') {
      dispatch({ type: 'SELECT_ADDRESS', suggestion: loqateSuggestion });
      onSuggestionChange({
        id: loqateSuggestion.id,
        label: suggestionToDisplay(loqateSuggestion),
      });
    } else {
      dispatch({ type: 'SELECT_POSTCODE', suggestion: loqateSuggestion });
      dispatch({ type: 'FOCUS_FORM' });
    }
  }

  useEffect(() => {
    if (!selected?.id && selected?.label && data.length) {
      if (
        (data.length === 1 && data[0].type === 'Address') ||
        state.intermediate
      ) {
        handleSuggestionSelect(data[0]);
      } else {
        // force user to input address in case
        // if there are not one specific suggestion
        dispatch({ type: 'CHANGE_INPUT', value: '' });
        onSuggestionChange();
      }
    }
  }, [data, selected]);

  const handleManualAdding = useCallback<
    (values: IManualAddressFormValues) => void
  >(values => {
    const label = formatAddress(values);
    dispatch({
      type: 'SELECT_ADDRESS_MANUALLY',
      manualAddress: { ...values, label },
    });
    onSuggestionChange({
      ...values,
      label,
    });
  }, []);

  const handleSuggestionChange = useCallback(() => {
    if (state.inputType === InputTypeEnum.MANUAL) {
      dispatch({ type: 'SHOW_MANUAL_ADDING_FORM' });
    }
    onSuggestionChange();
  }, [state]);

  return (
    <div className={cx('address-finder', className)} data-testid={dataTestId}>
      <AddressFinderProvider
        value={{
          data,
          value: state.value,
          formFocus: state.formFocus,
          preventBlur: state.preventBlur,
          intermediate: state.intermediate,
          showManualForm: state.showManualForm,
          inputFocused: state.focused,
          selectedSuggestion: selected,
          onChange: e =>
            dispatch({ type: 'CHANGE_INPUT', value: e.target.value }),
          setInputBlur: () => dispatch({ type: 'BLUR_INPUT' }),
          setBlurForm: () => dispatch({ type: 'BLUR_FORM' }),
          setInputFocus: () => dispatch({ type: 'FOCUS_INPUT' }),
          onClearSuggestion: () => onSuggestionChange(),
          onEditSuggestion: () => handleSuggestionChange(),
          onClearIntermediate: () => dispatch({ type: 'CLEAR_INTERMEDIATE' }),
          onManualAdding: () => dispatch({ type: 'SHOW_MANUAL_ADDING_FORM' }),
          onBackToSearch: () => dispatch({ type: 'BACK_TO_SEARCH' }),
          onSuggestionSelected: handleSuggestionSelect,
          onManualSubmit: handleManualAdding,
        }}
      >
        {children}
      </AddressFinderProvider>
    </div>
  );
};

AddressFinder.Input = AddressFinderInput;
AddressFinder.Intermediate = AddressFinderIntermediate;
AddressFinder.Results = AddressFinderResults;
AddressFinder.Selected = AddressFinderSelected;
AddressFinder.ManualAddingButton = ManualAddingButton;
AddressFinder.ManualAddressForm = ManualAddressForm;

export default AddressFinder;
