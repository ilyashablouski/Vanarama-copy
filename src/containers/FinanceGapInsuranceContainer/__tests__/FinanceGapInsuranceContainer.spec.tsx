// @ts-ignore
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import FinanceGapInsuranceContainer from '../FinanceGapInsuranceContainer';

jest.mock('../../../hooks/useMediaQuery');

// ARRANGE
const SECTIONS = {
  leadText: {
    titleTag: null,
    heading: 'Guaranteed Asset Protection (GAP)',
    description:
      'Cover the difference between your insurance payment and the full value of your car.',
    position: 1,
  },
  featured: null,
  rowText: {
    position: 3,
    heading: 'Get A Quote',
    titleTag: null,
    subHeading: null,
  },
  featured1: {
    title: 'Finance Gap Explained',
    body:
      'Vehicle value depreciation could mean there is a risk you will owe more to the Finance Company than the Insurance Company pay-out if the vehicle is written off or stolen. Finance Gap Insurance allows you to insure against the difference (up to a maximum of £20,000) between your Insurance Company pay-out and the amount you owe to the Finance Company. Check out the video below for more information:\n\n<a href="https://www.youtube.com/embed/P4IT21lvn4w" class="embedly-card" data-card-width="100%" data-card-controls="0">Embedded content: https://www.youtube.com/embed/P4IT21lvn4w</a>\n\nFull terms and conditions can be found here.\n\n## Eligible Vehicles\n- Vanarama leased vehicles only\n- Vehicles up to £125,000 Invoice price\n- Cars & Commercial vehicles up to 3.5cwt\n- Cover is valid for up to 5 years in line with the finance agreement\n- Applies to all finance agreements, including - Contract Hire and Lease\n- Applies to cars and commercial vehicles up to 6 years old\n\n## Major Exclusions\n- If the vehicle is written off whilst driving illegally or under the influence of drugs or alcohol\n- The vehicle is not covered by a Fully Comprehensive Road Risk Motor Policy\n- Use of vehicle for Hire or Reward\n- If the vehicle is unattended and the keys have NOT been removed, all doors locked and any immobilizer and/or alarm activated\n- If your vehicle has a Fridge Unit/Conversion & also if your vehicle has/will have a Motor Traders Insurance Policy\n- Once an order has been placed, a member of our dedicated GAP team will be in contact to discuss your options\n- The vehicle must be separately insured by a Fully Comprehensive Road Risk Motor Policy\n\nIf you would like to know more, call our dedicated Finance Gap Insurance team now on 01442 835768.',
    titleTag: null,
    link: {
      url: 'https://beta.vanarama.com/van-insurance.html',
      text: 'Get A Quote',
    },
    iconList: null,
  },
  featured2: {
    title: null,
    body: null,
    titleTag: null,
    link: {
      url: 'https://beta.vanarama.com/contact-us.html',
      text: 'Get In Touch',
    },
  },
  faqs: null,
  hero: {
    position: 0,
    flag: null,
    title: null,
    titleTag: null,
    body: '## Extra Protection Should The Worst happen',
    image: null,
    heroCard: [
      {
        title: 'Contact Us',
        body:
          '\n|      |      |\n| ---------- | ---------- |\n| Monday–Thursday | 8:30am–7pm |\n| Friday | 9am–5pm |\n| Saturday | 9am–3pm |\n| Sunday | Closed |\n\n[Call 01442 838173]("Call 01442 838173")\n\n',
      },
    ],
  },
  tiles: null,
  cards: null,
} as any;

const BREADCRUMBS = [
  { href: '/', label: 'Home' },
  { href: '/van-insurance.html', label: 'Van Insurance' },
  { label: 'Multi-Year Van Insurance' },
];

describe('<FinanceExplainedContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FinanceGapInsuranceContainer
          sections={SECTIONS}
          breadcrumbsData={BREADCRUMBS}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Finance Gap Explained`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Guaranteed Asset Protection (GAP)`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Get In Touch`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(BREADCRUMBS[2].label)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
