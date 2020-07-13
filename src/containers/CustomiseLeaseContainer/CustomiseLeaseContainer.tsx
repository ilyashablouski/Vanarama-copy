/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useQuoteData } from './gql';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { IProps } from './interfaces';
import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';
import GoldrushFormContainer from '../GoldrushFormContainer';
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../../generated/GetVehicleDetails';

// eslint-disable-next-line no-empty-pattern
const CustomiseLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
  derivativeInfo,
  leaseAdjustParams,
  leaseType,
  setLeaseType,
  setLeadTime,
  onCompleted,
}) => {
  const isInitialMount = useRef(true);

  const [quoteData, setQuoteData] = useState<
    GetQuoteDetails_quoteByCapId | null | undefined
  >(null);
  const [mileage, setMileage] = useState<null | number>(null);
  const [upfront, setUpfront] = useState<number | null>(null);
  const [colour, setColour] = useState<null | number>(null);
  const [term, setTerm] = useState<number | null>(null);
  const [trim, setTrim] = useState<number | null>(null);
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [showCallBackForm, setShowCallBackForm] = useState<boolean>(false);
  const { data, error, loading, refetch } = useQuoteData({
    capId: `${capId}`,
    vehicleType,
    mileage: mileage || quoteData?.mileage || null,
    term: term || quoteData?.term || null,
    upfront: upfront || quoteData?.upfront || null,
    leaseType:
      leaseType === 'Personal'
        ? LeaseTypeEnum.PERSONAL
        : LeaseTypeEnum.BUSINESS,
    trim: trim ? +(trim || 0) || null : +(quoteData?.trim || 0) || null,
    colour: colour || +(quoteData?.colour || 0) || null,
  });

  useEffect(() => {
    setLeadTime(data?.quoteByCapId?.leadTime || '');
    setTrim(trim || +(data?.quoteByCapId?.trim || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isInitialLoading) {
      if (isDisabled && !loading) {
        setTimeout(() => setIsDisabled(false), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, loading]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!quoteData) {
      setQuoteData(data?.quoteByCapId);
    } else {
      setIsDisabled(true);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaseType, upfront, mileage, colour, term, trim, refetch]);

  if (error) {
    return (
      <div
        className="pdp--sidebar"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="pdp--sidebar"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  const terms = leaseAdjustParams?.terms.map((currentTerm: number) => ({
    label: `${currentTerm}`,
    active: data.quoteByCapId?.term === currentTerm,
  }));

  const upfronts = leaseAdjustParams?.upfronts.map(
    (currentUpfront: number) => ({
      label: `${currentUpfront}`,
      active: data.quoteByCapId?.upfront === currentUpfront,
    }),
  );

  const leaseTypes = [
    { label: 'Personal', active: leaseType === 'Personal' },
    { label: 'Business', active: leaseType === 'Business' },
  ];

  const lineItem = () => {
    const colourDescription = derivativeInfo?.colours?.find(
      (item: GetVehicleDetails_derivativeInfo_colours | null) =>
        item?.id === data?.quoteByCapId?.colour,
    )?.optionDescription;
    const trimDescription = derivativeInfo?.trims?.find(
      (item: GetVehicleDetails_derivativeInfo_trims | null) =>
        item?.id === data?.quoteByCapId?.trim || item?.id === `${trim}`,
    )?.optionDescription;

    return {
      vehicleProduct: {
        vehicleType,
        derivativeCapId: capId.toString(),
        colour: colourDescription,
        trim: trimDescription,
        term: data?.quoteByCapId?.term || term || null,
        annualMileage: data?.quoteByCapId?.mileage || mileage,
        depositMonths: data?.quoteByCapId?.upfront || upfront || null,
        depositPayment: data?.quoteByCapId?.leaseCost?.initialRental || null,
        monthlyPayment: data?.quoteByCapId?.leaseCost?.monthlyRental || null,
        maintenance,
      },
      quantity: 1,
    };
  };

  if (!data.quoteByCapId?.leaseCost?.monthlyRental) {
    return (
      <GoldrushFormContainer
        termsAndConditions
        isPostcodeVisible={vehicleType !== VehicleTypeEnum.CAR}
        capId={capId}
        kind="quote"
        vehicleType={vehicleType}
      />
    );
  }

  return (
    <>
      <CustomiseLease
        terms={terms || [{ label: '', active: false }]}
        upfronts={upfronts || [{ label: '', active: false }]}
        leaseType={leaseType}
        leaseTypes={leaseTypes}
        mileages={leaseAdjustParams?.mileages || []}
        setLeaseType={setLeaseType}
        setMileage={setMileage}
        setUpfront={setUpfront}
        setColour={setColour}
        setTerm={setTerm}
        setTrim={setTrim}
        data={data}
        mileage={mileage || data.quoteByCapId?.mileage}
        trim={trim}
        derivativeInfo={derivativeInfo}
        colour={colour}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        leaseAdjustParams={leaseAdjustParams}
        maintenance={maintenance}
        setMaintenance={setMaintenance}
        isModalShowing={isModalShowing}
        setIsModalShowing={setIsModalShowing}
        setIsInitialLoading={setIsInitialLoading}
        lineItem={lineItem()}
        onSubmit={values => onCompleted(values)}
        showCallBackForm={() => setShowCallBackForm(true)}
      />
      {showCallBackForm && (
        <Modal show onRequestClose={() => setShowCallBackForm(false)}>
          <GoldrushFormContainer
            isPostcodeVisible={vehicleType !== VehicleTypeEnum.CAR}
            capId={capId}
            callBack
            kind="quote"
            vehicleType={vehicleType}
            onCompleted={() => setShowCallBackForm(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CustomiseLeaseContainer;
