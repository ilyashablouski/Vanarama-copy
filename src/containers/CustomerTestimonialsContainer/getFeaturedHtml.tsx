import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sections_featured as Featured } from '../../../generated/GenericPageQuery';

export default function getFeaturedHtml(featured: Featured | null | undefined) {
  return (
    <>
      {featured && (
        <section className="row:text">
          {featured.image?.file?.url && (
            <Image
              src={featured.image?.file?.url}
              alt={featured.image?.file?.fileName}
            />
          )}
          <Heading color="black" size="large">
            {featured.title}
          </Heading>
          <div>
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
