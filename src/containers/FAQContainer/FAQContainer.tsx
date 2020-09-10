/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_faqs_questionSets,
  GenericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IProps {
  sections: Section | null;
  title: string | null;
  intro: string | null;
}

const getAccordionItemsInside = (
  questionAnswers:
    | (GenericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers | null)[]
    | null
    | undefined,
) => {
  return questionAnswers?.map(questionAnswer => ({
    id: questionAnswer?.question || '',
    title: questionAnswer?.question || '',
    children: (
      <ReactMarkdown
        source={questionAnswer?.answer || ''}
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
            <Text {...props} size="lead" color="darker" className="-mt-100" />
          ),
          paragraph: props => <Text {...props} tag="p" color="darker" />,
        }}
      />
    ),
  }));
};

const getAccordionItems = (
  questionSets:
    | (GenericPageQuery_genericPage_sections_faqs_questionSets | null)[]
    | null
    | undefined,
) => {
  return questionSets?.map(questionSet => ({
    id: questionSet?.title || '',
    title: questionSet?.title || '',
    children: (
      <Accordion
        key={questionSet?.title || ''}
        className="tilebox"
        items={getAccordionItemsInside(questionSet?.questionAnswers) || null}
      />
    ),
  }));
};

const FAQContainer: FC<IProps> = ({ title, sections, intro }) => {
  const questionSets = sections?.faqs?.questionSets;

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Van Insurance', href: `/van-insurance` },
    { label: title || '', href: `/van-insurance/faq` },
  ];

  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
        <Heading size="xlarge" color="black">
          {title || ''}
        </Heading>
        <Text color="dark" size="regular">
          {intro || ''}
        </Text>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Accordion
            className="tilebox"
            items={getAccordionItems(questionSets) || null}
          />
        </div>
      </div>
    </>
  );
};

export default FAQContainer;
