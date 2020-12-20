import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import {
  GenericPageQuestionQuery_genericPage_sections as Section,
  GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers as IQuestion,
} from '../../../generated/GenericPageQuestionQuery';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Accordion = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/accordion/Accordion'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const CarouselCards = dynamic(() => import('./CarouselCards'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const accordionItems = (questions: (IQuestion | null)[] | undefined | null) => {
  return questions
    ? questions.filter(Boolean).map((item: IQuestion | null, id) => ({
        id,
        key: item?.question || '',
        title: item?.question || '',
        children: (
          <ReactMarkdown
            allowDangerousHtml
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

const LeasingQuestionContainer: FC<IProps> = ({ body, title, sections }) => {
  const cards = sections?.cards;
  const questionSet = sections?.questionSet;
  return (
    <>
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
        <ReactMarkdown
          allowDangerousHtml
          source={body || ''}
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
          }}
        />
        {/* <Button // NOTE: Functionality does not exist yet, so - commented out.
          type="button"
          label="Ask A Question"
          disabled={false}
          color="primary"
          icon={<ArrowForwardSharp />}
          iconColor="white"
          iconPosition="after"
          dataTestId="ask-a-question"
        /> */}
      </div>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          <Heading
            tag={
              getTitleTag(
                cards?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            size="large"
            color="black"
          >
            {cards?.name || ''}
          </Heading>
          {cards?.cards && <CarouselCards cards={cards?.cards} />}
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
