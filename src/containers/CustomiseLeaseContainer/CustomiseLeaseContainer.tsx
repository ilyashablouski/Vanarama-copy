import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Modal from 'core/molecules/modal';
import CustomiseLease from '../../components/CustomiseLease/CustomiseLease';
import { useQuoteDataLazyQuery } from './gql';
import {
  LeaseTypeEnum,
  OpportunityTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { IProps } from './interfaces';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import GoldrushFormContainer from '../GoldrushFormContainer';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import Skeleton from '../../components/Skeleton';
import getLineItem from '../../utils/getLineItem';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useTrim } from '../../gql/carpage';
import { Nullable, Nullish } from '../../types/common';
import { IOptionsList } from '../../types/detailsPage';
import {
  checkIsHotOffer,
  isFactoryOrderSelect,
  isHotOfferSelect,
} from '../../utils/helpers';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const parseQuoteParams = (param?: string | null) =>
  parseInt(param || '', 10) || null;

const createEmptyQuoteData = (
  term: number | null,
  mileage: number | null,
  upfront: number | null,
  vehicleType: VehicleTypeEnum | null,
  trim: number | null,
  colour: number | null,
  leaseType: LeaseTypeEnum | null,
) => ({
  quoteByCapId: {
    term,
    mileage,
    upfront,
    vehicleType,
    trim: trim?.toString() || null,
    colour: colour?.toString() || null,
    leaseType,
    funderId: null,
    leadTime: null,
    stock: null,
    freeInsurance: null,
    stockBatchId: null,
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

const START_SCREEN_HEIGHT = 350;

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
  isPlayingLeaseAnimation,
  setIsPlayingLeaseAnimation,
  trimData,
  colourData,
  mileage,
  colour,
  setColour,
  setMileage,
  pickups,
  isShowFreeInsuranceMerch,
  isShowFreeHomeChargerMerch,
  roadsideAssistance,
  warrantyDetails,
  dataUiTestId,
  toggleColorAndTrimModalVisible,
  isColourAndTrimOverlay,
}) => {
  const [isFactoryOrder, setIsFactoryOrder] = useState<boolean | undefined>(
    isFactoryOrderSelect(colourData, `${colour}`),
  );
  const [isHotOffer, setIsHotOffer] = useState<Nullish<boolean>>(
    isHotOfferSelect(colourData, `${colour}`),
  );
  const [quoteData, setQuoteData] = useState<
    GetQuoteDetails | null | undefined
  >(quote || null);
  const [upfront, setUpfront] = useState<number | null>(
    quote?.quoteByCapId?.upfront || null,
  );
  const [term, setTerm] = useState<number | null>(
    quote?.quoteByCapId?.term || null,
  );
  const [trim, setTrim] = useState<number | null>(
    parseQuoteParams(quote?.quoteByCapId?.trim),
  );
  const [trimList, setTrimList] = useState<Nullable<IOptionsList[]>>(
    checkIsHotOffer(trimData, isHotOffer, isFactoryOrder),
  );

  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [isInitPayModalShowing, setIsInitPayModalShowing] = useState<boolean>(
    false,
  );
  const [isRestoreLeaseSettings, setIsRestoreLeaseSettings] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [showCallBackForm, setShowCallBackForm] = useState<boolean>(false);
  const [isStartScreen, setIsStartScreen] = useState<boolean>(true);
  const isMobile = useMobileViewport();
  const [getTrim] = useTrim(result => {
    setTrimList(
      checkIsHotOffer(result.trimGroupList, isHotOffer, isFactoryOrder),
    );
  });
  const [getQuoteData, { loading }] = useQuoteDataLazyQuery(
    updatedQuote => {
      setIsRestoreLeaseSettings(false);
      setQuoteData(updatedQuote);
      if (updatedQuote.quoteByCapId?.trim) {
        setTrim(Number(updatedQuote.quoteByCapId?.trim));
      }
    },
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

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isInitialLoading && isPlayingLeaseAnimation && !loading) {
      timerId = setTimeout(() => {
        setIsPlayingLeaseAnimation(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [
    isInitialLoading,
    isPlayingLeaseAnimation,
    setIsPlayingLeaseAnimation,
    loading,
  ]);

  useEffect(() => {
    setLeadTime(quoteData?.quoteByCapId?.leadTime || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteData]);

  const scrollChange = () => {
    if (isMobile) {
      setIsStartScreen(() => window.pageYOffset < START_SCREEN_HEIGHT);
    }
  };

  useEffect(() => {
    if (isMobile) {
      window?.addEventListener('scroll', scrollChange);
    }
    return () => window?.removeEventListener('scroll', scrollChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const currentQuoteTrim = quoteData?.quoteByCapId?.trim;
  const currentQuoteColour = quoteData?.quoteByCapId?.colour;

  useFirstRenderEffect(() => {
    getQuoteData({
      variables: {
        capId: `${capId}`,
        vehicleType,
        mileage,
        term,
        upfront,
        leaseType,
        trim: trim || parseQuoteParams(currentQuoteTrim),
        colour: colour || parseQuoteParams(currentQuoteColour),
      },
    });

    if (!isRestoreLeaseSettings) {
      setIsPlayingLeaseAnimation(true);
    }
  }, [
    leaseType,
    upfront,
    mileage,
    term,
    trim,
    getQuoteData,
    vehicleType,
    capId,
  ]);

  useFirstRenderEffect(() => {
    getQuoteData({
      variables: {
        capId: `${capId}`,
        vehicleType,
        mileage,
        term,
        upfront,
        leaseType,
        colour: colour || parseQuoteParams(currentQuoteColour),
      },
    });

    getTrim({
      variables: {
        capId: `${capId}`,
        vehicleType,
        colourId: colour as number,
      },
    });

    if (!isRestoreLeaseSettings) {
      setIsPlayingLeaseAnimation(true);
    }
  }, [colour]);

  const lineItemData = getLineItem({
    vehicleTypeValue: vehicleType,
    maintenanceValue: maintenance,
    mileageValue: mileage,
    upfrontValue: upfront,
    trimValue: trim,
    termValue: term,
    capId,
    quoteData,
    colourData,
    trimData: trimList,
  });

  useEffect(() => {
    if (setLeaseScannerData) {
      setLeaseScannerData({
        maintenance,
        quoteByCapId: quoteData?.quoteByCapId,
        isDisabled: isPlayingLeaseAnimation,
        stateVAT: leaseType === LeaseTypeEnum.PERSONAL ? 'inc' : 'exc',
        endAnimation: () => {
          setIsInitialLoading(true);
        },
        requestCallBack: () => {
          setShowCallBackForm(true);
        },
        onSubmit: () => {
          onCompleted({
            leaseType: leaseType.toUpperCase() as LeaseTypeEnum,
            lineItems: [lineItemData],
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    quoteData,
    leaseType,
    getQuoteData,
    isPlayingLeaseAnimation,
    maintenance,
  ]);

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

  const terms = leaseAdjustParams?.terms.map(String);
  const upfronts = leaseAdjustParams?.upfronts.map(String);
  const leaseTypes = [LeaseTypeEnum.PERSONAL, LeaseTypeEnum.BUSINESS];

  const defaultTermValue = quote?.quoteByCapId?.term ?? null;
  const defaultUpfrontValue = quote?.quoteByCapId?.upfront ?? null;
  const defaultMileageValue = quote?.quoteByCapId?.mileage ?? null;

  // - show POA form in case if during first render (SSR) monthlyRental is not returned
  // - show POA form in case if monthlyRental returned but colors or trim lists are empty
  // - all other cases of errors from server will be handled in LeaseScanner
  if (
    !quote?.quoteByCapId?.leaseCost?.monthlyRental ||
    colourData?.length === 0 ||
    trimList?.length === 0
  ) {
    // eslint-disable-next-line no-console
    console.error({
      colourData,
      trimList,
      monthlyRental: quoteData?.quoteByCapId?.leaseCost?.monthlyRental,
    });

    return (
      <GoldrushFormContainer
        dataUiTestId={`${dataUiTestId}_goldrush-form`}
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
        term={term}
        terms={terms ?? []}
        upfront={upfront}
        upfronts={upfronts ?? []}
        defaultTermValue={defaultTermValue}
        defaultUpfrontValue={defaultUpfrontValue}
        defaultMileageValue={defaultMileageValue}
        leaseType={leaseType}
        leaseTypes={leaseTypes}
        mileages={leaseAdjustParams?.mileages ?? []}
        setLeaseType={setLeaseType}
        setMileage={setMileage}
        setUpfront={setUpfront}
        setColour={setColour}
        setTerm={setTerm}
        setTrim={setTrim}
        data={quoteData}
        capId={capId}
        mileage={mileage || quoteData?.quoteByCapId?.mileage}
        trim={String(trim)}
        derivativeInfo={derivativeInfo}
        colour={String(colour)}
        trimData={trimList}
        colourData={colourData}
        isPlayingLeaseAnimation={isPlayingLeaseAnimation}
        setIsPlayingLeaseAnimation={setIsPlayingLeaseAnimation}
        leaseAdjustParams={leaseAdjustParams}
        maintenance={maintenance}
        setMaintenance={setMaintenance}
        isModalShowing={isModalShowing}
        setIsModalShowing={setIsModalShowing}
        isInitPayModalShowing={isInitPayModalShowing}
        setIsInitPayModalShowing={setIsInitPayModalShowing}
        setIsInitialLoading={setIsInitialLoading}
        setIsRestoreLeaseSettings={setIsRestoreLeaseSettings}
        lineItem={lineItemData}
        isStartScreen={isStartScreen}
        onSubmit={values => onCompleted(values)}
        showCallBackForm={() => setShowCallBackForm(true)}
        pickups={pickups}
        isShowFreeInsuranceMerch={isShowFreeInsuranceMerch}
        isShowFreeHomeChargerMerch={isShowFreeHomeChargerMerch}
        roadsideAssistance={roadsideAssistance}
        warrantyDetails={warrantyDetails}
        setIsHotOffer={setIsHotOffer}
        setIsFactoryOrder={setIsFactoryOrder}
        toggleColorAndTrimModalVisible={toggleColorAndTrimModalVisible}
        isColourAndTrimOverlay={isColourAndTrimOverlay}
      />
      <Modal
        className="-mt-000 callBack"
        show={showCallBackForm}
        onRequestClose={() => setShowCallBackForm(false)}
      >
        <GoldrushFormContainer
          dataUiTestId={`${dataUiTestId}_goldrush-form`}
          isPostcodeVisible={vehicleType !== VehicleTypeEnum.CAR}
          capId={capId}
          isCallBackForm
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
