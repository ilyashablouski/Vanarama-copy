import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import {
  GenericPageQuery_genericPage_sections_featured1 as Featured1Type,
  GenericPageQuery_genericPage_sections_featured2 as Featured2Type,
  GenericPageQuery_genericPage_sections_featured3 as Featured3Type,
} from '../../../generated/GenericPageQuery';

export default function getFeaturedHtml(
  featured: Featured1Type | Featured2Type | Featured3Type | null | undefined,
) {
  const featuredClass = getFeaturedClassPartial(featured);
  return (
    <>
      {featured && (
        <section className={`row:${featuredClass}`}>
          {featured.image?.file?.url && (
            <Image
              src={featured.image?.file?.url}
              alt={featured.image?.file?.fileName}
            />
          )}
          <div>
            <Heading
              color="black"
              size="lead"
              tag={
                getTitleTag(
                  featured.titleTag || 'h2',
                ) as keyof JSX.IntrinsicElements
              }
            >
              {featured.title}
            </Heading>
            <ReactMarkdown
              source={featured.body || ''}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
                heading: props => (
                  <Text
                    {...props}
                    size="lead"
                    color="darker"
                    className="-mt-100"
                  />
                ),
                paragraph: props => <Text {...props} tag="p" color="darker" />,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
