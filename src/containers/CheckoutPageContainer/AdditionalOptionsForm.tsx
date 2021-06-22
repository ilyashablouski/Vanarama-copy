import React, { useMemo } from 'react';
import Form from 'core/organisms/form';
import { Controller } from 'react-hook-form';
import { IAdditionalOptionsFormProps } from './interfaces';
import AdditionalOption from './AdditionalOption';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';

const AdditionalOptionsForm: React.FC<IAdditionalOptionsFormProps> = ({
  methods,
  quote,
  derivative,
  vehicleConfiguration,
}) => {
  const isCar = derivative?.vehicleType === VehicleTypeEnum.CAR;
  const isVan =
    derivative?.vehicleType === VehicleTypeEnum.LCV &&
    !derivative?.bodyType?.name?.toLowerCase().includes('pick-up');
  const isPersonalPrice = quote?.leaseType === LeaseTypeEnum.PERSONAL;
  const maintenancePriceLabel = useMemo(
    () =>
      `£${quote?.maintenanceCost?.monthlyRental} ${
        isPersonalPrice ? 'Inc' : 'Exc'
      } VAT`,
    [isPersonalPrice],
  );

  return (
    <Form style={{ maxWidth: 'none', gap: 0 }}>
      {isCar && (
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
      )}
      {isCar && vehicleConfiguration?.onOffer && (
        <Controller
          as={AdditionalOption}
          control={methods.control}
          id="freeInsurance"
          name="freeInsurance"
          title="1 Year's Free Insurance"
          includedText="Included FREE"
          promotionText="FREE With Every Lease"
          tooltipText="Hello. This is a pop-up which allows for of content."
        />
      )}
      {isVan && (
        <Controller
          as={AdditionalOption}
          control={methods.control}
          id="lossOfEarnings"
          name="lossOfEarnings"
          title="FREE Loss Of Earnings & Life Event Cover"
          includedText="Included FREE"
          promotionText="FREE With Every Lease"
          tooltipText="Hello. This is a pop-up which allows for of content."
        />
      )}
      <Controller
        as={AdditionalOption}
        control={methods.control}
        id="monthlyMaintenance"
        name="monthlyMaintenance"
        title="Monthly Maintenance"
        includedText={`Included For ${maintenancePriceLabel} Per Month`}
        promotionText={`Only ${maintenancePriceLabel} Per Month`}
        tooltipText="Hello. This is a pop-up which allows for of content."
      />
      {/* OUT OF SCOPE */}
      {/* <Controller
        as={AdditionalOption}
        control={methods.control}
        id="advancedBreakdownCover"
        name="advancedBreakdownCover"
        title="Advanced Breakdown Cover"
        includedText="Included For £7.49 Ex VAT PM"
        promotionText="Only £7.49 Ex VAT Per Month"
        tooltipText="Hello. This is a pop-up which allows for of content."
      /> */}
    </Form>
  );
};

export default AdditionalOptionsForm;
