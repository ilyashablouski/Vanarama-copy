import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useGenericPage, useGenericPageHead } from '../../../gql/genericPage';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';

const NonBlogPost: NextPage = () => {
  const router = useRouter();
  const slug = `/${router.query.articles as string}`;
  const { data, loading, error } = useGenericPage(slug);
  const { data: pageHead } = useGenericPageHead(slug);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], pageHead?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <BlogPostContainer
      body={body}
      name={name}
      image={image}
      metaData={metaData}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export default withApollo(NonBlogPost);
