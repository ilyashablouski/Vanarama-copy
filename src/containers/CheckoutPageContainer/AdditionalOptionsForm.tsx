import React, { useMemo, useState } from 'react';

import { Controller } from 'react-hook-form';
import Form from 'core/organisms/form';
import Modal from 'core/molecules/modal';
import AdditionalOption from './AdditionalOption';

import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { IAdditionalOptionsFormProps } from './interfaces';

import Redundancy from './Modals/Redundancy';
import FreeInsurance from './Modals/FreeInsurance';
import LossOfEarnings from './Modals/LossOfEarnings';
import MonthlyMaintenance from './Modals/MonthlyMaintenance';

enum ModalTypeEnum {
  REDUNDANCY,
  FREE_INSURANCE,
  LOSS_OF_EARNINGS,
  MONTHLY_MAINTENANCE,
  ADVANCED_BREAKDOWN_COVER,
  NONE,
}

const mapModalTypeToModalContent = (type: ModalTypeEnum) => {
  switch (type) {
    case ModalTypeEnum.REDUNDANCY:
      return <Redundancy />;
    case ModalTypeEnum.FREE_INSURANCE:
      return <FreeInsurance />;
    case ModalTypeEnum.LOSS_OF_EARNINGS:
      return <LossOfEarnings />;
    case ModalTypeEnum.MONTHLY_MAINTENANCE:
      return <MonthlyMaintenance />;
    case ModalTypeEnum.NONE:
    default:
      return null;
  }
};

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

  const activeModalContainerClassName = useMemo(
    () =>
      activeModalType === ModalTypeEnum.MONTHLY_MAINTENANCE
        ? 'modal-container-large'
        : 'modal-container-custom',
    [activeModalType],
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
        containerClassName={activeModalContainerClassName}
        show={activeModalType !== ModalTypeEnum.NONE}
        onRequestClose={() => setActiveModalType(ModalTypeEnum.NONE)}
      >
        {mapModalTypeToModalContent(activeModalType)}
      </Modal>
    </>
  );
};

export default AdditionalOptionsForm;
