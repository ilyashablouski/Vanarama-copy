import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_faqs_questionSets,
  GenericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  sections: Section | null | undefined;
  title: string | null | undefined;
  intro: string | null | undefined;
  breadcrumbsData: any;
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
        allowDangerousHtml
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
            <Text {...props} size="lead" color="darker" tag="h3" />
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

const FAQContainer: FC<IProps> = ({
  title,
  sections,
  intro,
  breadcrumbsData,
}) => {
  const questionSets = sections?.faqs?.questionSets;
  const breadcrumbsItems = breadcrumbsData?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));
  return (
    <>
      <div className="row:title">
        {breadcrumbsItems && <Breadcrumb items={breadcrumbsItems} />}
        <Heading size="xlarge" color="black" tag="h1">
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
