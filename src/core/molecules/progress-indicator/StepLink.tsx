import cx from 'classnames';
import React, { HTMLAttributes } from 'react';
import CheckmarkSharpIcon from '../../assets/icons/CheckmarkSharp';
import { IBaseProps } from '../../interfaces/base';
import Icon from '../../atoms/icon';
import Text from '../../atoms/text';
import { useStepContext } from './context';

interface IProps extends IBaseProps, HTMLAttributes<HTMLAnchorElement> {
  /**
   * The URL to navigate to when this link is clicked
   */
  href?: string;
  /**
   * The label to display for this link
   */
  label: string;
}

const StepLink: React.ForwardRefRenderFunction<HTMLAnchorElement, IProps> = (
  { className, dataTestId, href, label, onClick, ...rest },
  ref,
) => {
  const { status, step } = useStepContext();
  const preventClick = status === 'incomplete';
  return (
    <a
      {...rest}
      aria-label={`${label} - ${status}`}
      className={cx('progress-step--button', className)}
      data-testid={dataTestId}
      href={preventClick ? undefined : href}
      onClick={event => {
        if (preventClick) {
          event.preventDefault();
        }

        onClick?.(event);
      }}
      ref={ref}
    >
      <Text className="-icon" color="darker" size="regular" tag="span">
        {status === 'complete' ? (
          <Icon color="white" icon={<CheckmarkSharpIcon />} size="small" />
        ) : (
          step
        )}
      </Text>
      <Text className="-label" tag="span" color="darker" size="regular">
        {label}
      </Text>
    </a>
  );
};

// This component needs `React.forwardRef` to work with `next/link`
// see https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component
export default React.forwardRef(StepLink);
