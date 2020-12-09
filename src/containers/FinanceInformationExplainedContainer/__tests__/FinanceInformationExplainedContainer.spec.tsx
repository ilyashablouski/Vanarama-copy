import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import FinanceInfromationExplainedContainer from '../FinanceInfromationExplainedContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const METADATA = {
  title: 'Car Finance Options | Business Car Leasing Deals UK',
  name: 'Business & Personal Car Finance Leasing Options',
  pageType: 'Finance Hub',
  __typename: 'Meta',
};

const SECTIONS = {
  featured1: {
    body:
      "You simply choose the car you want to drive & tailor the deal depending on the following criteria:\n\n-   Your budget.\n-   The duration of your agreement.\n-   Your annual mileage.\n-   Whether you need a personal or business lease.\n-   If you want to add a maintenance package to your lease.\n\nAfter choosing a vehicle, you will need to undergo a credit check. This is when the finance company verifies that you can comfortably afford the payments.\n\nOnce your finances have been approved, you will be asked to pay a Vehicle Reservation Fee of £500 (this secures your vehicle & prevents it being leased to someone else), which is refunded to you less our administration fee of £198 after delivery of your vehicles.\n\nWhen the [contract finishes](https://beta.vanarama.com/car-leasing-explained/what-happens-at-end-of-car-lease.html), the car is returned to the finance company who will send out a driver to collect it. When the vehicle is returned, it will be inspected for damage & excess mileage. You will be charged for damage considered over & above the British Vehicle Rental & Leasing Association's (BVRLA) [Fair Wear & Tear guidelines](https://beta.vanarama.com/car-leasing-explained/lease-car-fair-wear-and-tear.html) or if you have exceeded the agreed mileage allowance.\n\nDon't worry about the end-of-contract damage charges – you've been driving the vehicle for up to 5 years, a bit of damage is to be expected, that's why it's called \"Fair Wear & Tear\". Take a look at our comprehensive [wear and tear guide](https://beta.vanarama.com/car-leasing-explained/lease-car-fair-wear-and-tear.html) for more information.",
    title: 'How Does Car Leasing Work?',
    image: null,
    __typename: 'Featured',
  },
  featured2: {
    body:
      'Of course, feel free to pick up the phone to one of our Account Managers on tel: [01442 838 195](tel:01442838195) or drop us an email to [enquiries@vanarama.co.uk](mailto:enquiries@vanarama.co.uk).',
    title: 'Contact Us',
    __typename: 'Featured',
  },
  faqs: {
    title: 'Van Contract Hire FAQs',
    body:
      "When deciding on a van financing option, it's important to have all the information you need to make the right choice for you & your business. We've put together a comprehensive collection of contract hire FAQs to help you find out more.\n",
    questionSets: [
      {
        title: 'Finance & Application',
        questionAnswers: [
          {
            question:
              'Do I have to have a credit check to get a van on Contract Hire?',
            answer:
              'All Contract Hire Funders will conduct a credit check. However, as all Funders have slightly different underwriting criteria, we will do our best to find the right Funder for you & your circumstances.',
          },
          {
            question: 'How long does approval take?',
            answer:
              'This can vary depending on the Funder. It can take as little as an hour to get a decision, but we will try to get an answer for you within 24 hours. We will sometimes get requests for further information and, in these cases, it can take slightly longer to get the final decision.',
          },
        ],
      },
      {
        title: "What's Included?",
        questionAnswers: [
          {
            question:
              'Will I be responsible for parking tickets and speeding fines?',
            answer:
              'Yes, although if these are not settled straight away, the authority responsible for the offence will contact the funder who supplied the vehicle. An additional admin fee may be charged by the funder if they have to pay the fine on your behalf.',
          },
          {
            question:
              'Who pays for new tyres/MOT/ servicing if I have taken the van out on Contract Hire?',
            answer:
              'With Contract Hire, you have the option to include a maintenance package for an additional low monthly fee. This will cover you for tyres, routine maintenance, servicing & any MOT that falls within the contract duration.',
          },
        ],
      },
    ],
  },
  carousel: null,
  __typename: 'Sections',
} as any;

describe('<FinanceExplainedContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FinanceInfromationExplainedContainer
          sections={SECTIONS}
          title={METADATA.title}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`How Does Car Leasing Work?`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Contact Us`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `Do I have to have a credit check to get a van on Contract Hire?`,
        ),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
