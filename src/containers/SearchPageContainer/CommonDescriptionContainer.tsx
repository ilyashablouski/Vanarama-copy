import { memo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';

import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Image = dynamic(() => import('core/atoms/image'), {
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
    const description =
      pageData?.genericPage?.intro ||
      pageData?.genericPage?.sections?.featured1?.body;
    const imageUrl = pageData?.genericPage?.featuredImage?.file?.url;

    return description || imageUrl ? (
      <section className="row:featured-right">
        {imageUrl && (
          <div>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={imageUrl}
              alt="Featured image"
            />
          </div>
        )}

        {description && (
          <div>
            <Text color="darker" size="regular" tag="div">
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
                    return (
                      <img {...{ src, alt }} style={{ maxWidth: '100%' }} />
                    );
                  },
                  heading: props => (
                    <Text {...props} size="lead" color="darker" tag="h3" />
                  ),
                  paragraph: props => (
                    <Text {...props} tag="p" color="darker" />
                  ),
                }}
              />
            </Text>
          </div>
        )}
      </section>
    ) : null;
  },
);

export default CommonDescriptionContainer;
