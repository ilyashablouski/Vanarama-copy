import Heading from 'core/atoms/heading';
import ColourTrimChoiceBoxes from 'core/atoms/colour-trim-choice-boxes/ColourTrimChoiceBoxes';
import React, { FC } from 'react';
import { IOptionsList } from '../../../types/detailsPage';
import { Nullable } from '../../../types/common';

interface IProps {
  item: IOptionsList;
  selectedItem: Nullable<number>;
  setSelectedItem: (optionId: number, isFactoryOrder?: boolean) => void;
}

const ColourTrimColumn: FC<IProps> = ({
  item,
  selectedItem,
  setSelectedItem,
}) => (
  <div key={item.leadTime}>
    <Heading tag="span" size="small" color="black" className="-mb-400">
      {item?.leadTime}
    </Heading>
    <ColourTrimChoiceBoxes
      data={item}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  </div>
);

export default ColourTrimColumn;
