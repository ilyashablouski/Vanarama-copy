import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FleetLandingPage from '../FleetLandingPage';

import { GenericPageQuery_genericPage as FleetPageData } from '../../../../generated/GenericPageQuery';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const DATA = {
  genericPage: {
    id: '1iXmVZNIGFolU38Jol4j08',
    sections: {
      featured1: {
        title:
          "Wherever You Are, However You Want To Work, We're There For You",
        titleTag: null,
        body:
          "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free.",
        layout: ['Media Right'],
        testimonials: [
          {
            customerName: 'Peter Cheshire',
            summary:
              'Vanarama offered the cheapest prices on the vehicles and their service is fully integrated from telephone support to a state-of-the-art app, for Drivers and Fleet Managers.',
            rating: '5',
          },
        ],
        image: {
          title: 'title',
        },
      },
      featured2: {
        title: "What's In It For My Business?",
        titleTag: null,
        body:
          "### Every fleet is different: \nYour fleet needs are unique and that's why entrusting yours to a company you trust is important.\n\n### Best price for your business:\nChoosing a fleet management company that works with a network of funders means they can provide the very best prices on the market first time.\n\n### Compliance as standard: \nDuty of care is a key concern and goes hand-in-hand with staying compliant. Driver risk assessments and safety checks need to be carried out on time and to high standards, so work with a company that understands how to keep you organised.\n",
        image: {
          title: 'title',
        },
        layout: ['Media Left'],
      },
      featured3: {
        title: "What's In It For Me?",
        titleTag: null,
        body:
          "### Hassle-free fleet reporting:\nFrom MOT notifications to duty of care compliance tasks, keeping information at your fingertips is vital to effective fleet management.\n\n### Protect your fleet: \nHaving your fleet managed and insured through one channel makes life less complicated for you.\n\n### Cost-effective fleet maintenance: \nEasy access to all routine servicing and repairs, tyre replacement, MOTs and vehicle breakdown cover is true peace-of-mind.\n\n### Sale and lease back: \nRemoving vehicles from outright purchase and into a lease agreement allows you to grow your business faster by giving you the option to invest cash into your business rather than the vehicles.\n\n### Controlling costs: \nA robust reporting platform will allow you to look at maintenance budgets, total driver costs and whole-life fleet costings at a moment's notice.",
        image: {
          title: 'AudiQ30718 4 k5ojqt',
          file: {
            details: {
              image: {
                width: 100,
                height: 45,
              },
            },
            url:
              '//images.ctfassets.net/3xid768u5joa/2QbzKD75ObIHIeVMzNeCF/1455166780ba4eb095c965e278a63b69/AudiQ30718_4_k5ojqt.jpg',
          },
        },
        layout: ['Media Right'],
      },
      featured4: {
        title: "What's In It For The Drivers?",
        titleTag: null,
        body:
          "### Maintenance when it's needed: \nNo matter which maintenance package you choose, the drivers themselves can arrange bookings through the Driverhelpline application or by calling the support team.\n\n### Comprehensive vehicle management: \nHow great would it be if drivers knew that support was just a tap on an app away? They'll benefit from the same up-to-date reporting and service-on-demand functions as you. Drivers know they're being compliant, and you can rest easy.\n\n### Peace of mind and support:\nFor drivers, the fleet management relationship shouldn't be centred on vehicle delivery, they want support. And they'll have questions they need answered. That's when having a dedicated app filled with the information they need, and a dedicated support team really will pay for itself.",
        image: {
          title: 'title',
        },
        layout: ['Media Left'],
      },
      leadText: {
        heading: 'Why You Should Trust Your Fleet With Vanarama',
        titleTag: null,
        description:
          "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free",
      },
      hero: {
        title: 'Flexible Fleet Management ',
        body: 'With __No Hidden Costs__',
        image: null,
      },
      tiles: {
        name: 'Not Quite Convinced? Also Included:',
        tiles: [
          {
            body: 'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
            title: 'Price Protection',
            image: null,
          },
          {
            body: 'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
            title: 'Customer Reviews',
            image: null,
          },
          {
            body: 'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
            title: 'Quote Online',
            image: null,
          },
          {
            body: 'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
            title: 'Confused About Leasing?',
            image: null,
          },
        ],
      },
    },
  } as FleetPageData,
};

describe('<FleetLandingPage />', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('should render hero section correctly', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false}>
        <FleetLandingPage data={DATA} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Flexible Fleet Management`)).toBeInTheDocument();
    });
    expect(screen.getByText('No Hidden Costs')).toBeVisible();
    expect(screen.getByTestId('fleet-request-call-back-form')).toBeVisible();
    expect(screen.getByTestId('fleet-call-back-form_full-name')).toBeVisible();
    expect(
      screen.getByTestId('fleet-call-back-form_company-name'),
    ).toBeVisible();
    expect(screen.getByTestId('fleet-call-back-form_fleet-size')).toBeVisible();
    expect(
      screen.getByTestId('fleet-call-back-form_email-address'),
    ).toBeVisible();
    expect(
      screen.getByTestId('fleet-call-back-form_phone-number'),
    ).toBeVisible();
    expect(screen.getByTestId('aboutTermsAndCons')).toBeVisible();
    expect(screen.getByTestId('aboutPrivacyPolicy')).toBeVisible();
    expect(screen.getByTestId('aboutConsent')).toBeVisible();
  });

  it('should render testimonial section correctly', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false}>
        <FleetLandingPage data={DATA} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          `Vanarama offered the cheapest prices on the vehicles and their service is fully integrated from telephone support to a state-of-the-art app, for Drivers and Fleet Managers.`,
        ),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(
        `Wherever You Are, However You Want To Work, We're There For You`,
      ),
    ).toBeVisible();
    expect(
      screen.getByTestId('fleet_testimonial-section_request-button'),
    ).toHaveTextContent("I'd Like A Callback");
  });

  it('should render side media sections according to layout type', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false}>
        <FleetLandingPage data={DATA} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`What's In It For My Business?`),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(`What's In It For My Business?`).parentElement
        ?.parentElement,
    ).toHaveClass('row:featured-left');
    expect(
      screen.getByText(`What's In It For Me?`).parentElement?.parentElement,
    ).toHaveClass('row:featured-right');
    expect(
      screen.getByText(`What's In It For The Drivers?`).parentElement
        ?.parentElement,
    ).toHaveClass('row:featured-left');
  });

  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FleetLandingPage data={DATA} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Flexible Fleet Management`)).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
