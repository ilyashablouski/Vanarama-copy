/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useQuoteDataLazyQuery } from './gql';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
  OpportunityTypeEnum,
} from '../../../generated/globalTypes';
import { IProps } from './interfaces';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import GoldrushFormContainer from '../GoldrushFormContainer';
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../../generated/GetVehicleDetails';

const parseQuoteParams = (param?: string | null) =>
  parseInt(param || '', 10) || null;

// eslint-disable-next-line no-empty-pattern
const CustomiseLeaseContainer: React.FC<IProps> = ({
  quote,
  capId,
  vehicleType,
  derivativeInfo,
  leaseAdjustParams,
  leaseType,
  setLeaseType,
  setLeadTime,
  onCompleted,
  onCompletedCallBack,
  setLeaseScannerData,
  isDisabled,
  setIsDisabled,
}) => {
  const isInitialMount = useRef(true);

  const [quoteData, setQuoteData] = useState<
    GetQuoteDetails | null | undefined
  >(quote || null);
  const [mileage, setMileage] = useState<number | null>(
    quote.quoteByCapId?.mileage || null,
  );
  const [upfront, setUpfront] = useState<number | null>(
    quote.quoteByCapId?.upfront || null,
  );
  const [colour, setColour] = useState<number | null>(
    parseQuoteParams(quote.quoteByCapId?.colour),
  );
  const [term, setTerm] = useState<number | null>(
    quote.quoteByCapId?.term || null,
  );
  const [trim, setTrim] = useState<number | null>(
    parseQuoteParams(quote.quoteByCapId?.trim),
  );
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [showCallBackForm, setShowCallBackForm] = useState<boolean>(false);
  const [screenY, setScreenY] = useState<number | null>(null);
  const [
    getQuoteData,
    { error, loading },
  ] = useQuoteDataLazyQuery(updatedQuote => setQuoteData(updatedQuote));

  useEffect(() => {
    if (isInitialLoading) {
      if (isDisabled && !loading) {
        setTimeout(() => setIsDisabled(false), 1000);
      }
    }
  });

  useEffect(() => {
    setLeadTime(quoteData?.quoteByCapId?.leadTime || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteData]);

  const scrollChange = () => {
    setScreenY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollChange);
    return () => window.removeEventListener('scroll', scrollChange);
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      getQuoteData({
        variables: {
          capId: `${capId}`,
          vehicleType,
          mileage,
          term,
          upfront,
          leaseType:
            leaseType === 'Personal'
              ? LeaseTypeEnum.PERSONAL
              : LeaseTypeEnum.BUSINESS,
          trim: trim
            ? +(trim || 0) || null
            : parseQuoteParams(quoteData?.quoteByCapId?.trim),
          colour: colour || parseQuoteParams(quoteData?.quoteByCapId?.colour),
        },
      });
      setIsDisabled(true);
    }
    isInitialMount.current = false;
  }, [
    setIsDisabled,
    isInitialMount,
    leaseType,
    upfront,
    mileage,
    colour,
    term,
    trim,
    getQuoteData,
    quoteData,
    vehicleType,
    capId,
  ]);

  const lineItem = () => {
    const colourDescription = derivativeInfo?.colours?.find(
      (item: GetVehicleDetails_derivativeInfo_colours | null) =>
        item?.id === quoteData?.quoteByCapId?.colour,
    )?.optionDescription;
    const trimDescription = derivativeInfo?.trims?.find(
      (item: GetVehicleDetails_derivativeInfo_trims | null) =>
        item?.id === quoteData?.quoteByCapId?.trim || item?.id === `${trim}`,
    )?.optionDescription;

    return {
      vehicleProduct: {
        vehicleType,
        derivativeCapId: capId.toString(),
        colour: colourDescription,
        trim: trimDescription,
        term: quoteData?.quoteByCapId?.term || term || null,
        funderId: quoteData?.quoteByCapId?.funderId?.toString() || null,
        annualMileage: quoteData?.quoteByCapId?.mileage || mileage,
        depositMonths: quoteData?.quoteByCapId?.upfront || upfront || null,
        depositPayment:
          quoteData?.quoteByCapId?.leaseCost?.initialRental || null,
        monthlyPayment:
          quoteData?.quoteByCapId?.leaseCost?.monthlyRental || null,
        maintenance,
        maintenancePrice: maintenance
          ? quoteData?.quoteByCapId?.maintenanceCost?.monthlyRental
          : undefined,
      },
      quantity: 1,
    };
  };

  useEffect(() => {
    if (setLeaseScannerData) {
      setLeaseScannerData({
        maintenance,
        quoteByCapId: quoteData?.quoteByCapId,
        isDisabled,
        stateVAT: leaseType === 'Personal' ? 'inc' : 'exc',
        endAnimation: () => {
          setIsInitialLoading(true);
        },
        requestCallBack: () => {
          setShowCallBackForm(true);
        },
        onSubmit: () => {
          onCompleted({
            leaseType: leaseType.toUpperCase() as LeaseTypeEnum,
            lineItems: [lineItem()],
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteData, leaseType, getQuoteData, isDisabled, maintenance]);

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

  if (!quoteData) {
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
    active: quoteData?.quoteByCapId?.term === currentTerm,
  }));

  const upfronts = leaseAdjustParams?.upfronts.map(
    (currentUpfront: number) => ({
      label: `${currentUpfront}`,
      active: quoteData?.quoteByCapId?.upfront === currentUpfront,
    }),
  );

  const leaseTypes = [
    { label: 'Personal', active: leaseType === 'Personal' },
    { label: 'Business', active: leaseType === 'Business' },
  ];

  if (!quoteData?.quoteByCapId?.leaseCost?.monthlyRental) {
    return (
      <GoldrushFormContainer
        termsAndConditions
        isPostcodeVisible={vehicleType !== VehicleTypeEnum.CAR}
        capId={capId}
        opportunityType={OpportunityTypeEnum.QUOTE}
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
        data={quoteData}
        mileage={mileage || quoteData?.quoteByCapId?.mileage}
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
        screenY={screenY}
        onSubmit={values => onCompleted(values)}
        showCallBackForm={() => setShowCallBackForm(true)}
      />
      {showCallBackForm && (
        <Modal
          className="-mt-000 callBack"
          show
          onRequestClose={() => setShowCallBackForm(false)}
        >
          <GoldrushFormContainer
            isPostcodeVisible={vehicleType !== VehicleTypeEnum.CAR}
            capId={capId}
            callBack
            opportunityType={OpportunityTypeEnum.QUOTE}
            vehicleType={vehicleType}
            onCompleted={() => {
              onCompletedCallBack();
              setShowCallBackForm(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CustomiseLeaseContainer;
