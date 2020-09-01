import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';

const BlogPostContainer: NextPage = ({
  body,
  name,
  image,
  cards,
  crumbs,
}) => {
  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {name || ''}
        </Heading>
      </div>
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          {image && <Image size="expand" src={image} />}
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown
            escapeHtml={false}
            source={body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
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

export default BlogPostContainer;
