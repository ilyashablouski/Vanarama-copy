import React from 'react';
import Form from 'core/organisms/form';
import { Controller } from 'react-hook-form';
import { IAdditionalOptionsFormProps } from './interfaces';
import AdditionalOption from './AdditionalOption';

const AdditionalOptionsForm: React.FC<IAdditionalOptionsFormProps> = ({
  methods,
}) => {
  return (
    <Form style={{ maxWidth: 'none' }}>
      <Controller
        as={AdditionalOption}
        control={methods.control}
        id="redundancy"
        name="redundancy"
        title="Free Redundancy & Life Event Cover"
        includedText="Included FREE"
        promotionText="FREE With Every Lease"
        tooltipText="Hello. This is a pop-up which allows for of content."
      />
      <Controller
        as={AdditionalOption}
        control={methods.control}
        id="insurance"
        name="insurance"
        title="1 Year's Free Insurance"
        includedText="Included FREE"
        promotionText="FREE With Every Lease"
        tooltipText="Hello. This is a pop-up which allows for of content."
      />
      <Controller
        as={AdditionalOption}
        control={methods.control}
        id="monthlyMaintenance"
        name="monthlyMaintenance"
        title="Monthly Maintenance"
        includedText="Included For £32.12 Ex VAT PM"
        promotionText="Only £32.12 Ex VAT Per Month"
        tooltipText="Hello. This is a pop-up which allows for of content."
      />
      <Controller
        as={AdditionalOption}
        control={methods.control}
        id="advancedBreakdownCover"
        name="advancedBreakdownCover"
        title="Advanced Breakdown Cover"
        includedText="Included For £7.49 Ex VAT PM"
        promotionText="Only £7.49 Ex VAT Per Month"
        tooltipText="Hello. This is a pop-up which allows for of content."
      />
    </Form>
  );
};

export default AdditionalOptionsForm;
