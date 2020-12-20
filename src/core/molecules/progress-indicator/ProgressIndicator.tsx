import cx from 'classnames';
import React, { HTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { ProgressProvider } from './context';
import Step from './Step';
import StepLink from './StepLink';

interface IProps extends IBaseProps, HTMLAttributes<HTMLUListElement> {
  /**
   * The number of the current active step
   */
  activeStep: number;
}

type TComponent = React.FC<IProps> & {
  Step: typeof Step;
  StepLink: typeof StepLink;
};

const ProgressIndicator: TComponent = ({
  activeStep,
  children,
  className,
  dataTestId,
  ...rest
}) => (
  <ProgressProvider value={{ activeStep }}>
    <ul
      {...rest}
      className={cx('progress-indicator', className)}
      data-testid={dataTestId}
      role="navigation"
    >
      {children}
    </ul>
  </ProgressProvider>
);

ProgressIndicator.Step = Step;
ProgressIndicator.StepLink = StepLink;

export default ProgressIndicator;
