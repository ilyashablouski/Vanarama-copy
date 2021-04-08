import React, { useState, CSSProperties } from 'react';
import cx from 'classnames';
import { ISlidingInputProps, ISlidingObject } from './interfaces';

const SlidingInput: React.FC<ISlidingInputProps> = ({
  defaultValue = 1,
  steps,
  onChange,
  disabled,
}) => {
  const myRef = React.createRef<HTMLDivElement>();
  const [mouseDown, setMouseDown] = useState(false);
  const [mileageValue, setMileageValue] = useState(defaultValue);

  const valueChange = (pageX: number, click?: string) => {
    if (!disabled) {
      const coordinates = myRef?.current?.getBoundingClientRect();
      const width =
        ((coordinates?.right || 0) - (coordinates?.left || 0)) / steps.length;

      const value = Math.floor((pageX - (coordinates?.left || 0)) / width);

      if (+value < steps.length && value >= 0) {
        setMileageValue(+value + 1);

        if (click) {
          onChange(+value + 1);
        }
      }
    }
  };

  const mouseOut = () => {
    setMouseDown(false);
    if (mileageValue !== defaultValue) {
      onChange(mileageValue);
    }
  };

  const labels = steps.map(
    step => (step as ISlidingObject).label ?? `${(step as number) / 1000}K`,
  );

  return (
    <div
      className={cx('sliding-input', disabled ? 'disabled' : '')}
      style={
        { '--value': mileageValue, '--length': steps.length } as CSSProperties
      }
      role="button"
      ref={myRef}
      onClick={elem => {
        valueChange(elem.pageX, 'click');
      }}
      onMouseMove={elem => {
        if (mouseDown) {
          valueChange(elem.pageX);
        }
      }}
      onTouchMove={elem => {
        valueChange(elem.changedTouches[0].pageX);
      }}
      onTouchEnd={() => {
        mouseOut();
      }}
      onMouseLeave={mouseOut}
      onMouseDown={() => {
        setMouseDown(true);
      }}
      onMouseUp={() => {
        mouseOut();
      }}
    >
      <div className="sliding-input-fill">
        <div className="sliding-input-value" />
      </div>
      <div className="sliding-input-handle" />
      {labels.map(label => (
        <div key={label} className="sliding-input-step">
          {label}
        </div>
      ))}
    </div>
  );
};

export default React.memo(SlidingInput);
