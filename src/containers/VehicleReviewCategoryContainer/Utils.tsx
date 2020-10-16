import Text from '@vanarama/uibook/lib/components/atoms/text';
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
