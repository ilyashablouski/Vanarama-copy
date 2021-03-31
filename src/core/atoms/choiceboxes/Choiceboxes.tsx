/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import cx from 'classnames';
import { IChoiceboxesProps, IChoice } from './interfaces';
import Icon from '../icon';
import BodyStyleIconMap from '../../../utils/bodyStyleIconMap';

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
    }: IChoiceboxesProps,
    ref,
  ) => {
    const [currentChoices, setCurrentChoices] = useState(choices);
    const [clearMultiSelectActive, setClearMultiSelectActive] = useState(false);

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
      index !== -1 && onSubmit(changedChoices[index]);
      setCurrentChoices(changedChoices);
    };

    useImperativeHandle(ref, () => ({
      updateState() {
        setCurrentChoices(choices);
      },
    }));

    useEffect(() => {
      if (currentValue?.length && currentValue[0] === '') {
        setClearMultiSelectActive(true);
      }
      if (currentChoices.length === 1) {
        changeChoices(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cx('choiceboxes', className, `-${color}`)}>
        {currentChoices.map((choice: IChoice, index: number) => (
          <button
            disabled={disabled}
            key={choice.value}
            type="button"
            className={cx('choicebox', choice.active ? '-active' : null)}
            onClick={() => {
              changeChoices(index);
              clearMultiSelectActive && setClearMultiSelectActive(false);
            }}
          >
            {choice.label}
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
            className={cx('choicebox', { '-active': clearMultiSelectActive })}
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
