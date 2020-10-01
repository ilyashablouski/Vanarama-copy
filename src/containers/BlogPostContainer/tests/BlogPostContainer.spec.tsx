import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import BlogPostContainer from '../BlogPostContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const BODY =
  '#### **By Paul Kirby, Vanarama Head Of EV & LCV**\n\n\n**If I was to scour the internet for the best lease deals on an electric van I would probably find only 4 electric vehicles available for sale.';

const NAME = 'Top 5 Electric Vans Sort Of';

const IMAGE =
  '//images.ctfassets.net/3xid768u5joa/2FgrgR6JOuvUgIGRmV5rZg/648465d10d6aa137a720013270728029/maxus-top-electric-vans.jpg';

describe('<FinanceExplainedContainer />', () => {
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <BlogPostContainer image={IMAGE} name={NAME} body={BODY} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Top 5 Electric Vans Sort Of`),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
