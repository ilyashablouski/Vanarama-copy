import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import ImageV2 from 'core/atoms/image/ImageV2';
import dynamic from 'next/dynamic';
import getTitleTag from '../../../utils/getTitleTag';
import { getSectionsData } from '../../../utils/getSectionsData';
import RouterLink from '../../../components/RouterLink';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData: GenericPageQuery | undefined;
  dataUiTestId?: string;
}

const TopCategoryInfoBlock = ({ pageData, dataUiTestId }: IProps) => {
  const headingTag = getTitleTag(
    getSectionsData(
      ['sectionsAsArray', 'featured', '0', 'titleTag'],
      pageData?.genericPage,
    ) || 'p',
  ) as keyof JSX.IntrinsicElements;

  const headingText = getSectionsData(
    ['sectionsAsArray', 'featured', '0', 'title'],
    pageData?.genericPage,
  );

  const markdownBody = getSectionsData(
    ['sectionsAsArray', 'featured', '0', 'body'],
    pageData?.genericPage,
  );

  const imageFile = getSectionsData(
    ['sectionsAsArray', 'featured', '0', 'image', 'file'],
    pageData?.genericPage,
  );

  return (
    <section className="row:featured-left" data-uitestid={dataUiTestId}>
      <div>
        <Heading
          className="-mb-400"
          size="large"
          color="black"
          tag={headingTag}
          dataUiTestId={`${dataUiTestId}_heading`}
        >
          {headingText}
        </Heading>
        <div className="markdown full-width">
          <ReactMarkdown
            allowDangerousHtml
            source={markdownBody}
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
      <ImageV2
        quality={70}
        optimisedHost
        lazyLoad={false}
        className="card-image"
        width={imageFile?.details.image.width}
        height={imageFile?.details.image.height}
        src={imageFile?.url}
      />
    </section>
  );
};

export default TopCategoryInfoBlock;
