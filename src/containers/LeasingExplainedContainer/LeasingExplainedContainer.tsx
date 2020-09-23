import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import Router from 'next/router';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const LeasingExplainedContainer: FC<IProps> = ({ title, sections }) => {
  const cards = getSectionsData(['cards', 'cards'], sections);
  const featured = sections?.featured;
  const leadText = sections?.leadText;

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      <div className="row:bg-black">
        <div className="row:featured-right">
          <div>
            <Heading tag="span" size="large" color="white">
              {featured?.title || ''}
            </Heading>
            <Text tag="p" size="regular" color="white">
              {featured?.body || ''}
            </Text>
            {featured?.link && (
              <Button
                onClick={() => {
                  Router.push(featured?.link?.url || '');
                }}
                color="teal"
                size="regular"
                label={featured?.link?.text}
              />
            )}
          </div>
          <Media src={featured?.video || ''} width="100%" height="360px" />
        </div>
      </div>
      <div className="row:lead-text">
        <Heading size="large" color="black">
          {leadText?.heading}
        </Heading>
        <Text size="regular" color="darker">
          {leadText?.description}
        </Text>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="row:cards-3col">
            {cards?.map((el: Cards, ind: number) => (
              <Card
                key={`${el?.title}_${ind}`}
                title={{
                  title: el?.title || '',
                }}
                imageSrc={el.image?.file?.url}
                description={el?.body || ''}
              >
                <Button
                  onClick={() => {
                    Router.push(el.link?.url || '/');
                  }}
                  label={el.link?.text}
                  color="teal"
                  size="small"
                  fill="solid"
                  type="button"
                  className="-mt-400"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeasingExplainedContainer;
