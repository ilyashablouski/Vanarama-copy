import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import {
  GetQuoteDetails,
  GetQuoteDetailsVariables,
} from '../../../generated/GetQuoteDetails';
import CustomiseYouLease from '../../components/CustomiseYouLease/CustomiseYouLease';
import { useDetailsData, GET_QUOTE_DATA } from './gql';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { IProps } from './interfaces';

// eslint-disable-next-line no-empty-pattern
const CustomiseYourLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
}) => {
  const { data, loading, error } = useDetailsData(capId, vehicleType);

  const [leaseType, setLeaseType] = useState<LeaseTypeEnum>(
    LeaseTypeEnum.PERSONAL,
  );
  const [mileage, setMileage] = useState<null | number>(null);
  const [upfront, setUpfront] = useState<null | number>(null);
  const [colour, setColour] = useState<null | number>(null);
  const [term, setTerm] = useState<null | number>(null);
  const [trim, setTrim] = useState<null | number>(null);

  const leaseAdjustParams = data?.leaseAdjustParams;
  const derivativeInfo = data?.derivativeInfo;

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

  const { data: quoteData, error: quoteError } = useQuery<
    GetQuoteDetails,
    GetQuoteDetailsVariables
  >(GET_QUOTE_DATA, {
    skip: !data,
    variables: {
      capId: `${capId}`,
      vehicleType,
      mileage: mileage || defaultMillage,
      term: term || leaseAdjustParams?.terms[0],
      upfront: upfront || leaseAdjustParams?.upfronts[0],
      leaseType,
      trim: trim || +(defaultTrimId || 0),
      colour: colour || +(defaultColourId || 0),
    },
  });

  if (error || quoteError) {
    return (
      <div
        className="pdp--sidebar"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message || quoteError?.message}
      </div>
    );
  }

  if (loading || !quoteData) {
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
    <CustomiseYouLease
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
    />
  );
};

export default CustomiseYourLeaseContainer;
