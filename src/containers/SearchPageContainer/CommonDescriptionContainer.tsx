import { memo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData?: GenericPageQuery;
}

const CommonDescriptionContainer = memo(({ pageData }: IProps) => {
  return (
    <section className="row:featured-right">
      {pageData?.genericPage?.featuredImage?.file?.url && (
        <div>
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={pageData.genericPage.featuredImage.file.url}
            alt="Featured image"
          />
        </div>
      )}

      <div>
        {(pageData?.genericPage?.sections?.featured1?.body ||
          pageData?.genericPage?.intro) && (
          <Text color="darker" size="regular" tag="div">
            <ReactMarkdown
              className="markdown"
              allowDangerousHtml
              source={
                (pageData?.genericPage?.intro as string) ||
                (pageData?.genericPage?.sections?.featured1?.body as string)
              }
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
          </Text>
        )}
      </div>
    </section>
  );
});

export default CommonDescriptionContainer;
