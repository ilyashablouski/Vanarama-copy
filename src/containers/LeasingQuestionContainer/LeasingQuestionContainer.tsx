import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import {
  GenericPageQuestionQuery_genericPage_sections_cards_cards as ICaruselCard,
  GenericPageQuestionQuery_genericPage_sections as Section,
  GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers as IQuestion,
} from '../../../generated/GenericPageQuestionQuery';
import getTitleTag from '../../utils/getTitleTag';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import RouterLink from 'components/RouterLink/RouterLink';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  crumbs: { href: string; label: string }[];
}

const renderCarouselCards = (cards: (ICaruselCard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <Card
        key={card.name}
        className="card__article"
        title={{ title: card?.title }}
        imageSrc={card.image?.file?.url}
      >
        <Text size="regular" color="dark">
          {card.body || ''}
        </Text>
        <Button
          fill="clear"
          color="teal"
          size="regular"
          label={card?.link?.text}
          onClick={() => {
            Router.push(card?.link?.url || '');
          }}
        />
      </Card>
    ) : null,
  );

const accordionItems = (questions: (IQuestion | null)[] | undefined | null) => {
  debugger;
  return questions ? questions.map((item: any) => ({
    id: item.question,
    key: item.question,
    title: item.question,
    children: (
      <ReactMarkdown
        source={item.answer || ''}
        renderers={{
          link: props => {
            const { href, children } = props;
            return <RouterLink link={{ href, label: children }} />;
          },
        }}
      />)
  })) : [];
};

const renderQuestions = (questions: (IQuestion | null)[] | undefined | null) => {
  questions?.length ? (
    <Accordion items={accordionItems(questions)} />
  ) : (
      <p>Error: No questions</p>
    )
}


const LeasingQuestionContainer: FC<IProps> = ({
  body,
  title,
  sections,
  crumbs,
}) => {
  const carousel = sections?.cards;
  const questionSet = sections?.questionSet;
  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
        <ReactMarkdown source={body || ''} />
        <Button
          type="button"
          label={'Ask A Question'}
          disabled={false}
          color="primary"
          icon={<ArrowForwardSharp />}
          iconColor="white"
          iconPosition="after"
          dataTestId="ask-a-question"
        />
      </div>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          <Heading tag={getTitleTag(carousel?.titleTag || null) as keyof JSX.IntrinsicElements} size="large" color="black">
            {carousel?.title || ''}
          </Heading>
          {carousel?.cards && (
            <Carousel className="-col3" countItems={3}>
              {renderCarouselCards(carousel?.cards)}
            </Carousel>
          )}
        </div>
      </div>
      <div className="row:bg-lighter">
        <div className="row:cards-3col">
          <Heading tag="h2" size="large" color="black">
            {questionSet?.title || ''}
          </Heading>
          {renderQuestions(questionSet?.questionAnswers)}
        </div>
      </div>
    </>
  );
};

export default LeasingQuestionContainer;
