import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'core/molecules/modal';
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
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { useTrimAndColour } from '../../gql/carpage';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const parseQuoteParams = (param?: string | null) =>
  parseInt(param || '', 10) || null;

const createEmptyQuoteData = (
  term: number | null,
  mileage: number | null,
  upfront: number | null,
  vehicleType: string | null,
  trim: number | null,
  colour: number | null,
  leaseType: string | null,
) => ({
  quoteByCapId: {
    term,
    mileage,
    upfront,
    vehicleType:
      vehicleType === 'CAR' ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    trim: trim?.toString() || null,
    colour: colour?.toString() || null,
    leaseType:
      leaseType === 'PERSONAL'
        ? LeaseTypeEnum.PERSONAL
        : LeaseTypeEnum.BUSINESS,
    funderId: null,
    leadTime: null,
    stock: null,
    processingFee: null,
    nextBestPrice: null,
    maintenanceCost: null,
    leaseCost: {
      monthlyRental: null,
      initialRental: null,
      excessMileage: null,
    },
  },
});

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
  trimData,
  colourData,
  mileage,
  setMileage,
}) => {
  const isInitialMount = useRef(true);

  const [quoteData, setQuoteData] = useState<
    GetQuoteDetails | null | undefined
  >(quote || null);
  const [upfront, setUpfront] = useState<number | null>(
    quote?.quoteByCapId?.upfront || null,
  );
  const [colour, setColour] = useState<number | null>(
    parseQuoteParams(quote?.quoteByCapId?.colour),
  );
  const [term, setTerm] = useState<number | null>(
    quote?.quoteByCapId?.term || null,
  );
  const [trim, setTrim] = useState<number | null>(
    parseQuoteParams(quote?.quoteByCapId?.trim),
  );
  const [trimList, setTrimList] = useState<(ITrimList | null)[] | null>(
    trimData,
  );
  const [colourList, setColourList] = useState<(IColourList | null)[] | null>(
    colourData,
  );
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [showCallBackForm, setShowCallBackForm] = useState<boolean>(false);
  const [screenY, setScreenY] = useState<number | null>(null);
  const [getQuoteData, { loading }] = useQuoteDataLazyQuery(
    updatedQuote => setQuoteData(updatedQuote),
    () =>
      setQuoteData(
        createEmptyQuoteData(
          term,
          mileage,
          upfront,
          vehicleType,
          trim,
          colour,
          leaseType,
        ),
      ),
  );

  const [getTrimAndColour] = useTrimAndColour(
    `${capId}`,
    vehicleType,
    colour || undefined,
    trim || undefined,
    result => {
      setTrimList(result?.trimList);
      setColourList(result.colourList || []);
    },
  );

  useEffect(() => {
    if (isInitialLoading && isDisabled && !loading) {
      setTimeout(() => setIsDisabled(false), 1000);
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

  useFirstRenderEffect(() => {
    getTrimAndColour();
  }, [trim, colour]);

  const currentQuoteTrim = quoteData?.quoteByCapId?.trim;
  const currentQuoteColour = quoteData?.quoteByCapId?.colour;

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
          trim: trim ? +trim || null : parseQuoteParams(currentQuoteTrim),
          colour: colour || parseQuoteParams(currentQuoteColour),
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
    currentQuoteTrim,
    currentQuoteColour,
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
        leadTime: quoteData?.quoteByCapId?.leadTime,
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
    value: `${currentTerm}`,
    active: quoteData?.quoteByCapId?.term === currentTerm,
  }));

  const upfronts = leaseAdjustParams?.upfronts.map(
    (currentUpfront: number) => ({
      label: `${currentUpfront}`,
      value: `${currentUpfront}`,
      active: quoteData?.quoteByCapId?.upfront === currentUpfront,
    }),
  );

  const leaseTypes = [
    { label: 'Personal', value: 'Personal', active: leaseType === 'Personal' },
    { label: 'Business', value: 'Business', active: leaseType === 'Business' },
  ];

  // - show POA form in case if during first render (SSR) monthlyRental is not returned
  // - show POA form in case if monthlyRental returned but colors or trim lists are empty
  // - all other cases of errors from server will be handled in LeaseScanner
  if (
    !quote?.quoteByCapId?.leaseCost?.monthlyRental ||
    colourList?.length === 0 ||
    trimList?.length === 0
  ) {
    console.error({
      colourList,
      trimList,
      monthlyRental: quoteData?.quoteByCapId?.leaseCost?.monthlyRental,
    });

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
        terms={terms || [{ label: '', value: '', active: false }]}
        upfronts={upfronts || [{ label: '', value: '', active: false }]}
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
        trimList={trimList}
        colourList={colourList}
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
      <Modal
        className="-mt-000 callBack"
        show={showCallBackForm}
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
    </>
  );
};

export default CustomiseLeaseContainer;
