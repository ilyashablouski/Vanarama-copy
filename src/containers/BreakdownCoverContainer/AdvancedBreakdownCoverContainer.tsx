import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import { getFeaturedClassPartial } from '../../utils/layout';
import { advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections as Section } from '../../../generated/advancedBreakdownCoverPage';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const AdvancedBreakdownCoverContainer: FC<IProps> = ({
  title,
  body,
  sections,
}) => {
  const featured1 = sections?.featured1;
  const tiles = sections?.tiles;
  const featured2 = sections?.featured2;

  const featured1Html = (
    <>
      {featured1 && (
        <section className={`row:${getFeaturedClassPartial(featured1)}`}>
          <div>
            <Heading
              color="black"
              size="lead"
              tag={featured1.titleTag as keyof JSX.IntrinsicElements}
            >
              {featured1.title}
            </Heading>
            <Text color="darker" size="regular" tag="p">
              <ReactMarkdown source={featured1.body || ''} />
            </Text>
          </div>
          <div>
            {featured1.image?.file?.url && (
              <Image
                src={featured1.image?.file?.url}
                alt={featured1.image?.file?.fileName}
              />
            )}
          </div>
        </section>
      )}
    </>
  );

  const tilesHtml = (
    <>
      {tiles && (
        <section className="row:bg-light">
          <div>
            <Heading
              color="black"
              size="large"
              tag={tiles.titleTag as keyof JSX.IntrinsicElements}
            >
              {tiles.tilesTitle}
            </Heading>
            {tiles?.tiles?.length && (
              <div className="row:cards-2col">
                {tiles?.tiles.map((el, idx) => (
                  <Card
                    inline
                    key={el.title || idx}
                    imageSrc={el.image?.file?.url || ''}
                    title={{
                      title: el.title || '',
                      description: el.body || '',
                    }}
                    className="breakdown"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );

  const featured2Html = (
    <>
      {featured2 && (
        <section className={`row:${getFeaturedClassPartial(featured2)}`}>
          <div>
            <Heading
              color="black"
              size="large"
              tag={featured2.titleTag as keyof JSX.IntrinsicElements}
            >
              {featured2.title}
            </Heading>
            <Text color="darker" size="regular" tag="p">
              <ReactMarkdown source={featured2.body || ''} />
            </Text>
          </div>
        </section>
      )}
    </>
  );

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black">
          {title}
        </Heading>
        <ReactMarkdown source={body || ''} />
      </div>
      {featured1Html}
      {tilesHtml}
      {featured2Html}
    </>
  );
};

export default AdvancedBreakdownCoverContainer;
