import cx from 'classnames';
import React, { useState } from 'react';
import AccordionHeading from './AccordionHeading';

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
      <div className="accordion--content">{item.children}</div>
    </li>
  );
};

export default AccordionItem;
