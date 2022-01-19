import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQueryFeatured } from '../../../generated/GenericPageQueryFeatured';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IFeatured {
  featured: GenericPageQueryFeatured | null | undefined;
}

export const FeaturedHtml: React.FC<IFeatured> = ({ featured }) => {
  const featuredClass = getFeaturedClassPartial(featured);
  const featuredImage = featured?.image?.file;

  return (
    <>
      {featured && (
        <section className={`row:${featuredClass}`}>
          {featuredImage?.url && (
            <ImageV2
              quality={60}
              width={featuredImage?.details.image.width}
              height={featuredImage?.details.image.height}
              src={featuredImage?.url ?? ''}
              alt={featured.title ?? ''}
            />
          )}
          <article>
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
          </article>
        </section>
      )}
    </>
  );
};

export default FeaturedHtml;
