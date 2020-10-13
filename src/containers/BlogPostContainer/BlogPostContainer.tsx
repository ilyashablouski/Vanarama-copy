/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sections_cards_cards } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQuery_genericPage_metaData } from '../../../generated/GenericPageHeadQuery';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';
import { BlogPosts_blogPosts_articles } from '../../../generated/BlogPosts';
import { getBody } from '../../utils/articles';

interface IProps {
  body: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  cards?:
    | (GenericPageQuery_genericPage_sections_cards_cards | null)[]
    | null
    | undefined;
  breadcrumbsItems?: any;
  metaData?: GenericPageHeadQuery_genericPage_metaData | null | undefined;
  articles?: (BlogPosts_blogPosts_articles | null)[] | null | undefined;
}

interface IImage {
  src: string;
  alt: string;
}

const renderImage = ({ src, alt }: IImage) => {
  return (
    <img
      alt={alt}
      style={{ margin: '1rem auto', display: 'block' }}
      width="90%"
      src={src}
    />
  );
};

const BlogPostContainer: NextPage<IProps> = ({
  body,
  name,
  image,
  breadcrumbsItems,
  metaData,
  articles,
}) => {
  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {name || ''}
        </Heading>
      </div>
      <div className="row:bg-white -compact">
        <div className="row:featured-image">
          {image && (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              className="-white"
              size="expand"
              src={image}
            />
          )}
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
                return (
                  <RouterLink
                    link={{ href, label: children }}
                    classNames={{ color: 'teal' }}
                  />
                );
              },
              image: props => renderImage(props),
            }}
          />
        </article>
        <div>
          {articles && (
            <Heading tag="span" size="large" color="black">
              Related Articles
            </Heading>
          )}
          {articles?.map((el, indx) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={`${el?.name}_${indx.toString()}`}
              className="card__article"
              imageSrc={el?.featuredImage?.file?.url || ''}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{ href: el?.slug || '', label: el?.title || '' }}
                    className="card--link"
                    classNames={{ color: 'black', size: 'regular' }}
                  />
                ),
              }}
              description={getBody(el?.body || '')}
            >
              <Button
                onClick={() => {
                  Router.push(el?.slug || '');
                }}
                label="Read More"
                color="teal"
                size="small"
                fill="clear"
                className="-mt-400"
              />
            </Card>
          ))}
        </div>
      </div>
      {metaData && <Head metaData={metaData} featuredImage={null} />}
    </>
  );
};

export default BlogPostContainer;
