import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import RouterLink from '../../../components/RouterLink';

interface IProps {
  description: string | null;
  heading: string | null;
}

const DerangedLeadSection: React.FC<IProps> = ({ description, heading }) => (
  <section className="row:bg-default lead-deranged -mv-600">
    <h2 className="heading -large -black">{heading || ''}</h2>
    {description && (
      <div className="-mt-300">
        <ReactMarkdown
          allowDangerousHtml
          source={description || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
          }}
        />
      </div>
    )}
  </section>
);

export default React.memo(DerangedLeadSection);
