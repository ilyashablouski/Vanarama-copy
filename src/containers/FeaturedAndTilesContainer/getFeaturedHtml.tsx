import { gql } from '@apollo/client';
import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQueryFeatured } from '../../../generated/GenericPageQueryFeatured';
import FCWithFragments from '../../utils/FCWithFragments';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IFeatured {
  featured: GenericPageQueryFeatured | null | undefined;
}

export const FeaturedHtml: FCWithFragments<IFeatured> = ({ featured }) => {
  const featuredClass = getFeaturedClassPartial(featured);
  return (
    <>
      {featured && (
        <section className={`row:${featuredClass}`}>
          {featured.image?.file?.url && (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={featured.image?.file?.url}
              alt={featured.image?.file?.fileName}
            />
          )}
          <div>
            <Heading
              color="black"
              size="lead"
              tag={
                getTitleTag(
                  featured.titleTag || 'h2',
                ) as keyof JSX.IntrinsicElements
              }
            >
              {featured.title}
            </Heading>
            <ReactMarkdown
              allowDangerousHtml
              source={featured.body || ''}
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
                heading: props => (
                  <Text {...props} size="lead" color="darker" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
};

FeaturedHtml.fragments = {
  featured: gql`
    fragment GenericPageQueryFeatured on Featured {
      layout
      body
      title
      titleTag
      video
      defaultHeight
      iconList {
        text
      }
      link {
        url
        text
        legacyUrl
      }
      title
      cards {
        name
        title
        image {
          title
          description
          file {
            url
            fileName
          }
        }
        body
        link {
          text
          url
          legacyUrl
        }
      }
      image {
        title
        description
        file {
          url
          fileName
        }
      }
      testimonials {
        customerName
        summary
        rating
      }
    }
  `,
};

export default FeaturedHtml;
