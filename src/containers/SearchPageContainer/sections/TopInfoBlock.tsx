import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { IBaseProps } from 'core/interfaces/base';
import getTitleTag from '../../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../../utils/layout';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../../generated/manufacturerPage';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});

interface ITopInfoBlockProps extends IBaseProps {
  topInfoSection: sections;
}

// It should common component for all search pages which contain info block on the top of page
const TopInfoBlock: FC<ITopInfoBlockProps> = ({
  topInfoSection,
  dataUiTestId,
}) => {
  const featuredImage = topInfoSection.featured?.image?.file;

  return (
    <section
      className={`row:${getFeaturedClassPartial(topInfoSection)}`}
      data-uitestid={dataUiTestId}
    >
      <ImageV2
        quality={60}
        width={featuredImage?.details.image.width}
        height={featuredImage?.details.image.height}
        src={featuredImage?.url || ''}
      />
      <article>
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              topInfoSection.featured?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {topInfoSection.featured?.title}
        </Heading>
        <div className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={topInfoSection.featured?.body || ''}
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
      </article>
    </section>
  );
};

export default React.memo(TopInfoBlock);
