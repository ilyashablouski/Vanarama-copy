import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import { LegalPageQuery_genericPage_sections as Section } from '../../../generated/LegalPageQuery';

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
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
              escapeHtml={false}
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
              escapeHtml={false}
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
              escapeHtml={false}
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
