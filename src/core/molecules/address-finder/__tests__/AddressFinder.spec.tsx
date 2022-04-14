import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FormGroup from 'core/molecules/formgroup';
import { ILoqateQuery } from '../../../../hooks/useLoqate/interfaces';
import AddressFinder from '../AddressFinder';

jest.mock('../../../../hooks/useDebounce');
jest.mock(
  '../../../../hooks/useLoqate',
  () => ({ text, postcode }: ILoqateQuery) => {
    if (text === 'SW1A') {
      if (postcode === '3') {
        return {
          data: [
            {
              id: '4',
              text: 'Marble Arch',
              description: 'Westminster',
              type: 'Address',
            },
          ],
        };
      }

      return {
        data: [
          {
            id: '1',
            text: '10 Downing Street',
            description: 'Westminster',
            type: 'Address',
          },
          {
            id: '2',
            text: 'Buckingham Palace',
            description: 'Westminster',
            type: 'Address',
          },
          {
            id: '3',
            text: 'SW1A 1AA',
            description: '1 address',
            type: 'Postcode',
          },
        ],
      };
    }

    return { data: [] };
  },
);

describe('<AddressFinder />', () => {
  it('should render with address suggestions when the user types a postcode', () => {
    // ACT
    render(
      <AddressFinder apiKey="XXX-XXX-XXX" onSuggestionChange={jest.fn()}>
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    const input = screen.getByLabelText(/Address/);
    fireEvent.change(input, { target: { value: 'SW1A' } });
    fireEvent.focus(input);

    // ASSERT
    expect(screen.getByTestId('results')).toMatchInlineSnapshot(`
      <div
        class="tile address-finder--dropdown -white tile--color -scrollable"
        data-testid="results"
      >
        <ul
          class="address-finder--dropdown--ul"
        >
          <li>
            <b>
              10 Downing Street
            </b>
             - 
            Westminster
          </li>
          <li>
            <b>
              Buckingham Palace
            </b>
             - 
            Westminster
          </li>
          <li>
            <b>
              SW1A 1AA
            </b>
             - 
            1 address
          </li>
        </ul>
      </div>
    `);
  });

  it('should call `onSuggestionChange` when selecting an address', async () => {
    // ARRANGE
    const onSuggestionChange = jest.fn();

    // ACT
    render(
      <AddressFinder
        apiKey="XXX-XXX-XXX"
        onSuggestionChange={onSuggestionChange}
      >
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    const input = screen.getByLabelText(/Address/);
    fireEvent.change(input, { target: { value: 'SW1A' } });
    fireEvent.focus(input);

    fireEvent.mouseDown(screen.getByText(/^Buckingham Palace/));

    // ASSERT
    expect(onSuggestionChange).toHaveBeenCalledTimes(1);
    expect(onSuggestionChange).toHaveBeenCalledWith({
      id: '2',
      label: 'Buckingham Palace - Westminster',
    });
  });

  it('should show the intermediate result when selecting a postcode', async () => {
    // ARRANGE
    const onSuggestionChange = jest.fn();

    // ACT
    render(
      <AddressFinder
        apiKey="XXX-XXX-XXX"
        onSuggestionChange={onSuggestionChange}
      >
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Intermediate dataTestId="intermediate" />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    const input = screen.getByLabelText(/Address/);
    fireEvent.change(input, { target: { value: 'SW1A' } });
    fireEvent.focus(input);

    fireEvent.mouseDown(screen.getByText(/^SW1A 1AA/));

    // ASSERT
    expect(screen.getByText(/SW1A 1AA - 1 address/)).toBeVisible();
    expect(screen.getByText(/Change/)).toBeVisible();
    expect(onSuggestionChange).toHaveBeenCalledTimes(0);
  });

  it('should be able to search within a postcode', async () => {
    // ARRANGE
    const onSuggestionChange = jest.fn();

    // ACT
    render(
      <AddressFinder
        apiKey="XXX-XXX-XXX"
        onSuggestionChange={onSuggestionChange}
      >
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Intermediate dataTestId="intermediate" />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    const input = screen.getByLabelText(/Address/);
    fireEvent.change(input, { target: { value: 'SW1A' } });
    fireEvent.focus(input);

    fireEvent.mouseDown(screen.getByText(/^SW1A 1AA/));
    fireEvent.mouseDown(screen.getByText(/^Marble Arch/));

    // ASSERT
    expect(onSuggestionChange).toHaveBeenCalledTimes(1);
    expect(onSuggestionChange).toHaveBeenCalledWith({
      id: '4',
      label: 'Marble Arch - Westminster',
    });
  });

  it('should go into the edit state when pre-filled', async () => {
    // ARRANGE
    const onSuggestionChange = jest.fn();

    // ACT
    render(
      <AddressFinder
        apiKey="XXX-XXX-XXX"
        onSuggestionChange={onSuggestionChange}
        selected={{
          id: '123',
          label: 'London Eye - Waterloo',
        }}
      >
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Intermediate dataTestId="intermediate" />
        <AddressFinder.Selected />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    // ASSERT
    expect(screen.getByText(/London Eye - Waterloo/)).toBeVisible();
    expect(screen.getByText(/Edit/)).toBeVisible();
  });

  it('should clear the suggestion when clicking edit', async () => {
    // ARRANGE
    const onSuggestionChange = jest.fn();

    // ACT
    render(
      <AddressFinder
        apiKey="XXX-XXX-XXX"
        onSuggestionChange={onSuggestionChange}
        selected={{
          id: '123',
          label: 'London Eye - Waterloo',
        }}
      >
        <label htmlFor="input">Address</label>
        <AddressFinder.Input id="input" />
        <AddressFinder.Intermediate dataTestId="intermediate" />
        <AddressFinder.Selected />
        <AddressFinder.Results dataTestId="results" />
      </AddressFinder>,
    );

    fireEvent.click(screen.getByText(/Edit/));

    // ASSERT
    expect(onSuggestionChange).toHaveBeenCalledTimes(1);
    expect(onSuggestionChange).toHaveBeenCalledWith();
  });

  it('should render manual address form after user clicks on "cannot find your address" button', () => {
    // ACT
    render(
      <AddressFinder apiKey="XXX-XXX-XXX" onSuggestionChange={jest.fn()}>
        <FormGroup
          controlId="input"
          label="Start typing your address"
          hintButton={
            <AddressFinder.ManualAddingButtonHint dataTestId="cannot-find-your-address" />
          }
        >
          <AddressFinder.Input id="input" />
        </FormGroup>
        <AddressFinder.Results dataTestId="results" />
        <>
          <AddressFinder.ManualAddingButton />
          <AddressFinder.ManualAddressForm />
        </>
      </AddressFinder>,
    );

    const input = screen.getByLabelText(/Start typing your address/);
    fireEvent.change(input, { target: { value: 'SW1A' } });
    fireEvent.click(screen.getByTestId('cannot-find-your-address'));

    // ASSERT
    expect(
      screen.getByTestId('manual_address_form-line_one'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('manual_address_form-line_two'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('manual_address_form-city')).toBeInTheDocument();
    expect(screen.getByTestId('county')).toBeInTheDocument();
    expect(
      screen.getByTestId('manual_address_form-postcode'),
    ).toBeInTheDocument();
  });
});
