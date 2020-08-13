import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import ReactMarkdown from 'react-markdown';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Router from 'next/router';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import RouterLink from '../../components/RouterLink/RouterLink';

const crumbs = [
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

const BlogPost: NextPage = () => {
  const { data, loading, error } = useGenericPage();

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const body = data?.genericPage?.body;
  const title = data?.genericPage?.metaData?.title;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const cards = data?.genericPage?.sections?.cards?.cards;

  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {title || ''}
        </Heading>
      </div>
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          {image && <Image size="expand" src={image} />}
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown escapeHtml={false} source={body || ''} />
        </article>
        <div>
          <Heading tag="span" size="large" color="black">
            Related Articles
          </Heading>
          {cards?.map((el, indx) => (
            <Card
              key={`${el.name}_${indx.toString()}`}
              className="card__article"
              imageSrc={el.image?.file?.url || ''}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{ href: el.link?.url || '', label: el.title || '' }}
                    className="card--link"
                    classNames={{ color: 'black', size: 'regular' }}
                  />
                ),
              }}
              description={el.body || ''}
            >
              <Button
                onClick={() => {
                  Router.push(el.link?.url || '');
                }}
                label="Read More"
                color="teal"
                size="small"
                fill="solid"
                className="-mt-400"
              />
            </Card>
          ))}
        </div>
      </div>

      <div className="row:comments" />
    </>
  );
};

export default withApollo(BlogPost);
