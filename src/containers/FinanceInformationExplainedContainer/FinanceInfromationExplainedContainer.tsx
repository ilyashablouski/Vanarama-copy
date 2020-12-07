import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames';
import getTitleTag from '../../utils/getTitleTag';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_faqs as FAQ,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Skeleton from '../../components/Skeleton';

const AddCircleSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/AddCircleSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const RemoveCircleSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/RemoveCircleSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Accordion = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/accordion/Accordion'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  sections: Section | null;
  title: string | null;
}

const FinanceInformationExplainedContainer: FC<IProps> = ({
  title,
  sections,
}) => {
  const faqs: FAQ = getSectionsData(['faqs'], sections);
  const questionTypes = faqs?.questionSets?.map(
    questionSet => questionSet?.title,
  ) || [''];

  const [questionType, setQuestionType] = useState(
    questionTypes ? questionTypes[0] : '',
  );

  const getQuestions = () => {
    const sets = faqs?.questionSets?.find(
      questionSet => questionSet?.title === questionType,
    );
    return sets?.questionAnswers?.map(set => ({
      id: set?.question || '',
      title: set?.question || '',
      children: (
        <ReactMarkdown
          className="markdown"
          allowDangerousHtml
          source={set?.answer || ''}
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

  const iconBullets1 = sections?.iconBullets1;
  const iconBullets2 = sections?.iconBullets2;
  const featured = sections?.featured || sections?.featured1;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      {featured && (
        <div className="row:text -columns">
          <Heading
            tag={
              getTitleTag(
                sections?.featured1?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            color="black"
            size="large"
            className="-mb-400"
          >
            {featured.title || ''}
          </Heading>
          <div className="content">
            <ReactMarkdown
              className="markdown"
              allowDangerousHtml
              source={featured.body || ''}
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
                  <Text {...props} size="lead" color="inherit" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="inherit" />,
              }}
            />
          </div>
        </div>
      )}
      {iconBullets1 && (
        <div className="row:icon-list">
          <Heading size="lead" color="black">
            {iconBullets1.title || ''}
          </Heading>
          <hr />
          {iconBullets1?.iconBullets?.map(iconBullet => (
            <>
              <Icon icon={<AddCircleSharp />} color="orange" />
              <Text
                className="context-justify"
                tag="span"
                size="regular"
                color="darker"
              >
                {' '}
                {iconBullet?.text}
              </Text>
            </>
          ))}
        </div>
      )}
      {iconBullets2 && (
        <div className="row:icon-list">
          <Heading size="lead" color="black">
            {iconBullets2.title || ''}
          </Heading>
          <hr />
          {iconBullets2?.iconBullets?.map(iconBullet => (
            <>
              <Icon icon={<RemoveCircleSharp />} color="orange" />
              <Text
                className="context-justify"
                tag="span"
                size="regular"
                color="darker"
              >
                {' '}
                {iconBullet?.text}
              </Text>
            </>
          ))}
        </div>
      )}
      {sections?.featured2 && (
        <div className="row:text">
          <Heading
            tag={
              getTitleTag(
                sections?.featured2?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            color="black"
            size="large"
          >
            {sections.featured2.title || ''}
          </Heading>
          <div className="content">
            <ReactMarkdown
              allowDangerousHtml
              source={sections.featured2.body || ''}
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
                  <Text {...props} size="lead" color="inherit" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="inherit" />,
              }}
            />
          </div>
        </div>
      )}
      <div className="row:lead-text">
        <Heading color="black" size="xlarge">
          {faqs?.title || ''}
        </Heading>
        <Text size="regular" color="darker">
          {faqs?.body || ''}
        </Text>
      </div>
      {faqs?.questionSets && faqs?.questionSets?.length > 0 && (
        <div className="tabs-wrap row:tabbed">
          <nav className="tabs -content-end -alt -lead -center">
            <div className="tabs__list-wrap">
              <div className="tabs__list" role="tablist">
                {questionTypes?.map((type, idx) => (
                  <button
                    key={type || idx}
                    onClick={() => setQuestionType(type)}
                    type="button"
                    className={cx(
                      '-start',
                      questionType === type ? '-active' : '',
                    )}
                    role="tab"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="tabs__panel -ph-000" role="tabpanel">
            <Accordion
              className="tilebox tabs--active"
              items={getQuestions() || []}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FinanceInformationExplainedContainer;
