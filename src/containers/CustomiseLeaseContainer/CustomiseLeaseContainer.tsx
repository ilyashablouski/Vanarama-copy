/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useQuoteData } from './gql';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { IProps } from './interfaces';
import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';

// eslint-disable-next-line no-empty-pattern
const CustomiseLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
  derivativeInfo,
  leaseAdjustParams,
  leaseType,
  setLeaseType,
  setLeadTime,
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
      setIsDisabled(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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

  return (
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
      loading={loading}
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
    />
  );
};

export default CustomiseLeaseContainer;
