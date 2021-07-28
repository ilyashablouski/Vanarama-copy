import cx from 'classnames';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AccordionHeading from './AccordionHeading';
import RouterLink from '../../../components/RouterLink';

export interface IAccordionItem {
  id: number | string;
  title: string;
  children?: React.ReactNode;
}

interface IProps {
  item: IAccordionItem;
}

const AccordionItem: React.FC<IProps> = ({ item }) => {
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
