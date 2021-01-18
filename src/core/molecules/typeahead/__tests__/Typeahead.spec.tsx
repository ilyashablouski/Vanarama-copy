import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Typeahead from '..';

describe('<Typeahead />', () => {
  it('should render suggestions correctly when the input is focused', () => {
    // ARRANGE
    const onSuggestionsFetchRequested = jest.fn();
    const onSuggestionsClearRequested = jest.fn();
    const onChange = jest.fn();

    // ACT
    const { container } = render(
      <Typeahead
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={_ => _.label}
        renderSuggestion={_ => _.label}
        inputProps={{
          placeholder: 'Type to search languages',
          value: 'Java',
          onChange,
        }}
        suggestions={[
          { label: 'Java', year: 1995 },
          { label: 'Javascript', year: 1995 },
        ]}
      />,
    );

    fireEvent.focus(screen.getByRole('textbox'));

    // ASSERT
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-owns="react-autowhatever-1"
          role="combobox"
          style="position: relative; max-height: 200px;"
        >
          <div
            class="textinput regular"
          >
            <input
              aria-autocomplete="list"
              aria-controls="react-autowhatever-1"
              autocomplete="off"
              class="textinput--native regular"
              placeholder="Type to search languages"
              type="text"
              value="Java"
            />
          </div>
          <div
            id="react-autowhatever-1"
            role="listbox"
          >
            <ul
              class="typeahead--optgroup"
              role="listbox"
            >
              <li
                aria-selected="false"
                data-suggestion-index="0"
                id="react-autowhatever-1--item-0"
                role="option"
              >
                Java
              </li>
              <li
                aria-selected="false"
                data-suggestion-index="1"
                id="react-autowhatever-1--item-1"
                role="option"
              >
                Javascript
              </li>
            </ul>
          </div>
        </div>
      </div>
    `);
  });

  it('should call `onChange` when typing in the input', async () => {
    // ARRANGE
    const onSuggestionsFetchRequested = jest.fn();
    const onSuggestionsClearRequested = jest.fn();
    const onChange = jest.fn();

    // ACT
    render(
      <Typeahead
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={_ => _.label}
        renderSuggestion={_ => _.label}
        inputProps={{
          placeholder: 'Type to search languages',
          value: '',
          onChange,
        }}
        suggestions={[
          { label: 'Java', year: 1995 },
          { label: 'Javascript', year: 1995 },
        ]}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Java' },
    });

    // ASSERT
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });

  it('should call `onSuggestionsFetchRequested` when typing in the input', async () => {
    // ARRANGE
    const onSuggestionsFetchRequested = jest.fn();
    const onSuggestionsClearRequested = jest.fn();
    const onChange = jest.fn();

    // ACT
    render(
      <Typeahead
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={_ => _.label}
        renderSuggestion={_ => _.label}
        inputProps={{
          placeholder: 'Type to search languages',
          value: '',
          onChange,
        }}
        suggestions={[
          { label: 'Java', year: 1995 },
          { label: 'Javascript', year: 1995 },
        ]}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Java' },
    });

    // ASSERT
    await waitFor(() =>
      expect(onSuggestionsFetchRequested).toHaveBeenCalledTimes(1),
    );
  });

  it('should call `onSuggestionsClearRequested` when clearing the input', async () => {
    // ARRANGE
    const onSuggestionsFetchRequested = jest.fn();
    const onSuggestionsClearRequested = jest.fn();
    const onChange = jest.fn();

    // ACT
    render(
      <Typeahead
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={_ => _.label}
        renderSuggestion={_ => _.label}
        inputProps={{
          placeholder: 'Type to search languages',
          value: 'Java',
          onChange,
        }}
        suggestions={[
          { label: 'Java', year: 1995 },
          { label: 'Javascript', year: 1995 },
        ]}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });

    // ASSERT
    await waitFor(() =>
      expect(onSuggestionsClearRequested).toHaveBeenCalledTimes(1),
    );
  });

  it('should pass through additional props to the underlying input', () => {
    // ARRANGE
    const onSuggestionsFetchRequested = jest.fn();
    const onSuggestionsClearRequested = jest.fn();
    const onChange = jest.fn();

    // ACT
    render(
      <Typeahead
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={_ => _.label}
        renderSuggestion={_ => _.label}
        inputProps={{
          className: 'my-test-className',
          dataTestId: 'my-data-test-id',
          placeholder: 'My custom placeholder',
          value: 'Java',
          onChange,
        }}
        suggestions={[
          { label: 'Java', year: 1995 },
          { label: 'Javascript', year: 1995 },
        ]}
      />,
    );

    // ASSERT
    expect(screen.getByRole('textbox')).toMatchInlineSnapshot(`
      <input
        aria-autocomplete="list"
        aria-controls="react-autowhatever-1"
        autocomplete="off"
        class="textinput--native regular my-test-className"
        data-testid="my-data-test-id"
        placeholder="My custom placeholder"
        type="text"
        value="Java"
      />
    `);
  });
});
