/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import cx from 'classnames';
import { IChoiceBoxesProps, IChoice } from './interfaces';
import Icon from '../icon';
import BodyStyleIconMap from '../../../utils/bodyStyleIconMap';
import { getPartnerProperties } from '../../../utils/partnerProperties';

const Choiceboxes = forwardRef(
  (
    {
      className,
      color = 'teal',
      choices,
      multiSelect,
      onSubmit,
      disabled,
      clearMultiSelectTitle,
      onClearClick,
      withIcons,
      currentValue,
      shouldSelectTheOnlyValue = false,
      choiceIndex,
      setChoiceIndex,
      boxClassName,
      labelClassName,
      preventUnselectAllValues = false,
      dataUiTestId,
    }: IChoiceBoxesProps,
    ref,
  ) => {
    const [currentChoices, setCurrentChoices] = useState(choices);
    const [clearMultiSelectActive, setClearMultiSelectActive] = useState(false);
    const [partnershipColor, setPartnerShipColor] = useState<
      string | undefined
    >(undefined);

    const changeChoices = (index: number) => {
      const changedChoices = currentChoices.map(
        (choice: IChoice, number: number) => {
          if (multiSelect) {
            if (index === -1) {
              return {
                ...choice,
                active: false,
              };
            }
            return {
              ...choice,
              active: number === index ? !choice.active : choice.active,
            };
          }
          return {
            ...choice,
            active: number === index,
          };
        },
      );
      const numberOfActiveChoices = changedChoices.reduce(
        (count, choice) => (choice.active ? count + 1 : count),
        0,
      );
      if (preventUnselectAllValues && numberOfActiveChoices === 0) {
        return;
      }
      index !== -1 && onSubmit(changedChoices[index]);
      if (index !== -1 && setChoiceIndex) {
        setChoiceIndex(index);
      }
      setCurrentChoices(changedChoices);
    };

    useEffect(() => {
      if (choiceIndex || choiceIndex === 0) {
        changeChoices(choiceIndex);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choiceIndex]);

    useEffect(() => {
      const partner = getPartnerProperties();
      if (partner?.color) {
        setPartnerShipColor(partner.color);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      updateState() {
        setCurrentChoices(choices);
      },
    }));

    useEffect(() => {
      if (currentValue?.length && currentValue[0] === '') {
        setClearMultiSelectActive(true);
      }
      if (currentChoices.length === 1 && shouldSelectTheOnlyValue) {
        changeChoices(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cx('choice-boxes', className, `-${color}`)}>
        {currentChoices.map((choice: IChoice, index: number) => (
          <button
            style={
              choice.active && partnershipColor
                ? {
                    background: `${partnershipColor}`,
                    border: `${partnershipColor}`,
                  }
                : {}
            }
            disabled={disabled}
            key={choice.value}
            type="button"
            className={cx(
              'choice-box',
              boxClassName,
              choice.active ? '-active' : null,
            )}
            onClick={() => {
              changeChoices(index);
              clearMultiSelectActive && setClearMultiSelectActive(false);
            }}
          >
            <span
              className={cx('choice-label', labelClassName)}
              data-uitestid={
                dataUiTestId
                  ? `${dataUiTestId}_span_${choice.label}`
                  : undefined
              }
            >
              {choice.label}
            </span>
            {withIcons && (
              <Icon
                color="teal"
                icon={BodyStyleIconMap.get(choice?.label.replace(/\s+/g, ''))}
                size="xlarge"
                className="md hydrated"
              />
            )}
          </button>
        ))}
        {clearMultiSelectTitle && choices.length !== 1 && (
          <button
            key={clearMultiSelectTitle}
            type="button"
            className={cx('choice-box', { '-active': clearMultiSelectActive })}
            onClick={() => {
              setClearMultiSelectActive(!clearMultiSelectActive);
              changeChoices(-1);
              onClearClick && onClearClick();
            }}
          >
            {clearMultiSelectTitle}
          </button>
        )}
      </div>
    );
  },
);

export default React.memo(Choiceboxes);
