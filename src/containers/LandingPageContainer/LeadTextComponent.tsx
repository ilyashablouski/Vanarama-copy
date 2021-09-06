import { FC } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from 'core/atoms/heading';
import { GenericPageQuery_genericPage_sections_leadText as ILead } from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink';

interface IProps {
  leadText: ILead | null | undefined;
}

const LeadTextComponent: FC<IProps> = ({ leadText }) => (
  <section className="row:lead-text">
    <hr className="-fullwidth" />
    <Heading
      size="large"
      color="black"
      className="-a-center"
      tag={
        getTitleTag(leadText?.titleTag || 'h2') as keyof JSX.IntrinsicElements
      }
    >
      {leadText?.heading}
    </Heading>
    {leadText?.description && (
      <div className="markdown -m-zero-auto -mt-500">
        <ReactMarkdown
          allowDangerousHtml
          source={leadText.description || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
          }}
        />
      </div>
    )}

    <div className="-a-center">
      {leadText?.link && (
        <RouterLink
          link={{
            href: leadText.link.url || '',
            label: leadText.link.text || '',
          }}
          className="button -teal -large -solid -mt-500"
          withoutDefaultClassName
        >
          <div className="button--inner">{leadText.link.text}</div>
        </RouterLink>
      )}
    </div>
  </section>
);

export default LeadTextComponent;
