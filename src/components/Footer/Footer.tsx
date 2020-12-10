import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { PrimaryFooter_primaryFooter as PrimaryFooter } from '../../../generated/PrimaryFooter';
import RouterLink from '../RouterLink/RouterLink';

const Text = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/text'),
);
const FooterColumn = dynamic(() => import('./FooterColumn'));

interface IFooter {
  primaryFooter: PrimaryFooter;
}

const Footer: FC<IFooter> = ({ primaryFooter }) => {
  const { linkGroups, legalStatement } = primaryFooter;

  return (
    <footer className="footer">
      {linkGroups?.map(linkGroup => (
        <FooterColumn linkGroup={linkGroup} key={linkGroup?.name || ''} />
      ))}
      <hr className="footer--divider -fullwidth" />
      {legalStatement?.title && (
        <Text color="white" size="xsmall" tag="p">
          {legalStatement?.title}
        </Text>
      )}
      {legalStatement?.body && (
        <div className="-text-columns">
          <Text size="xsmall" color="medium">
            <ReactMarkdown
              source={legalStatement.body}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
              }}
            />
          </Text>
        </div>
      )}
    </footer>
  );
};

export default React.memo(Footer);
