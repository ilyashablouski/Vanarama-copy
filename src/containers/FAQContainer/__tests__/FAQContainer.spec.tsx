import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import FAQContainer from '../FAQContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const METADATA = {
  title: 'FAQs About Van Insurance UK',
  metaRobots: null,
  metaDescription:
    "We try to make everything about van insurance a little clearer, so we've put together the answers to the questions we get asked the most. Enjoy!",
  publishedOn: null,
  legacyUrl: 'https://www.vanarama.com/van-insurance/faq.html',
  pageType: 'Content',
  canonicalUrl: 'https://www.vanarama.com/van-insurance/faq.html',
  slug: '/van-insurance/faq',
  __typename: 'Meta',
};
const INTRO =
  "We try to make everything about van insurance a little clearer, so we've put together the answers to the questions we get asked the most. Enjoy!";

const SECTIONS = {
  faqs: {
    questionSets: [
      {
        title: 'Vehicle & Options',
        questionAnswers: [
          {
            question: 'What do I need to apply for an insurance quote?',
            answer:
              'Before you give us a call, make sure you have these things to hand:\n\n-   Vehicle details (make, model, reg number, etc)\n-   Your full address & postcode\n-   Your driving licence\n-   Number of years of No-Claims Bonus (NCB)\n-   Claims & convictions details (if any) for the last 5 years\n-   Details of any other drivers including their licence details',
          },
          {
            question:
              "What if I can't find my vehicle's make & model by its registration number?",
            answer:
              "You can enter the vehicle's year of manufacture, make & model instead.",
          },
          {
            question:
              'Can I get a quote if I do not have the registration number available?',
            answer:
              'Yes, you can, but we will need this info if you decide to purchase a policy',
          },
          {
            question: 'What does "excess" means?',
            answer:
              "It's what you need to pay if you make a claim. For example, if you have a £100 excess on your policy then you pay the first £100 of the claim you make.",
          },
        ],
      },
      {
        title: 'No Claims Bonus (NCB) Questions',
        questionAnswers: [
          {
            question: 'What is No Claims Bonus (NCB)?',
            answer:
              'This is the number of years you have been insured & not made a claim. You need proof of NCB when you purchase a new policy.',
          },
        ],
      },
    ],
  },
  __typename: 'Sections',
} as any;

describe('<FinanceExplainedContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FAQContainer
          sections={SECTIONS}
          title={METADATA.title}
          intro={INTRO}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          `We try to make everything about van insurance a little clearer, so we've put together the answers to the questions we get asked the most. Enjoy!`,
        ),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `We try to make everything about van insurance a little clearer, so we've put together the answers to the questions we get asked the most. Enjoy!`,
        ),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`No Claims Bonus (NCB) Questions`),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
