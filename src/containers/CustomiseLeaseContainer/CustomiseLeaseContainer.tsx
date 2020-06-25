import React, { useState, useEffect, useRef } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useQuoteData } from './gql';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { IProps } from './interfaces';

// eslint-disable-next-line no-empty-pattern
const CustomiseLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
  derivativeInfo,
  leaseAdjustParams,
}) => {
  const isInitialMount = useRef(true);

  const [leaseType, setLeaseType] = useState<string | null>('Personal');
  const [mileage, setMileage] = useState<null | number>(null);
  const [upfront, setUpfront] = useState<number | null>(
    leaseAdjustParams?.upfronts[0] || null,
  );
  const [colour, setColour] = useState<null | number>(null);
  const [term, setTerm] = useState<number | null>(
    leaseAdjustParams?.terms[0] || null,
  );
  const [trim, setTrim] = useState<number | null>(null);

  // set avarage step
  const defaultMillageNumber = Math.floor(
    (leaseAdjustParams?.mileages?.length || 0) / 2,
  );
  const defaultMillage = leaseAdjustParams?.mileages[defaultMillageNumber - 1];

  const { data, error, refetch } = useQuoteData({
    capId: `${capId}`,
    vehicleType,
    mileage: mileage || defaultMillage || null,
    term,
    upfront,
    leaseType:
      leaseType === 'Personal'
        ? LeaseTypeEnum.PERSONAL
        : LeaseTypeEnum.BUSINESS,
    trim: +(trim || 0),
    colour,
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refetch();
    }
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

  const terms = leaseAdjustParams?.terms.map(
    (currentTerm: number, index: number) => ({
      label: `${currentTerm}`,
      active: index === 0,
    }),
  );

  const upfronts = leaseAdjustParams?.upfronts.map(
    (currentUpfront: number, index: number) => ({
      label: `${currentUpfront}`,
      active: index === 0,
    }),
  );

  const leaseTypes = [
    { label: 'Personal', active: true },
    { label: 'Business', active: false },
  ];

  const mileages = leaseAdjustParams?.mileages.map((currMileage: number) => {
    return `${currMileage / 1000}K`;
  });

  return (
    <CustomiseLease
      terms={terms || [{ label: '', active: false }]}
      upfronts={upfronts || [{ label: '', active: false }]}
      leaseType={leaseType}
      leaseTypes={leaseTypes}
      mileages={mileages || undefined}
      setLeaseType={setLeaseType}
      setMileage={setMileage}
      setUpfront={setUpfront}
      setColour={setColour}
      setTerm={setTerm}
      setTrim={setTrim}
      data={data}
      trim={trim}
      derivativeInfo={derivativeInfo}
      colour={colour}
      leaseAdjustParams={leaseAdjustParams}
    />
  );
};

export default CustomiseLeaseContainer;
