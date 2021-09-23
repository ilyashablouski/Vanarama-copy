import cx from 'classnames';
import React from 'react';
import { IBaseProps } from 'core/interfaces/base';
import AccordionItem, { IAccordionItem } from './AccordionItem';

interface IProps extends IBaseProps {
  items: IAccordionItem[] | null;
  dataAbTestId?: string;
}

const Accordion: React.FC<IProps> = ({ items, className, dataAbTestId }) => {
  const renderAccordionItem = () => {
    return items?.map(item => (
      <AccordionItem key={item.id} item={item} dataAbTestId={dataAbTestId} />
    ));
  };

  return (
    <ul className={cx(className, 'accordion')}>
      {items && renderAccordionItem()}
    </ul>
  );
};

export default Accordion;
