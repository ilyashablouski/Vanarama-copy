import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import {
  GetQuoteDetails,
  GetQuoteDetailsVariables,
} from '../../../generated/GetQuoteDetails';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useDetailsData, GET_QUOTE_DATA } from './gql';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { IProps } from './interfaces';

// eslint-disable-next-line no-empty-pattern
const CustomiseLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
  derivativeInfo,
  leaseAdjustParams,
}) => {
  const [leaseType, setLeaseType] = useState<string>('Personal');
  const [mileage, setMileage] = useState<null | number>(null);
  const [upfront, setUpfront] = useState<number>(
    leaseAdjustParams?.upfronts[0],
  );
  const [colour, setColour] = useState<null | number>(null);
  const [term, setTerm] = useState<null | number>(null);
  const [trim, setTrim] = useState<null | number>(null);

  const trims = derivativeInfo?.trims || [];
  const defaultTrim = trims[0] || undefined;
  const defaultTrimId = defaultTrim?.id;

  const colours = derivativeInfo?.colours || [];
  const defaultColour = colours[0] || undefined;
  const defaultColourId = defaultColour?.id;
  const defaultMillageNumber = Math.floor(
    (leaseAdjustParams?.mileages?.length || 0) / 2,
  );
  const defaultMillage = leaseAdjustParams?.mileages[defaultMillageNumber - 1];

  const { data, error } = useQuery<GetQuoteDetails, GetQuoteDetailsVariables>(
    GET_QUOTE_DATA,
    {
      variables: {
        capId: `${capId}`,
        vehicleType,
        mileage: mileage || defaultMillage,
        term: term || leaseAdjustParams?.terms[0],
        upfront: upfront || leaseAdjustParams?.upfronts[0],
        leaseType:
          leaseType === 'Personal'
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
        trim: trim || +(defaultTrimId || 0),
        colour: colour || +(defaultColourId || 0),
      },
    },
  );

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
      mileages={mileages}
      setLeaseType={setLeaseType}
      setMileage={setMileage}
      setUpfront={setUpfront}
      setColour={setColour}
      setTerm={setTerm}
      setTrim={setTrim}
      quoteData={quoteData}
      data={data}
      derivativeInfo={derivativeInfo}
    />
  );
};

export default CustomiseLeaseContainer;
