import React, { useMemo, useState } from 'react';

import { Controller } from 'react-hook-form';
import Form from 'core/organisms/form';
import Modal from 'core/molecules/modal';
import Heading from 'core/atoms/heading';
import Text from 'core/atoms/text';
import AdditionalOption from './AdditionalOption';

import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { IAdditionalOptionsFormProps } from './interfaces';

enum ModalTypeEnum {
  REDUNDANCY,
  FREE_INSURANCE,
  LOSS_OF_EARNINGS,
  MONTHLY_MAINTENANCE,
  ADVANCED_BREAKDOWN_COVER,
  NONE,
}

const AdditionalOptionsForm: React.FC<IAdditionalOptionsFormProps> = ({
  methods,
  quote,
  derivative,
  vehicleConfiguration,
}) => {
  const [activeModalType, setActiveModalType] = useState<ModalTypeEnum>(
    ModalTypeEnum.NONE,
  );
  const isCar = derivative?.vehicleType === VehicleTypeEnum.CAR;
  const isVan =
    derivative?.vehicleType === VehicleTypeEnum.LCV &&
    !derivative?.bodyType?.name?.toLowerCase().includes('pick-up');
  const isPersonalPrice = quote?.leaseType === LeaseTypeEnum.PERSONAL;
  const maintenancePriceLabel = useMemo(
    () =>
      `£${quote?.maintenanceCost?.monthlyRental} ${
        isPersonalPrice ? 'inc.' : 'exc.'
      } VAT`,
    [isPersonalPrice],
  );

  return (
    <>
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
            onTooltipClick={() => setActiveModalType(ModalTypeEnum.REDUNDANCY)}
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
            onTooltipClick={() =>
              setActiveModalType(ModalTypeEnum.FREE_INSURANCE)
            }
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
            onTooltipClick={() =>
              setActiveModalType(ModalTypeEnum.LOSS_OF_EARNINGS)
            }
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
          onTooltipClick={() =>
            setActiveModalType(ModalTypeEnum.MONTHLY_MAINTENANCE)
          }
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
          onTooltipClick={() =>
            setActiveModalType(ModalTypeEnum.ADVANCED_BREAKDOWN_COVER)
          }
        /> */}
      </Form>
      <Modal
        show={activeModalType !== ModalTypeEnum.NONE}
        onRequestClose={() => setActiveModalType(ModalTypeEnum.NONE)}
      >
        <div>
          <Heading
            className="title -mt-400"
            color="black"
            size="large"
            tag="span"
          >
            1 Year’s FREE Insurance When You Lease A Car Online*
          </Heading>
          <Text size="regular" color="darker" className="copy -mt-500">
            At Vanarama we’re helping our customers find a New Lease Of Life and
            now, when you lease a brand-new car, you’ll get 12 month’s FREE
            insurance* cover worth £538 too! As an insurance broker, Vanarama
            Insurance Services has designed a comprehensive policy specifically
            for leasing and you’re covered free of charge for a whole year! The
            cost of insurance can be one of the biggest outgoings and we wanted
            to help with that. Our car insurance covers you and 1 named driver
            against the cost of accidents and damage. The cover is comprehensive
            and FREE for 12 months.
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default AdditionalOptionsForm;
