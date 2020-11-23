import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import BlogPostContainer from '../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = getSectionsData(['body'], data?.genericPage);
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <BlogPostContainer
      body={body}
      name={name}
      image={image}
      cards={cards}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export default withApollo(BlogPost);
