import React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import { LegalPageQuery_genericPage_sections as Section } from '../../../generated/LegalPageQuery';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});

interface IProps {
  body: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  sections: Section | null | undefined;
}

interface IImage {
  src: string;
  alt: string;
}

const renderImage = ({ src, alt }: IImage) => {
  return (
    <img
      alt={alt}
      style={{ margin: '1rem auto', display: 'block' }}
      width="90%"
      src={src}
    />
  );
};

const LegalArticleContainer: NextPage<IProps> = ({
  body,
  name,
  image,
  sections,
}) => {
  return (
    <>
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {name || ''}
        </Heading>
      </div>
      <div className="row:bg-white -compact">
        <div className="row:featured-image">
          {image && (
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              className="-white"
              size="expand"
              src={image}
            />
          )}
        </div>
      </div>
      <div className="row:centered">
        <div className="markdown" style={{ maxWidth: 'none' }}>
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
              image: props => renderImage(props),
            }}
          />
        </div>
        {sections?.legalStatement && (
          <div className="markdown" style={{ maxWidth: 'none' }}>
            {sections?.legalStatement?.name && (
              <Heading tag="h2" size="xlarge" color="black">
                {sections?.legalStatement?.title || ''}
              </Heading>
            )}
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.legalStatement?.body || ''}
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
                image: props => renderImage(props),
              }}
            />
          </div>
        )}
        {sections?.legalStatement1 && (
          <div className="markdown" style={{ maxWidth: 'none' }}>
            {sections?.legalStatement1?.name && (
              <Heading tag="h2" size="xlarge" color="black">
                {sections?.legalStatement1?.title || ''}
              </Heading>
            )}
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.legalStatement1?.body || ''}
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
                image: props => renderImage(props),
              }}
            />
          </div>
        )}
        {sections?.legalStatement2 && (
          <div className="markdown" style={{ maxWidth: 'none' }}>
            {sections?.legalStatement2?.name && (
              <Heading tag="h2" size="xlarge" color="black">
                {sections?.legalStatement2?.title || ''}
              </Heading>
            )}
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.legalStatement2?.body || ''}
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
                image: props => renderImage(props),
              }}
            />
          </div>
        )}
      </div>

      <div className="row:comments" />
    </>
  );
};

export default LegalArticleContainer;
