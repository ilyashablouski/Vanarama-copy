import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import { useRouter } from 'next/router';
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
  const router = useRouter();
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
            <Button // remove if excessive
              size="large"
              fill="solid"
              color="orange"
              label="View Deals"
              onClick={() => router.push('/special-offers.html')}
            />
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
                  <Card key={el.title || idx}>
                    <div className="-flex-h">
                      {el.image?.file?.url && (
                        <div style={{ marginRight: '10px' }}>
                          <Image
                            className="card-image"
                            size="regular"
                            inline
                            src={el.image?.file.url}
                            alt={el.image?.file?.fileName}
                          />
                        </div>
                      )}
                      <div>
                        <Heading size="large" color="black">
                          {el.title}
                        </Heading>
                        <ReactMarkdown source={el.body || ''} />
                      </div>
                    </div>
                  </Card>
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
          <div>
            <Button // remove if excessive
              size="large"
              fill="solid"
              color="orange"
              label="View Deals"
              onClick={() => router.push('/special-offers.html')}
            />
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
