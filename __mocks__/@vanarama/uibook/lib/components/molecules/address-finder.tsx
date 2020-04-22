import { IAddressFinderProps } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';
import React, { createContext, useContext } from 'react';

const MockAddressFinderContext = createContext<any>({});

/**
 * This component is mocked because otherwise it will make a real XHR call to Loqate
 */
const MockAddressFinder: React.FC<IAddressFinderProps> = ({
  children,
  onSuggestionChange,
}) => {
  return (
    <MockAddressFinderContext.Provider value={{ onSuggestionChange }}>
      {children}
    </MockAddressFinderContext.Provider>
  );
};

const MockInput: React.FC<{ id: string; dataTestId: string }> = ({
  id,
  dataTestId,
}) => {
  const { onSuggestionChange } = useContext(MockAddressFinderContext);
  return (
    <input
      id={id}
      data-testid={dataTestId}
      onChange={e => {
        onSuggestionChange({
          id: e.target.value,
        } as any);
      }}
    />
  );
};

(MockAddressFinder as any).Selected = () => null;
(MockAddressFinder as any).Intermediate = () => null;
(MockAddressFinder as any).Results = () => null;
(MockAddressFinder as any).Input = MockInput;
export default MockAddressFinder;
