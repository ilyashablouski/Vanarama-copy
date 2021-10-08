import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Image from 'core/atoms/image/Image';
import dynamic from 'next/dynamic';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData: GenericPageQuery | undefined;
}

const TopCategoryInfoBlock = ({ pageData }: IProps) => {
  return (
    <section className="row:featured-left">
      <div>
        <Heading
          className="-mb-400"
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['sectionsAsArray', 'featured', '0', 'titleTag'],
                pageData?.genericPage,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(
            ['sectionsAsArray', 'featured', '0', 'title'],
            pageData?.genericPage,
          )}
        </Heading>
        <div className="markdown full-width">
          <ReactMarkdown
            allowDangerousHtml
            source={getSectionsData(
              ['sectionsAsArray', 'featured', '0', 'body'],
              pageData?.genericPage,
            )}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} className="large" color="darked" tag="h3" />
              ),

              paragraph: props => (
                <Text
                  {...props}
                  tag="span"
                  className="-big"
                  size="full-width"
                  color="darked"
                />
              ),
            }}
          />
        </div>
      </div>
      <Image
        className="card-image range__featured-image"
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        src={getSectionsData(
          ['sectionsAsArray', 'featured', '0', 'image', 'file', 'url'],
          pageData?.genericPage,
        )}
      />
    </section>
  );
};

export default TopCategoryInfoBlock;
