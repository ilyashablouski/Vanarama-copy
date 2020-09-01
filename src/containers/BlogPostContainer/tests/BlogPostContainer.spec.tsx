import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import BlogPostContainer from '../BlogPostContainer';

// ARRANGE
const BODY =
  '#### **By Paul Kirby, Vanarama Head Of EV & LCV**\n\n\n**If I was to scour the internet for the best lease deals on an electric van I would probably find only 4 electric vehicles available for sale.';

const ARTICLES = [
  {
    pageTitle: 'Van News | Vanarama Blog | Van, Industry & Company News',
    title: 'Van News',
    slug: 'van-news',
    metaDescription:
      "Van and pickup news from the UK's number one van leasing specialists. Bringing you the latest news on all things connected to business motoring in 2019",
    canonicalUrl: 'https://www.vanarama.com/latest-news/category/van-news.html',
    legacyUrl: 'https://www.vanarama.com/latest-news/category/van-news.html',
  },
];

const NAME = 'Top 5 Electric Vans Sort Of';

const IMAGE =
  '//images.ctfassets.net/3xid768u5joa/2FgrgR6JOuvUgIGRmV5rZg/648465d10d6aa137a720013270728029/maxus-top-electric-vans.jpg';

const CRUMBS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Post',
    href: '/blog/post',
  },
];

describe('<FinanceExplainedContainer />', () => {
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <BlogPostContainer
          crumbs={CRUMBS}
          image={IMAGE}
          name={NAME}
          body={BODY}
          articles={ARTICLES}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Top 5 Electric Vans Sort Of`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Van News`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
