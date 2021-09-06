import { FC } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from 'core/atoms/heading';
import { GenericPageQuery_genericPage_sections_leadText as ILead } from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink';

interface ILeadEX {
  leadText: ILead | null | undefined;
}

const LeadTextComponent: FC<ILeadEX> = ({ leadText }) => (
  <section className="row:bg-default">
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
    <hr className="-fullwidth" />
  </section>
);

export default LeadTextComponent;
