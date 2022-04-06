import { memo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';

import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData?: GenericPageQuery;
  customDescription?: string;
}

const CommonDescriptionContainer = memo(
  ({ pageData, customDescription }: IProps) => {
    const description = pageData?.genericPage?.intro;
    const featuredImage = pageData?.genericPage?.featuredImage?.file;
    const title = pageData?.genericPage.metaData.name;

    return description || featuredImage?.url ? (
      <section className="row:featured-right">
        {featuredImage?.url && (
          <ImageV2
            quality={70}
            optimisedHost
            lazyLoad={false}
            width={featuredImage.details.image.width}
            height={featuredImage.details.image.height}
            src={featuredImage.url}
            alt={title ?? ''}
          />
        )}
        {description && (
          <article>
            <ReactMarkdown
              className="markdown"
              allowDangerousHtml
              source={customDescription || description}
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
                image: props => {
                  const { src, alt } = props;
                  return <img {...{ src, alt }} style={{ maxWidth: '100%' }} />;
                },
                heading: props => (
                  <Text {...props} size="lead" color="darker" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </article>
        )}
      </section>
    ) : null;
  },
);

export default CommonDescriptionContainer;
