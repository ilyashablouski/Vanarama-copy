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
import reducer from './reducer';
import { suggestionToDisplay } from './utils';

export type AddressFinderComponent = React.FC<IAddressFinderProps> & {
  Input: typeof AddressFinderInput;
  Intermediate: typeof AddressFinderIntermediate;
  Results: typeof AddressFinderResults;
  Selected: typeof AddressFinderSelected;
  ManualAddingButton: typeof ManualAddingButton;
  ManualAddressForm: typeof ManualAddressForm;
};

const AddressFinder: AddressFinderComponent = ({
  apiKey,
  children,
  className,
  dataTestId,
  onSuggestionChange,
  selected,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    skipLookUp: false,
    showManualForm: false,
    formFocus: false,
    focused: false,
    preventBlur: false,
    value: selected?.label || '',
  });

  // Debounce state changes to value so we don't execute lots of XHR requests
  const searchTerm = useDebounce(state.value);
  const { data } = useLoqate(
    {
      text: searchTerm || selected?.label || '',
      postcode: state.intermediate?.id,
    },
    { apiKey, country: 'GB', limit: 50 },
    state.skipLookUp,
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
    onSuggestionChange(values);
    dispatch({
      type: 'SELECT_ADDRESS_MANUALLY',
      manualAddress: values,
    });
  }, []);

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
          onClearIntermediate: () => dispatch({ type: 'CLEAR_INTERMEDIATE' }),
          onManualAdding: () => dispatch({ type: 'ADD_MANUAL' }),
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
