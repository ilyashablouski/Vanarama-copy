import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import { IFormgroupProps } from './interfaces';
import Text from '../../atoms/text';
import Link from '../../atoms/link';
import Skeleton from '../../../components/Skeleton';

const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const InformationCircle = dynamic(
  () => import('core/assets/icons/InformationCircle'),
  {
    ssr: false,
  },
);

const Formgroup: React.FC<IFormgroupProps> = ({
  children,
  className,
  controlId,
  dataUiTestId,
  dataTestId,
  error,
  hint,
  hintButton,
  inline,
  label,
  editable,
  onInfoIconClick,
}) => (
  <div
    className={cx('formgroup', className, {
      '-inline': inline,
      '-invalid': error,
    })}
    data-testid={dataTestId}
    data-uitestid={dataUiTestId}
  >
    {label && (
      <label
        className={cx('formgroup--legend', className, {
          '-with-hint-btn': hintButton,
        })}
        htmlFor={controlId}
      >
        {label}
        {hintButton}
      </label>
    )}
    {onInfoIconClick && (
      <Icon
        icon={<InformationCircle />}
        color="teal"
        className="md hydrated -ml-100 -info-modal"
        onClick={() =>
          onInfoIconClick && onInfoIconClick({ isOpen: true, controlId })
        }
      />
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
      <Text
        className="formgroup--error"
        size="small"
        color="danger"
        dataUiTestId={dataUiTestId}
      >
        {error}
      </Text>
    )}
    <div className="formgroup--content">{children}</div>
  </div>
);

export default React.memo(Formgroup);
