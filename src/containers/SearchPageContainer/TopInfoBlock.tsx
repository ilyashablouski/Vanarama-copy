import React, { memo } from 'react';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';

interface ITopInfoBlockProps {
  topInfoSection: sections;
}

// It should common component for all search pages which contain info block on the top of page
const TopInfoBlock = memo(({ topInfoSection }: ITopInfoBlockProps) => {
  return topInfoSection ? (
    <section className={`row:${getFeaturedClassPartial(topInfoSection)}`}>
      <Image src={topInfoSection.featured?.image?.file?.url || ''} />
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
        <Text className="markdown" tag="div" size="regular" color="darker">
          <ReactMarkdown
            escapeHtml={false}
            source={topInfoSection.featured?.body || ''}
          />
        </Text>
      </div>
    </section>
  ) : (
    <></>
  );
});

export default TopInfoBlock;
