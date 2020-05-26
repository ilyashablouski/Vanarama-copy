import { FC } from 'react';
import { useRouter } from 'next/router';
import Button from '@vanarama/uibook/lib/components/atoms/button';

const EligibilityCheckerButton: FC<{}> = () => {
  const router = useRouter();

  const goToPage = () => {
    router.push('/eligibility-checker-details');
  };

  return (
    <Button
      label="Check Your Eligibility"
      onClick={goToPage}
      color="teal"
      dataTestId="eligibility-Checker-btn"
    />
  );
};

export default EligibilityCheckerButton;
