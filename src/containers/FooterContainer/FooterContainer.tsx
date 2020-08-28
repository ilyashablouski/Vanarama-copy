import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import withApollo from '../../hocs/withApollo';
import { PRIMARY_FOOTER } from '../../gql/header';
import {
  PrimaryFooter,
  PrimaryFooter_primaryFooter_linkGroups as LinkGroups,
} from '../../../generated/PrimaryFooter';
import RouterLink from '../../components/RouterLink/RouterLink';

const FooterContainer: FC = () => {
  const { data, loading } = useQuery<PrimaryFooter>(PRIMARY_FOOTER);

  const renderFooterColumn = (linkGroup: LinkGroups | null) => {
    if (linkGroup) {
      return (
        <div className="footer--column">
          <Heading color="medium" tag="span" size="small">
            {linkGroup.name}
          </Heading>
          {!(linkGroup.links?.length || linkGroup.linkGroups?.length) &&
            linkGroup.body && <ReactMarkdown source={linkGroup.body} />}
          {linkGroup.links && (
            <ul>
              {linkGroup.links?.map(link => (
                <li>
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
                <li className={el?.links ? '-mb-300' : ''}>
                  <Text size="small" color="medium" tag="span">
                    {el?.name}
                  </Text>{' '}
                  {el?.links?.map(link =>
                    link?.url ? (
                      <a className="link -white -small" href={link?.url || ''}>
                        {link?.text}
                      </a>
                    ) : (
                      <Text size="small" color="white" tag="span">
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

  if (loading) {
    return <></>;
  }

  if (data?.primaryFooter) {
    const { linkGroups, legalStatement } = data.primaryFooter;
    return (
      <footer className="footer">
        {linkGroups?.map(linkGroup => renderFooterColumn(linkGroup))}
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
  }
  return <></>;
};

export default withApollo(FooterContainer);
