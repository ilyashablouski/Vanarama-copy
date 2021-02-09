import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BusinessAboutForm from '../BusinessAboutForm';
import { BusinessAboutFormDropDownData } from '../../../../generated/BusinessAboutFormDropDownData';

const mockDropdownData: BusinessAboutFormDropDownData = {
  __typename: 'DropDownType',
  titles: {
    __typename: 'DropDownDataType',
    data: ['Mr', 'Miss'],
    favourites: [],
  },
};

describe('BusinessAboutForm', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should show required field validation messages if the user submits without filling the form', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Please select a title')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Please enter your first name'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please enter your last name')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your telephone number'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your email address'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please select a type of company'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('You must be authorised to apply for credit'),
    ).toBeInTheDocument();
  });

  it('should validate the first name field correctly', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'A' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, your first name’s too short. Please make it 2 characters or longer',
        ),
      ).toBeInTheDocument();
    });

    fireEvent.input(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'ABCDEFGHIJABCDEFGHIJABCDEFGHIJABCDEFGHIJABCDEFGHIJA' }, // 51 chars long
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, your first name’s too long. Please keep it to 50 characters',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should validate the last name field correctly', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'A' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, your last name’s too short. Please make it 2 characters or longer',
        ),
      ).toBeInTheDocument();
    });

    fireEvent.input(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'ABCDEFGHIJABCDEFGHIJABCDEFGHIJABCDEFGHIJABCDEFGHIJA' }, // 51 chars long
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, your last name’s too long. Please keep it to 50 characters',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should validate the telephone field correctly', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.input(
      screen.getByRole('textbox', { name: /telephone number/i }),
      {
        target: { value: '999999999999' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter mobile number without spaces or hyphens',
        ),
      ).toBeInTheDocument();
    });

    fireEvent.input(
      screen.getByRole('textbox', { name: /telephone number/i }),
      {
        target: { value: '12345678901234567' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this mobile number is too long. Please enter 16 characters or less',
        ),
      ).toBeInTheDocument();
    });

    fireEvent.input(
      screen.getByRole('textbox', { name: /telephone number/i }),
      {
        target: { value: '0234567890' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this mobile number is too short. Please enter 11 characters or more',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should validate the email field correctly', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'fff.bar.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Oops, this email address is invalid'),
      ).toBeInTheDocument();
    });
  });

  it('should validate the terms and conditions are selected', async () => {
    // ACT
    render(
      <BusinessAboutForm
        dropDownData={mockDropdownData}
        onSubmit={jest.fn()}
        isEdit={false}
      />,
    );

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I am authorised to apply for credit on behalf of the company/i,
      }),
      {
        target: { checked: true },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText('The terms and conditions must be accepted'),
      ).toBeInTheDocument();
    });
  });
});
