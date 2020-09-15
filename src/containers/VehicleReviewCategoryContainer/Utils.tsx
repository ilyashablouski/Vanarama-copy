import RouterLink from '../../components/RouterLink/RouterLink';
import { ReviewsHubCategoryQuery } from '../../../generated/ReviewsHubCategoryQuery';

export function getMarkdownRenderers():
  | { [nodeType: string]: React.ElementType<any> }
  | undefined {
  return {
    link: props => {
      const { href, children } = props;
      return <RouterLink link={{ href, label: children }} />;
    },
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
      label: 'Hub',
      href: '/hub',
    },
    {
      label: data.genericPage.metaData.name || '',
      href: '/',
    },
  ];
}
