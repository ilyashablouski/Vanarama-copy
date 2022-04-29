import React from 'react';
import dynamic from 'next/dynamic';
import Text from 'core/atoms/text';
import cx from 'classnames';
import { IOptionsList } from '../../../types/detailsPage';
import { Nullable, Nullish } from '../../../types/common';
import { LeadTimeList } from '../../../utils/helpers';

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

interface IProps {
  data: IOptionsList;
  selectedItem: Nullable<number>;
  setSelectedItem: (
    optionId: Nullable<number>,
    isFactoryOrder?: boolean | undefined,
    isHotOffer?: Nullish<boolean>,
  ) => void;
}

function ColourTrimChoiceBoxes({
  data,
  selectedItem,
  setSelectedItem,
}: IProps) {
  return (
    <div className="row:cards-1col">
      {data?.options?.map(option => {
        return (
          <React.Fragment key={option?.optionId}>
            <input
              data-testid={option?.optionId}
              id={option?.label || ''}
              type="radio"
              name={data.leadTime || ''}
              value={option?.label || ''}
              className="choice-input visually-hidden"
              checked={option?.optionId === selectedItem}
              onChange={() => {
                setSelectedItem(
                  option?.optionId as number,
                  data?.leadTime?.includes(LeadTimeList.FACTORY_ORDER) || false,
                  option?.hotOffer,
                );
              }}
            />
            <label
              className={cx('colour-trim-checkbox', {
                active: option?.optionId === selectedItem,
              })}
              htmlFor={option?.label || ''}
            >
              {option?.hotOffer && (
                <Text
                  tag="span"
                  color="orange"
                  size="small"
                  className="-b -mb-100"
                  dataTestId="HOT OFFER"
                >
                  <Icon icon={<Flame />} color="orange" />
                  HOT OFFER
                </Text>
              )}
              {option?.label}
              {option?.hex && (
                <div
                  className="colour-box"
                  style={{ backgroundColor: `#${option?.hex}` }}
                />
              )}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ColourTrimChoiceBoxes;
