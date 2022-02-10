import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import GoldrushForm from '../GoldrushForm';

describe('<GoldrushForm />', () => {
  const testHeading = 'test heading';
  const testFullName = 'test fullname';
  const testEmail = 'test@email.com';
  const testPhoneNumber = '+447911123456';
  const testPostcode = 'EC1A 1BB';
  let onSubmitMock = jest.fn();

  beforeEach(async () => {
    await preloadAll();
    onSubmitMock = jest.fn();
  });

  it('should show heading', async () => {
    // ACT
    render(<GoldrushForm heading={testHeading} onSubmit={onSubmitMock} />);

    // fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });
  });

  it('should show required field validation messages if the user submits without filling the form', async () => {
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.click(screen.getByTestId('goldrush-form_submit'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your email address'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your phone number'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please enter your postcode')).toBeInTheDocument();
  });

  it('should successfully call onSubmit', async () => {
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_full-name'), {
      target: { value: testFullName },
    });

    fireEvent.input(screen.getByTestId('goldrush-form_email'), {
      target: { value: testEmail },
    });

    fireEvent.input(screen.getByTestId('goldrush-form_phone-number'), {
      target: { value: testPhoneNumber },
    });

    fireEvent.input(screen.getByTestId('goldrush-form_postcode'), {
      target: { value: testPostcode },
    });

    fireEvent.click(screen.getByTestId('goldrush-form_submit'));

    fireEvent.click(screen.getByTestId('aboutTermsAndCons'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(onSubmitMock.mock.calls[0][0]).toEqual({
      consent: false,
      termsAndCons: false,
      fullName: testFullName,
      email: testEmail,
      phoneNumber: testPhoneNumber,
      postcode: testPostcode,
    });
  });

  it('should show error that email is too long', async () => {
    const tooLongEmail = new Array(255)
      .fill(0)
      .join()
      .concat('@email.com');
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_email'), {
      target: { value: tooLongEmail },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_email'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText('Email address should not exceed 254 characters'),
    ).toBeInTheDocument();
  });

  it('should show error that email is invalid', async () => {
    const wrongEmail = 'sdasdasd@asdads';
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_email'), {
      target: { value: wrongEmail },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_email'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText('Oops, this email address is invalid'),
    ).toBeInTheDocument();
  });

  it('should show error that phone number is too short', async () => {
    const invalidPhoneNumber = '+12312';
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_phone-number'), {
      target: { value: invalidPhoneNumber },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_phone-number'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Oops, this phone number is too short. Please enter 11 characters or more',
      ),
    ).toBeInTheDocument();
  });

  it('should show error that phone number is too long', async () => {
    const invalidPhoneNumber = new Array(17).fill(0).join('');
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_phone-number'), {
      target: { value: `+${invalidPhoneNumber}` },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_phone-number'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Oops, this phone number is too long. Please enter 16 characters or less',
      ),
    ).toBeInTheDocument();
  });

  it('should show error that phone number contains invalid symbols', async () => {
    const invalidPhoneNumber = new Array(11).fill(0).join('');
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_phone-number'), {
      target: { value: `+&${invalidPhoneNumber}` },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_phone-number'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Please enter your phone number without spaces or hyphens',
      ),
    ).toBeInTheDocument();
  });

  it('should show error that postcode is too short', async () => {
    const invalidPostcode = '1234';
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_postcode'), {
      target: { value: invalidPostcode },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_postcode'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText('Oops, your postcode looks a little too short'),
    ).toBeInTheDocument();
  });

  it('should show error that postcode is too long', async () => {
    const invalidPostcode = new Array(12).fill(0).join('');
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_postcode'), {
      target: { value: invalidPostcode },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_postcode'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText('Oops, your postcode looks a little too long'),
    ).toBeInTheDocument();
  });

  it('should show error that postcode contains invalid symbols', async () => {
    const invalidPostcode = 'A1B C3&';
    // ACT
    render(
      <GoldrushForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    fireEvent.input(screen.getByTestId('goldrush-form_postcode'), {
      target: { value: invalidPostcode },
    });

    fireEvent.blur(screen.getByTestId('goldrush-form_postcode'));

    await waitFor(() => {
      expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    expect(
      screen.getByText('Please only use numbers, characters and spaces'),
    ).toBeInTheDocument();
  });

  it('should show form for call back', async () => {
    // ACT
    render(
      <GoldrushForm
        isCallBackForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('aboutTermsAndCons')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText('Keep me updated on the latest deals & offers'),
      ).toBeInTheDocument();
    });
  });

  it('should show form for call back with correct text', async () => {
    const text = 'We’ll be in touch within 1-2 business hours';

    // ACT
    render(
      <GoldrushForm
        isCallBackForm
        heading={testHeading}
        onSubmit={onSubmitMock}
        isPostcodeVisible
        text={text}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
