import React from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink/RouterLink';
import { ReviewsHubCategoryQuery } from '../../../generated/ReviewsHubCategoryQuery';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export function getMarkdownRenderers():
  | { [nodeType: string]: React.ElementType<any> }
  | undefined {
  return {
    link: props => {
      const { href, children } = props;
      return <RouterLink link={{ href, label: children }} />;
    },
    heading: props => <Text {...props} size="lead" color="darker" tag="h3" />,
    paragraph: props => <Text {...props} tag="p" color="darker" />,
  };
}

export function getReviewCategoryCrumbs(data: ReviewsHubCategoryQuery) {
  return [
    { label: 'Home', href: '/' },
    {
      label: 'Van Reviews',
      href: '/van-reviews',
    },
    {
      label: data.genericPage.metaData.name || '',
      href: '/',
    },
  ];
}
