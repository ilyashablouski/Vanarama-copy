import cx from 'classnames';
import React from 'react';
import { ITextareaProps } from './interfaces';

const Textarea: React.FC<ITextareaProps> = React.forwardRef<
  HTMLTextAreaElement,
  ITextareaProps
>((props, ref) => {
  const {
    className,
    cols,
    dataTestId,
    defaultValue,
    disabled,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    rows = 4,
    value,
  } = props;

  return (
    <div className={cx('textarea', className)}>
      <textarea
        className="textarea--native"
        cols={cols}
        data-testid={dataTestId}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={ref}
        rows={rows}
        value={value}
      />
    </div>
  );
});

Textarea.displayName = 'ForwardRef(Textarea)';
export default React.memo(Textarea);
