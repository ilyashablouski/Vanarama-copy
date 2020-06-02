import React from 'react';
import { IProps } from './interfaces';
import YourEligibilityChecker from '../../components/EligibilityChecker/YourEligibilityChecker';
import { useCreditChecker } from './gql';
import { formValuesToInput } from './mappers';

// eslint-disable-next-line no-empty-pattern
const EligibilityContainer: React.FC<IProps> = ({ onCompleted }) => {
  const [createCreditCheckerHandle] = useCreditChecker(onCompleted);

  return (
    // eslint-disable-next-line no-console
    <YourEligibilityChecker
      submit={values =>
        createCreditCheckerHandle({
          variables: {
            input: formValuesToInput(values),
          },
        })
      }
    />
  );
};

export default EligibilityContainer;
