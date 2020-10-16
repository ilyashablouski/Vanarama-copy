import React, { memo } from 'react';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import RouterLink from '../../components/RouterLink/RouterLink';

interface ITopInfoBlockProps {
  topInfoSection: sections;
}

// It should common component for all search pages which contain info block on the top of page
const TopInfoBlock = memo(({ topInfoSection }: ITopInfoBlockProps) => {
  return topInfoSection ? (
    <section className={`row:${getFeaturedClassPartial(topInfoSection)}`}>
      <Image
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        src={topInfoSection.featured?.image?.file?.url || ''}
      />
      <div>
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
            escapeHtml={false}
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
      </div>
    </section>
  ) : (
    <></>
  );
});

export default TopInfoBlock;
