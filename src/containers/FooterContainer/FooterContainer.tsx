import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/client';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import withApollo from '../../hocs/withApollo';
import { PRIMARY_FOOTER } from '../../gql/header';
import { PrimaryFooter } from '../../../generated/PrimaryFooter';
import RouterLink from '../../components/RouterLink/RouterLink';
import FooterColumn from './FooterColumn';

const FooterContainer: FC = () => {
  const { data, loading } = useQuery<PrimaryFooter>(PRIMARY_FOOTER);

  if (loading) {
    return <></>;
  }

  if (!data) {
    return <></>;
  }

  const { linkGroups, legalStatement } = data.primaryFooter;
  return (
    <footer className="footer">
      {linkGroups?.map(linkGroup => (
        <FooterColumn linkGroup={linkGroup} />
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

export default withApollo(FooterContainer);
