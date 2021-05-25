import cx from 'classnames';
import React, { HTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { StepProvider, useProgressContext, StepStatus } from './context';

interface IProps extends IBaseProps, HTMLAttributes<HTMLLIElement> {
  /**
   * Whether this step is current being edited
   */
  editing?: boolean;
  /**
   * A number representing the order of this step
   */
  step: number;
  hidden?: boolean;
}

const Step: React.FC<IProps> = ({
  children,
  className,
  dataTestId,
  editing,
  step,
  hidden,
  ...rest
}) => {
  const { activeStep } = useProgressContext();
  const status = getStatus(activeStep, step, editing);

  return (
    <li
      {...rest}
      className={cx('progress-step', className, {
        'progress-step-complete': status === 'complete',
        'progress-step-current': status === 'current' && !hidden,
        'progress-step-current--hidden': status === 'current' && hidden,
        'progress-step-editing': status === 'editing',
        'progress-step-incomplete': status === 'incomplete',
      })}
      data-testid={dataTestId}
    >
      <StepProvider value={{ status, step }}>{children}</StepProvider>
    </li>
  );
};

function getStatus(
  activeStep: number,
  currentStep: number,
  editing?: boolean,
): StepStatus {
  if (editing) {
    return 'editing';
  }

  if (currentStep < activeStep) {
    return 'complete';
  }

  return currentStep === activeStep ? 'current' : 'incomplete';
}

export default Step;
