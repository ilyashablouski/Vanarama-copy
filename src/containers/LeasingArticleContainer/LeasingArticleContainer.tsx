import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  image: string | null | undefined;
}

const LeasingArticleContainer: FC<IProps> = ({
  title,
  sections,
  image,
  body,
}) => {
  const cards = getSectionsData(['cards'], sections);

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          {image && <Image className="-white" size="expand" src={image} />}
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown
            escapeHtml={false}
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
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </article>
        <div>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                cards?.titleTag || 'span',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {cards?.name}
          </Heading>
          {cards?.cards?.map((el: Cards, ind: number) => (
            <Card
              key={`${el?.title}_${ind}`}
              title={{
                title: el?.title || '',
              }}
              imageSrc={el.image?.file?.url}
              description={el?.body || ''}
            >
              <RouterLink
                classNames={{ color: 'teal' }}
                link={{ href: el.link?.url || '', label: el.link?.text || '' }}
              >
                {el.link?.text}
              </RouterLink>
            </Card>
          ))}
        </div>
      </div>
      <div className="row:comments" />
    </>
  );
};

export default LeasingArticleContainer;
