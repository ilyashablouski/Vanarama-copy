import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import {
  GenericPageQuestionQuery_genericPage_sections as Section,
  GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers as IQuestion,
} from '../../../generated/GenericPageQuestionQuery';
import CarouselCards from './CarouselCards';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  crumbs: { href: string; label: string }[];
}

const accordionItems = (questions: (IQuestion | null)[] | undefined | null) => {
  return questions
    ? questions.map((item: IQuestion | null, id) => ({
        id,
        key: item?.question || '',
        title: item?.question || '',
        children: (
          <ReactMarkdown
            source={item?.answer || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
        ),
      }))
    : [];
};

const renderQuestions = (
  questions: (IQuestion | null)[] | undefined | null,
) => {
  return questions?.length ? (
    <Accordion className="tilebox" items={accordionItems(questions)} />
  ) : (
    <p>Error: No questions</p>
  );
};

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
          label="Ask A Question"
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
          <Heading
            tag={
              getTitleTag(
                carousel?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            size="large"
            color="black"
          >
            {carousel?.title || ''}
          </Heading>
          {carousel?.cards && <CarouselCards cards={carousel?.cards} />}
        </div>
      </div>
      <div className="row:bg-lighter">
        <div className="row:lead-text">
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
