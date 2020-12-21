import React from 'react';
import cx from 'classnames';
import { IFormgroupProps } from './interfaces';
import Text from '../../atoms/text';
import Link from '../../atoms/link';

const Formgroup: React.FC<IFormgroupProps> = ({
  children,
  className,
  controlId,
  dataTestId,
  error,
  hint,
  inline,
  label,
  editable,
}) => (
  <div
    className={cx('formgroup', className, {
      '-inline': inline,
      '-invalid': error,
    })}
    data-testid={dataTestId}
  >
    {label && (
      <label className="formgroup--legend" htmlFor={controlId}>
        {label}
      </label>
    )}
    {hint && (
      <div className="formgroup--hint">
        <Text className="form--hint" size="small" color="dark">
          {hint}
        </Text>
      </div>
    )}
    {editable && (
      <div className="formgroup--editable">
        <Text color="dark">{editable}</Text>
        <Link href="#">Edit</Link>
      </div>
    )}
    {error && (
      <Text className="formgroup--error" size="small" color="danger">
        {error}
      </Text>
    )}
    <div className="formgroup--content">{children}</div>
  </div>
);

export default React.memo(Formgroup);
