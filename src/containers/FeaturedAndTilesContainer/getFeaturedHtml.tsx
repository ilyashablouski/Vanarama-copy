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
const Image = dynamic(() => import('core/atoms/image'), {
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
  return (
    <>
      {featured && (
        <section className={`row:${featuredClass}`}>
          {featured.image?.file?.url && (
            <div>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src={featured.image?.file?.url}
                alt={featured.image?.file?.fileName}
              />
            </div>
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

export default FeaturedHtml;
