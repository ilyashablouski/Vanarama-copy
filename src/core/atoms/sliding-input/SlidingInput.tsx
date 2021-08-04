import React, {
  useRef,
  useState,
  CSSProperties,
  useEffect,
  ChangeEvent,
  useMemo,
} from 'react';
import cx from 'classnames';
import { ISlidingInputProps, ISlidingObject } from './interfaces';

const SlidingInput: React.FC<ISlidingInputProps> = ({
  defaultValue = 1,
  setDefaultMileageIndex,
  steps,
  onChange,
  disabled,
  disabledFirstStep,
  disabledLastStep,
}) => {
  const myRef = useRef<HTMLLabelElement>(null);
  const changeTimeoutRef = useRef<NodeJS.Timeout>();

  const [mouseDown, setMouseDown] = useState(false);
  const [mileageValue, setMileageValue] = useState(defaultValue);

  useEffect(() => {
    setMileageValue(defaultValue);
  }, [defaultValue]);

  function cleanupChangeTimeout() {
    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }
  }

  useEffect(() => {
    return cleanupChangeTimeout;
  }, []);

  const handleValueChange = (pageX: number, isApplied?: boolean) => {
    if (!disabled) {
      const coordinates = myRef?.current?.getBoundingClientRect();
      const width =
        ((coordinates?.right || 0) - (coordinates?.left || 0)) / steps.length;

      const value = Math.floor((pageX - (coordinates?.left || 0)) / width);
      if (
        (value === 0 && disabledFirstStep) ||
        (value === steps.length - 1 && disabledLastStep)
      ) {
        setMileageValue(mileageValue);

        if (setDefaultMileageIndex) {
          setDefaultMileageIndex(mileageValue);
        }
      } else if (+value < steps.length && value >= 0) {
        setMileageValue(+value + 1);

        if (setDefaultMileageIndex) {
          setDefaultMileageIndex(+value + 1);
        }

        if (isApplied) {
          onChange(+value + 1);
        }
      }
    }
  };

  const handleMouseIn = () => {
    setMouseDown(true);
  };
  const handleMouseOut = () => {
    setMouseDown(false);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    setMileageValue(value);
    cleanupChangeTimeout();
    changeTimeoutRef.current = setTimeout(() => {
      onChange(value);
    }, 1000);
  };

  const labels = useMemo(
    () =>
      steps.map(step => {
        const value = (step as ISlidingObject).label ?? (step as number);
        return `${parseInt(value, 10) / 1000}K`;
      }),
    [steps],
  );

  return (
    <label
      ref={myRef}
      className={cx('sliding-input', disabled ? 'disabled' : '')}
      style={
        { '--value': mileageValue, '--length': steps.length } as CSSProperties
      }
      onClick={elem => {
        handleValueChange(elem.pageX, true);
      }}
      onMouseMove={elem => {
        if (mouseDown) {
          handleValueChange(elem.pageX);
        }
      }}
      onTouchMove={elem => {
        handleValueChange(elem.changedTouches[0].pageX);
      }}
      onTouchEnd={elem => {
        handleValueChange(elem.changedTouches[0].pageX, true);
        handleMouseOut();
      }}
      onMouseLeave={handleMouseOut}
      onMouseUp={handleMouseOut}
      onMouseDown={handleMouseIn}
    >
      <input
        min={1}
        step={1}
        type="range"
        max={steps.length}
        value={mileageValue}
        className="sliding-input-control visually-hidden"
        onChange={handleRangeChange}
        disabled={disabled}
      />
      <div className="sliding-input-fill">
        <div className="sliding-input-value" />
      </div>
      <div className="sliding-input-handle" />
      {labels.map(label => (
        <div key={label} className="sliding-input-step">
          {label}
        </div>
      ))}
    </label>
  );
};

export default React.memo(SlidingInput);
