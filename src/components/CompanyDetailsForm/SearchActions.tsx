import Button from '@vanarama/uibook/lib/components/atoms/button';
import React from 'react';

interface IProps {
  hasConfirmedCompany: boolean;
  onProceed: () => void;
  onSearchAgain: () => void;
}

export default function SearchActions({
  hasConfirmedCompany,
  onProceed,
  onSearchAgain,
}: IProps) {
  return (
    <div className="button-group">
      <Button
        color="primary"
        dataTestId="company-details_proceed"
        disabled={hasConfirmedCompany}
        label="Save And Proceed"
        onClick={onProceed}
        size="small"
        type="button"
      />
      <Button
        color="primary"
        dataTestId="company-details_search-again"
        fill="outline"
        label="Search Again"
        onClick={onSearchAgain}
        size="small"
        type="button"
      />
    </div>
  );
}
