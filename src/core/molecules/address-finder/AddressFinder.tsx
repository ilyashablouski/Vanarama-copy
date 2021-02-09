import cx from 'classnames';
import React, { useReducer, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useLoqate from '../../../hooks/useLoqate';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import AddressFinderInput from './components/AddressFinderInput';
import AddressFinderIntermediate from './components/AddressFinderIntermediate';
import AddressFinderResults from './components/AddressFinderResults';
import AddressFinderSelected from './components/AddressFinderSelected';
import { AddressFinderProvider } from './context';
import { IAddressFinderProps } from './interfaces';
import reducer from './reducer';
import { suggestionToDisplay } from './utils';

export type AddressFinderComponent = React.FC<IAddressFinderProps> & {
  Input: typeof AddressFinderInput;
  Intermediate: typeof AddressFinderIntermediate;
  Results: typeof AddressFinderResults;
  Selected: typeof AddressFinderSelected;
};

const AddressFinder: AddressFinderComponent = ({
  apiKey,
  children,
  className,
  dataTestId,
  onSuggestionChange,
  selected,
}) => {
  const [{ focused, intermediate, preventBlur, value }, dispatch] = useReducer(
    reducer,
    {
      focused: false,
      preventBlur: false,
      value: selected?.label || '',
    },
  );

  // Debounce state changes to value so we don't execute lots of XHR requests
  const searchTerm = useDebounce(value);
  const { data } = useLoqate(
    { text: searchTerm || selected?.label || '', postcode: intermediate?.id },
    { apiKey, country: 'GB', limit: 50 },
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
    }
  }

  useEffect(() => {
    if (!selected?.id && selected?.label && data.length) {
      if ((data.length === 1 && data[0].type === 'Address') || intermediate) {
        handleSuggestionSelect(data[0]);
      } else {
        // force user to input address in case
        // if there are not one specific suggestion
        dispatch({ type: 'CHANGE_INPUT', value: '' });
        onSuggestionChange();
      }
    }
  }, [data, selected]);

  return (
    <div className={cx('address-finder', className)} data-testid={dataTestId}>
      <AddressFinderProvider
        value={{
          data,
          value,
          intermediate,
          preventBlur,
          inputFocused: focused,
          selectedSuggestion: selected,
          onChange: e =>
            dispatch({ type: 'CHANGE_INPUT', value: e.target.value }),
          setInputBlur: () => dispatch({ type: 'BLUR_INPUT' }),
          setInputFocus: () => dispatch({ type: 'FOCUS_INPUT' }),
          onClearSuggestion: () => onSuggestionChange(),
          onClearIntermediate: () => dispatch({ type: 'CLEAR_INTERMEDIATE' }),
          onSuggestionSelected: handleSuggestionSelect,
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

export default AddressFinder;
