// @ts-ignore
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CompetitionPageContainer from '../CompetitionPageContainer';
import { GetInsuranceLandingPage } from '../../../../generated/GetInsuranceLandingPage';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const DATA = {
  insuranceLandingPage: {
    id: '7hZTNl0QA3NnggZlSXao8S',
    body:
      'Plus receive £100 if you switch from your current Insurance provider to Vanarama Insurance*\n\n*Only available to Vanarama leasing customers. Other terms and conditions apply.',
    sections: {
      featured1: {
        title: 'Save with Drive Tag',
        titleTag: null,
        body:
          'Nulla fugiat laborum elit laborum in irure cillum do laboris fugiat tempor elit consectetur id Lorem mollit duis culpa ea ipsum ipsum nulla magna mollit culpa est non Lorem eiusmod Lorem aute ex sunt laboris enim amet voluptate fugiat officia\n\n[Find Out More](https://www.vanarama.com/van-insurance.html "Find Out More")\n[Find Out More](https://www.vanarama.com/van-insurance.html "Find Out More")',
        layout: ['Media Right'],
        image: {
          title: 'Tesla-Test-6',
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/24o810jIcvjhhvKGcxbvDZ/498e6cacaafaaff2e71f9e97bd4a44f7/Tesla-Test-6.jpg',
          },
        },
      },
      featured2: {
        title: 'Our Van Insurance Services',
        titleTag: null,
        body:
          '### What You Need To Know\n\nIn incididunt reprehenderit nostrud occaecat ea qui Lorem deserunt commodo enim commodo quis commodo anim nostrud consectetur ex aliquip quis\n\n[Read Our FAQs](https://beta.vanarama.com/van-insurance.html "Read Our FAQs")',
        image: null,
        layout: null,
      },
      cards: {
        name: 'Insurance Types',
        description:
          "We remove all the hassle and extra costs you'd usually expect when insuring your leased van or pickup truck. Compare insurance prices and purchase policies online, insure your tools, freeze your premium for up to 5 years... all in one place!",
        cards: [
          {
            titleTag: null,
            name: 'Multi-Year Insurance',
            title: 'Multi-Year Insurance',
            body: 'Protect yourself against future insurance price increases',
            link: {
              text: 'Multi-Year Van Insurance',
              url:
                'https://beta.vanarama.com/van-insurance/multi-year-van-insurance.html',
              legacyUrl:
                'https://beta.vanarama.com/van-insurance/multi-year-van-insurance.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
          {
            titleTag: null,
            name: 'Finance GAP Insurance',
            title: 'Finance GAP Insurance',
            body: 'Extra protection should the worst happen',
            link: {
              text: 'Finance GAP Insurance',
              url:
                'https://beta.vanarama.com/van-insurance/finance-gap-insurance.html',
              legacyUrl:
                'https://beta.vanarama.com/van-insurance/finance-gap-insurance.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
          {
            titleTag: null,
            name: 'Tools in Transit Insurance',
            title: 'Tools in Transit Insurance',
            body: "Get up to £3k's worth of tools cover for only £75 per year",
            link: {
              text: 'Tools in Transit Insurance',
              url:
                'https://beta.vanarama.com/van-insurance/tools-in-transit.html',
              legacyUrl:
                'https://beta.vanarama.com/van-insurance/tools-in-transit.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
          {
            titleTag: null,
            name: '7-day free Insurance',
            title: '7-day free Insurance',
            body:
              "If you're eligible for our FREE policy your vehicle will be covered for the first 7 days AFTER it's delivered.",
            link: {
              text: '7-Day Free Insurance',
              url:
                'https://beta.vanarama.com/van-insurance/7-day-free-van-insurance.html',
              legacyUrl:
                'https://beta.vanarama.com/van-insurance/7-day-free-van-insurance.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
          {
            titleTag: null,
            name: 'Short-Term Insurance',
            title: 'Short-Term Insurance',
            body:
              "Need to drive a vehicle that isn't yours, or insure a temporary driver on yours?",
            link: {
              text: 'Short-Term Van Insurance',
              url:
                'https://beta.vanarama.com/van-insurance/short-term-insurance.html',
              legacyUrl:
                'https://beta.vanarama.com/van-insurance/short-term-insurance.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
          {
            titleTag: null,
            name: 'FAQS',
            title: 'Our Customers Say',
            body:
              "We try to make everything about van insurance a little clearer, so we've put together the answers to the questions we get asked the most.",
            link: {
              text: 'FAQs',
              url: 'https://beta.vanarama.com/van-insurance/faq.html',
              legacyUrl: 'https://beta.vanarama.com/van-insurance/faq.html',
            },
            image: {
              title: 'placeholder',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
              },
            },
          },
        ],
      },
      carousel: {
        name: 'Insurance News',
        cards: [
          {
            titleTag: null,
            name: 'Do I Need Insurance For A Leased Car?',
            title: 'Do I Need Insurance For A Leased Car?',
            body:
              'Find out what type of coverage you need for a new leased car.\n\n[Read More](https://beta.vanarama.com/car-leasing-explained/do-i-need-insurance-for-leased-car.html)',
            image: {
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/22ybEevo2hRu2pJImPp8tz/327aba1204a84c35b02490ca075c290c/insurance-on-leased-cars.jpg',
              },
            },
          },
        ],
      },
      leadText: null,
      hero: {
        title: 'Get Your Low Cost Vehicle Insurance Quote',
        body:
          '## Plus receive £100 if you switch from your current Insurance provider to Vanarama Insurance*\n\n*Only available to Vanarama leasing customers. Other terms and conditions apply.',
        image: {
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/7EJOmbBk6X2yzLtHunY3xU/e9af75665ee74bf1ccefede5c9142e60/insuranceicon.jpg',
          },
        },
        heroCard: [
          {
            title: 'Contact Us',
            body:
              '\n|      |      |\n| ---------- | ---------- |\n| Monday–Thursday | 8:30am–7pm |\n| Friday | 9am–5pm |\n| Saturday | 9am–3pm |\n| Sunday | Closed |\n\n[Call 01442 838173]("Call 01442 838173")\n\n',
          },
        ],
      },
    },
  },
} as GetInsuranceLandingPage;

describe('<CompetitionPageContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <CompetitionPageContainer data={DATA} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Get Your Low Cost Vehicle Insurance Quote`),
      ).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
