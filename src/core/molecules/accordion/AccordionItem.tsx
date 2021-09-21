import cx from 'classnames';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toDataAbTestIdFormat } from '../../../utils/helpers';
import AccordionHeading from './AccordionHeading';
import RouterLink from '../../../components/RouterLink';

export interface IAccordionItem {
  id: number | string;
  title: string;
  children?: React.ReactNode;
}

interface IProps {
  item: IAccordionItem;
  dataAbTestId?: string;
}

const AccordionItem: React.FC<IProps> = ({ item, dataAbTestId }) => {
  const [setActive, setActiveState] = useState(false);

  const toggleAccordion = () => {
    setActiveState(!setActive);
  };

  return (
    <li
      key={item.id}
      className={cx('accordion-item', {
        'accordion-item--active': setActive,
      })}
      data-testid={setActive ? 'accordion-item--active' : 'accordion-item'}
      data-abtestid={
        item.title === 'No Admin Fees' && dataAbTestId
          ? toDataAbTestIdFormat(dataAbTestId, item.title)
          : undefined
      }
    >
      <AccordionHeading title={item.title} onClick={() => toggleAccordion()} />

      <div className="accordion--content">
        {typeof item.children === 'string' ? (
          <ReactMarkdown
            source={item.children as string}
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
            }}
          />
        ) : (
          item.children
        )}
      </div>
    </li>
  );
};

export default AccordionItem;
