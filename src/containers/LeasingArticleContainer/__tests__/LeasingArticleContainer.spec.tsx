import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import LeasingArticleContainer from '../LeasingArticleContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const METADATA = {
  title: 'Car Leasing Explained',
  metaRobots: null,
  metaDescription:
    "At Vanarama, we want to make leasing a brand new car as simple as possible - you'll find all of the information & advice you might need in our collection of easy-to-understand guides to leasing.",
  publishedOn: null,
  legacyUrl: 'https://www.vanarama.com/car-leasing-explained.html',
  pageType: 'Leasing Explained Hub',
  __typename: 'Meta',
};
const BODY = `At Vanarama, we can offer you the best car leasing option to suit your needs, whether it's personal contract hire or business contract hire.\n\nWe understand the importance of your new car decision and want to make sure the process is as simple and seamless as possible for you. You can find out how we do this by visiting our page about&nbsp;[How Car Leasing Works](https://beta.vanarama.com/car-leasing-explained.html).\n\nYou can use the links below to view the key features and benefits of the new car finance products available. Our in-depth FAQs will also help with any specific queries. If you need any more information, please feel free to pick up the phone to one of our Account Managers on 01442 835 769 or drop us an email at [enquiries@vanarama.co.uk](mailto:enquiries@vanarama.co.uk).\n\n## Available New Car Finance Leasing Options\n \n- [Business Contract Hire](https://beta.vanarama.com/car-business-contract-hire.html)\n- [Personal Contract Hire](https://beta.vanarama.com/car-personal-contract-hire.html "Personal Contract Hire")\n \n\n\n`;

const SECTIONS = {
  cards: {
    name: 'Our Leasing Guides',
    titleTag: null,
    description: null,
    cards: [
      {
        title: 'Company Cash Allowance Vs Company Car',
        name: 'Company Cash Allowance Vs Company Car',
        image: {
          title: 'company-cash-allowance-vs-company-car',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/FRg0wIDLXZqVIB9ZoJEw7/e04f3cfdfb2ad9405be84ef106d83d26/company-cash-allowance-vs-company-car.jpg',
            fileName: 'company-cash-allowance-vs-company-car.jpg',
            contentType: 'image/jpeg',
          },
        },
        body:
          'So what should you consider if you are a company car driver reviewing your options?\n\n[Read More](https://beta.vanarama.com/car-leasing-explained/given-company-cash-allowance-vs-company-car.html)',
        titleTag: null,
        link: {
          text: 'Read More',
          url:
            'https://betavanarama.com/van-leasing-explained/how-does-van-leasing-work.html',
        },
      },
      {
        title: 'What Happens At The End Of A Car Lease?',
        name: 'What Happens At The End Of A Car Lease?',
        image: {
          title: 'what-happens-at-end-of-car-lease',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/2gBj5lixlkrla8kFNF8XSi/0fea9544b48e892f4f96d612b9be9c70/what-happens-at-end-of-car-lease.jpg',
            fileName: 'what-happens-at-end-of-car-lease.jpg',
            contentType: 'image/jpeg',
          },
        },
        body:
          'At the end of a lease contract, you simply hand back the car to the finance company...\n\n[Read More](https://beta.vanarama.com/car-leasing-explained/what-happens-at-end-of-car-lease.html)',
        titleTag: null,
        link: {
          text: 'Read More',
          url:
            'https://betavanarama.com/van-leasing-explained/how-does-van-leasing-work.html',
        },
      },
    ],
  },
} as any;

const ARTICLE_URL = 'guides/cars/volvo-xc40-review';

describe('<FinanceExplainedContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <LeasingArticleContainer
          sections={SECTIONS}
          title={METADATA.title}
          body={BODY}
          image={null}
          articleUrl={ARTICLE_URL}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Our Leasing Guides`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Company Cash Allowance Vs Company Car`),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
