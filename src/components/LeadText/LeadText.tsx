import { FC } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import cx from 'classnames';

import { IBaseProps } from 'core/interfaces/base';

import { GenericPageQuery_genericPage_sections_leadText as ILead } from '../../../generated/GenericPageQuery';
import { Nullish } from '../../types/common';

import RouterLink from '../RouterLink';

interface ILeadEX extends IBaseProps {
  leadText: Nullish<ILead>;
}

const LeadText: FC<ILeadEX> = ({ className, leadText }) => (
  <section className={cx('row:bg-default', className)}>
    <hr className="-fullwidth" />
    <h2
      className="heading -xlarge -orange -mv-500"
      style={{ transform: 'scale(0.9)' }}
    >
      {leadText?.heading}
    </h2>
    <hr className="-fullwidth" />
    {leadText?.description && (
      <div className="markdown -m-zero-auto -mt-600">
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
  </section>
);

export default LeadText;
