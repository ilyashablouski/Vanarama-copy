import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { PrimaryFooter_primaryFooter_linkGroups as LinkGroups } from '../../../generated/PrimaryFooter';
import RouterLink from '../RouterLink/RouterLink';
import { LinkTypes } from '../../models/enum/LinkTypes';

const Text = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/text'),
);
const Heading = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/heading'),
);

interface IFooterColumn {
  linkGroup: LinkGroups | null;
}

const FooterColumn: FC<IFooterColumn> = props => {
  const { linkGroup } = props;

  if (linkGroup) {
    return (
      <div className="footer--column" key={linkGroup.name || ''}>
        <Heading color="medium" tag="span" size="small">
          {linkGroup.name}
        </Heading>
        {!(linkGroup.links?.length || linkGroup.linkGroups?.length) &&
          linkGroup.body && <ReactMarkdown source={linkGroup.body} />}
        {linkGroup.links && (
          <ul>
            {linkGroup.links?.map(link => (
              <li key={link?.text || ''}>
                <RouterLink
                  link={{ href: link?.url || '', label: link?.text || '' }}
                  classNames={{ color: 'white', size: 'small' }}
                />
              </li>
            ))}
          </ul>
        )}
        {linkGroup.linkGroups && (
          <ul>
            {linkGroup.linkGroups?.map(el => (
              <li className={el?.links ? '-mb-300' : ''} key={el?.name || ''}>
                <Text size="small" color="medium" tag="span">
                  {el?.name}
                </Text>{' '}
                {el?.links?.map(link =>
                  link?.url ? (
                    <RouterLink
                      key={link?.text || ''}
                      link={{
                        href: link?.url || '',
                        label: link?.text || '',
                        linkType: LinkTypes.external,
                      }}
                      classNames={{ color: 'white', size: 'small' }}
                    />
                  ) : (
                    <Text
                      size="small"
                      color="white"
                      tag="span"
                      key={link?.text || ''}
                    >
                      {link?.text}
                    </Text>
                  ),
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return <></>;
};

export default FooterColumn;
