import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import LeasingQuestionContainer from '../LeasingQuestionContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANG
const METADATA = {
  title: 'Insurance, Tax & Vat Leasing Questions',
  metaRobots: null,
  metaDescription: 'Insurance Tax Vat',
  publishedOn: null,
  legacyUrl:
    'https://www.vanarama.com/van-leasing-questions/insurance-tax-vat.html',
  pageType: 'Customer Leasing Questions',
  __typename: 'Meta',
};
const BODY = ``;

const SECTIONS = {
  questionSet: {
    name: 'All Questions',
    questionAnswers: [
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
    ],
  },
  cards: {
    position: 2,
    name: 'Most Popular Questions',
    titleTag: null,
    description: null,
    cards: [
      {
        titleTag: 'h3',
        name: 'Question 1',
        title: 'Is Road Tax Covered In The Lease?',
        body:
          "It depends on which lease product you choose. If you choose a contract hire or contract purchase the road tax is included for the duration of the contract. Finance lease will include the first year's road tax, however, the finance company will then invoice you for the next year.",
        image: null,
      },
      {
        titleTag: 'h3',
        name: 'Question 1',
        title: 'Is Road Tax Covered In The Lease?2',
        body:
          "It depends on which lease product you choose. If you choose a contract hire or contract purchase the road tax is included for the duration of the contract. Finance lease will include the first year's road tax, however, the finance company will then invoice you for the next year.",
        image: null,
      },
      {
        titleTag: 'h3',
        name: 'Question 1',
        title: 'Is Road Tax Covered In The Lease?3',
        body:
          "It depends on which lease product you choose. If you choose a contract hire or contract purchase the road tax is included for the duration of the contract. Finance lease will include the first year's road tax, however, the finance company will then invoice you for the next year.",
        image: null,
      },
    ],
  },
} as any;

describe('<LeasingQuestionContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <LeasingQuestionContainer
          sections={SECTIONS}
          title={METADATA.title}
          body={BODY}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Is Road Tax Covered In The Lease?`),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
