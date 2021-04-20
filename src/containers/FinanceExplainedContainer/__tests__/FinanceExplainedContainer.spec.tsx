import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import FinanceExplainedContainer from '../FinanceExplainedContainer';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

// ARRANGE
const METADATA = {
  title: 'Car Finance Options | Business Car Leasing Deals UK',
  name: 'Car Finance Options | Business Car Leasing Deals UK',
  pageType: 'Finance Hub',
  metaRobots: null,
  metaDescription: null,
  legacyUrl: null,
  canonicalUrl: null,
  slug: null,
  schema: null,
  publishedOn: null,
  breadcrumbs: null,
  __typename: 'Meta',
};
const BODY = `At Vanarama, we can offer you the best car leasing option to suit your needs, whether it's personal contract hire or business contract hire.\n\nWe understand the importance of your new car decision and want to make sure the process is as simple and seamless as possible for you. You can find out how we do this by visiting our page about&nbsp;[How Car Leasing Works](https://beta.vanarama.com/car-leasing-explained.html).\n\nYou can use the links below to view the key features and benefits of the new car finance products available. Our in-depth FAQs will also help with any specific queries. If you need any more information, please feel free to pick up the phone to one of our Account Managers on 01442 835 769 or drop us an email at [enquiries@vanarama.co.uk](mailto:enquiries@vanarama.co.uk).\n\n## Available New Car Finance Leasing Options\n \n- [Business Contract Hire](https://beta.vanarama.com/car-business-contract-hire.html)\n- [Personal Contract Hire](https://beta.vanarama.com/car-personal-contract-hire.html "Personal Contract Hire")\n \n\n\n`;

const SECTIONS = {
  cards: {
    name: 'Available New Car Finance Leasing Options',
    description: null,
    cards: [
      {
        name: 'Business Contract Hire',
        title: 'Business Contract Hire',
        image: null,
        body:
          'Nulla reprehenderit est mollit duis laboris esse exercitation veniam dolor et fugiat enim est ad',
        link: {
          text: 'See Details',
          url: 'https://beta.vanarama.com/car-business-contract-hire.html',
          __typename: 'Link',
        },
        __typename: 'Card',
      },
      {
        name: 'Personal Contract Hire',
        title: 'Personal Contract Hire',
        image: null,
        body:
          'Nulla reprehenderit est mollit duis laboris esse exercitation veniam dolor et fugiat enim est ad',
        link: {
          text: 'See Details',
          url: 'https://beta.vanarama.com/car-personal-contract-hire.html',
          __typename: 'Link',
        },
        __typename: 'Card',
      },
    ],
    __typename: 'Cards',
  },
  featured1: {
    layout: ['Media Right'],
    body:
      "You simply choose the car you want to drive & tailor the deal depending on the following criteria:\n\n-   Your budget.\n-   The duration of your agreement.\n-   Your annual mileage.\n-   Whether you need a personal or business lease.\n-   If you want to add a maintenance package to your lease.\n\nAfter choosing a vehicle, you will need to undergo a credit check. This is when the finance company verifies that you can comfortably afford the payments.\n\nOnce your finances have been approved, you will be asked to pay a Vehicle Reservation Fee of £500 (this secures your vehicle & prevents it being leased to someone else), which is refunded to you less our administration fee of £198 after delivery of your vehicles.\n\nWhen the [contract finishes](https://beta.vanarama.com/car-leasing-explained/what-happens-at-end-of-car-lease.html), the car is returned to the finance company who will send out a driver to collect it. When the vehicle is returned, it will be inspected for damage & excess mileage. You will be charged for damage considered over & above the British Vehicle Rental & Leasing Association's (BVRLA) [Fair Wear & Tear guidelines](https://beta.vanarama.com/car-leasing-explained/lease-car-fair-wear-and-tear.html) or if you have exceeded the agreed mileage allowance.\n\nDon't worry about the end-of-contract damage charges – you've been driving the vehicle for up to 5 years, a bit of damage is to be expected, that's why it's called \"Fair Wear & Tear\". Take a look at our comprehensive [wear and tear guide](https://beta.vanarama.com/car-leasing-explained/lease-car-fair-wear-and-tear.html) for more information.",
    title: 'How Does Car Leasing Work?',
    image: null,
    __typename: 'Featured',
  },
  featured2: {
    layout: ['Media Right'],
    body:
      'Of course, feel free to pick up the phone to one of our Account Managers on tel: [01442 838 195](tel:01442838195) or drop us an email to [enquiries@vanarama.co.uk](mailto:enquiries@vanarama.co.uk).',
    image: null,
    title: 'Contact Us',
    cards: [
      {
        name: 'Meet iVan',
        title: 'Meet iVan',
        image: {
          title: 'header-ivan',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/31iQbyGS1DYs7b9viQHtXh/86ae2d62793162409d230b2042d9e00a/header-ivan.svg',
            fileName: 'header-ivan.svg',
            contentType: 'image/svg+xml',
            __typename: 'File',
          },
          __typename: 'Image',
        },
        body:
          'Our helpful chatbot iVan is available 24/7 to answer your van financing questions',
        link: {
          text: 'Chat With iVan',
          url: 'https://www.vanarama.com',
          __typename: 'Link',
        },
        __typename: 'Card',
      },
    ],
    __typename: 'Featured',
  },
  carousel: null,
  __typename: 'Sections',
} as any;

const DATA = {
  genericPage: {
    sections: SECTIONS,
    metaData: METADATA,
    body: BODY,
    id: 'id',
    featuredImage: null,
    intro: '',
    sectionsAsArray: null,
  },
} as GenericPageQuery;

describe('<FinanceExplainedContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FinanceExplainedContainer data={DATA} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Car Finance Options | Business Car Leasing Deals UK`),
      ).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
