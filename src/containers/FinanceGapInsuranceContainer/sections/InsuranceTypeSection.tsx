/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import {
  GenericPageQuery_genericPage_sections_featured1_link,
  GenericPageQuery_genericPage_sections_featured2_link,
} from '../../../../generated/GenericPageQuery';
import RouterLink from '../../../components/RouterLink/RouterLink';

interface IProps {
  heading: string | null;
  description?: string | null;
  body?: string | null;
  link1?: GenericPageQuery_genericPage_sections_featured1_link | null;
  link2?: GenericPageQuery_genericPage_sections_featured2_link | null;
  showModal?: () => void;
}

const goToTop = () => window.scrollTo(0, 0);

const InsuranceTypeSection = ({
  heading,
  description,
  body,
  link1,
  link2,
  showModal,
}: IProps) => (
  <div className="row:lead-text">
    <Heading size="xlarge" color="black">
      {heading}
    </Heading>
    {(description || body) && (
      <div>
        <ReactMarkdown
          escapeHtml={false}
          source={description || body || ''}
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
            image: props => {
              const { src, alt } = props;
              return <img {...{ src, alt }} style={{ maxWidth: '100%' }} />;
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
    )}

    {link1 && link2 && (
      <div className="button-group">
        <Button
          size="regular"
          color="teal"
          fill="solid"
          label={link1?.text}
          onClick={showModal}
        />
        <Button
          size="regular"
          color="teal"
          fill="outline"
          label={link2?.text}
          onClick={goToTop}
        />
      </div>
    )}
  </div>
);

export default InsuranceTypeSection;
