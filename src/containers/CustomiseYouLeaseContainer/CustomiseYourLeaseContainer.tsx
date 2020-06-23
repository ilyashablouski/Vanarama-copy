import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import CustomiseYouLease from '../../components/CustomiseYouLease/CustomiseYouLease';
import { useDetailsData, GET_QUOTE_DATA } from './gql';
import { IProps } from './interfaces';

// eslint-disable-next-line no-empty-pattern
const CustomiseYourLeaseContainer: React.FC<IProps> = ({
  capId,
  vehicleType,
}) => {
  const { data, loading, error } = useDetailsData(capId, vehicleType);

  const [leaseType, setLeaseType] = useState('PERSONAL');
  const [mileage, setMileage] = useState<null | number>(null);
  const [upfront, setUpfront] = useState<null | number>(null);
  const [colour, setColour] = useState<null | number>(null);
  const [term, setTerm] = useState<null | number>(null);
  const [trim, setTrim] = useState<null | number>(null);

  const leaseAdjustParams = data?.leaseAdjustParams;
  const derivativeInfo = data?.derivativeInfo;
  const derivativeInfoTrim = derivativeInfo?.trims || [];
  const trimId = derivativeInfoTrim[0] || 0;
  const derivativeInfoColour = derivativeInfo?.colours || [];
  const colourId = derivativeInfoColour[0] || 0;

  const {
    data: quoteData,
    error: quoteError,
    refetch: quoteRefetch,
  } = useQuery(GET_QUOTE_DATA, {
    skip: !data,
    variables: {
      capId,
      vehicleType,
      mileage: mileage || 12000,
      term: term || leaseAdjustParams?.terms[0],
      upfront: upfront || leaseAdjustParams?.upfronts[0],
      leaseType,
      trim: trim || +trimId,
      colour: colour || +colourId,
    },
  });

  useEffect(() => {
    if (quoteData && data && quoteRefetch) {
      quoteRefetch();
    }
  }, [mileage, term, upfront, leaseType, trim, colour]);

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
