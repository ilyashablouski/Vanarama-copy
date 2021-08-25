import dynamic from 'next/dynamic';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ChoiceBoxesV2 from 'core/atoms/choiceboxes-v2';
import SlidingInput from 'core/atoms/sliding-input';
import Radio from 'core/atoms/radio';
import cx from 'classnames';
import Refresh from 'core/assets/icons/Refresh';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import OrderSummary from '../OrderSummary/OrderSummary';
import { IProps } from './interface';
import { toPriceFormat } from '../../utils/helpers';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import MaintenanceModalContent from '../../containers/DetailsPage/MaintenanceModalContent';
import CustomLeaseSelect from './CustomLeaseSelect';

const InformationCircle = dynamic(
  () => import('core/assets/icons/InformationCircle'),
  {
    ssr: false,
  },
);
const ShieldFreeInsurance = dynamic(
  () => import('core/assets/icons/ShieldFreeInsurance'),
  {
    ssr: false,
  },
);
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Badge = dynamic(() => import('core/atoms/badge'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Link = dynamic(() => import('core/atoms/link'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={1} />,
});
const LeaseScanner = dynamic(() => import('core/organisms/lease-scanner'), {
  loading: () => <Skeleton count={4} />,
});

const choices = (
  name: string,
  choicesValues: string[],
  setChoice: Dispatch<SetStateAction<LeaseTypeEnum>>,
  heading: string,
  isDisabled: boolean,
  selectedValue?: string,
  displayedValue?: string,
  icon?: JSX.Element,
) => (
  <>
    <Heading tag="span" size="regular" color="black">
      {heading}
      {icon}
      {displayedValue && (
        <>
          <br />
          <Text color="orange" className="-b">
            {displayedValue}
          </Text>
        </>
      )}
    </Heading>
    <ChoiceBoxesV2
      name={name}
      disabled={isDisabled}
      className="button-group -solid"
      values={choicesValues}
      selectedValues={[selectedValue ?? choicesValues[0]]}
      onChange={([newSelectedValue]) =>
        setChoice((newSelectedValue as string).toUpperCase() as LeaseTypeEnum)
      }
    />
  </>
);

const CustomiseLease = ({
  term,
  terms,
  upfront,
  upfronts,
  defaultTermValue,
  defaultUpfrontValue,
  defaultMileageValue,
  leaseTypes,
  mileages,
  setLeaseType,
  leaseType,
  setMileage,
  setUpfront,
  setColour,
  setTerm,
  setTrim,
  data,
  capId,
  maintenance,
  setMaintenance,
  isModalShowing,
  setIsModalShowing,
  trim,
  mileage,
  isPlayingLeaseAnimation,
  setIsPlayingLeaseAnimation,
  setIsInitialLoading,
  setIsRestoreLeaseSettings,
  lineItem,
  onSubmit,
  showCallBackForm,
  screenY,
  trimList,
  colourList,
  isInitPayModalShowing,
  setIsInitPayModalShowing,
  pickups,
  isShowFreeInsuranceMerch,
  isShowFreeHomeChargerMerch,
  roadsideAssistance,
  warrantyDetails,
}: IProps) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [initialPayment, setInitialPayment] = useState(
    data?.quoteByCapId?.leaseCost?.initialRental,
  );
  const [defaultMileageIndex, setDefaultMileageIndex] = useState(
    mileages.indexOf(mileage || 0) + 1,
  );
  const [defaultColor, setDefaultColor]: any = useState(null);
  const [defaultTrim, setDefaultTrim]: any = useState(null);

  const quoteByCapId = data?.quoteByCapId;

  useEffect(() => {
    // check for any previously set lease settings
    if (window.sessionStorage?.[`leaseSettings-${capId}`]) {
      const leaseSettings = JSON.parse(
        window.sessionStorage?.[`leaseSettings-${capId}`],
      );
      if (leaseSettings && leaseSettings.capId === capId) {
        setIsRestoreLeaseSettings(true);
        setMaintenance(leaseSettings.maintenance);
        setDefaultMileageIndex(leaseSettings.mileageValue);
        setMileage(leaseSettings.mileage);
        setTerm(leaseSettings.term);
        setUpfront(leaseSettings.upfront);

        if (leaseSettings.colour) {
          setDefaultColor(leaseSettings.colour);
          setColour(+leaseSettings.colour);
        }
        if (leaseSettings.trim) {
          setDefaultTrim(leaseSettings.trim);
          setTrim(+leaseSettings.trim);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const upfrontValue = quoteByCapId?.upfront;
    const maintenanceCost = quoteByCapId?.maintenanceCost?.initialRental;
    const initialRental = quoteByCapId?.leaseCost?.initialRental;
    if (upfrontValue && maintenanceCost && maintenance && initialRental) {
      setInitialPayment(maintenanceCost + initialRental);
    }
    if (!maintenance) {
      setInitialPayment(initialRental);
    }
  }, [quoteByCapId, maintenance]);

  const isMobile = useMobileViewport();
  const stateVAT = leaseType === LeaseTypeEnum.PERSONAL ? 'inc' : 'exc';

  const setSessionValues = () => {
    const mileageValue = mileages.indexOf(mileage || 0) + 1;
    const leaseSettings = {
      capId,
      mileage,
      maintenance,
      mileageValue,
      term: quoteByCapId?.term,
      upfront: quoteByCapId?.upfront,
      colour: quoteByCapId?.colour,
      trim: quoteByCapId?.trim,
    };
    window.sessionStorage.setItem(
      `leaseSettings-${capId}`,
      JSON.stringify(leaseSettings),
    );
  };

  const handleClickResetTermAndUpfront = () => {
    setMileage(defaultMileageValue);
    setUpfront(defaultUpfrontValue);
    setTerm(defaultTermValue);

    setDefaultMileageIndex(
      mileages.findIndex(mileageValue => mileageValue === defaultMileageValue) +
        1,
    );
  };

  return (
    <div
      className={cx('pdp--sidebar', isPlayingLeaseAnimation ? 'disabled' : '')}
      ref={sideBarRef}
    >
      <Heading tag="h2" size="xlarge" color="black">
        Customise Your Lease
      </Heading>
      {choices(
        'leaseType',
        leaseTypes,
        setLeaseType,
        'Is this for you, or for your business?',
        isPlayingLeaseAnimation,
        leaseType,
      )}
      <Heading tag="span" size="regular" color="black">
        How many miles will you be driving a year?
        <br />
        <Text color="orange" className="-b">
          {quoteByCapId?.mileage} Miles
        </Text>
      </Heading>
      <SlidingInput
        steps={mileages}
        disabled={isPlayingLeaseAnimation}
        defaultValue={defaultMileageIndex}
        setDefaultMileageIndex={setDefaultMileageIndex}
        onChange={value => {
          setMileage(mileages[value - 1]);
        }}
      />
      {choices(
        'terms',
        terms,
        value => setTerm(+(value || 0) || null),
        'How long do you want your vehicle for?',
        isPlayingLeaseAnimation,
        term?.toString(),
        `${quoteByCapId?.term} Months - ${(quoteByCapId?.term as number) /
          12} Years`,
      )}
      {choices(
        'upfront',
        upfronts,
        value => setUpfront(+(value || 0) || null),
        'How much do you want to pay upfront?',
        isPlayingLeaseAnimation,
        upfront?.toString(),
        `${quoteByCapId?.upfront} Months - £${toPriceFormat(
          initialPayment,
        )} ${stateVAT}. VAT`,
        <Icon
          icon={<InformationCircle />}
          color="teal"
          className="md hydrated -ml-100 -info-modal"
          onClick={() => setIsInitPayModalShowing(true)}
        />,
      )}
      <Heading tag="span" size="regular" color="black" className="-flex-h">
        Vehicle Options
        {data.quoteByCapId?.leadTime && (
          <Text color="orange" className="-b">
            {data.quoteByCapId.leadTime}
          </Text>
        )}
      </Heading>
      <CustomLeaseSelect
        defaultValue={`${defaultColor || quoteByCapId?.colour}`}
        setChanges={setColour}
        items={colourList}
        dataTestId="colour-selector"
        placeholder="Select Paint Colour:"
        isDisabled={isPlayingLeaseAnimation}
        modalElement={sideBarRef.current as HTMLDivElement}
      />

      <CustomLeaseSelect
        defaultValue={`${defaultTrim || quoteByCapId?.trim || trim}`}
        setChanges={setTrim}
        items={trimList}
        dataTestId="trim-selector"
        placeholder="Select Interior:"
        isDisabled={isPlayingLeaseAnimation}
        modalElement={sideBarRef.current as HTMLDivElement}
      />

      <Heading tag="span" size="regular" color="black">
        Add Vanarama Service Plan (Our Maintenance Package):
        <Text color="orange" className="-b -ml-100">
          {`£${toPriceFormat(
            quoteByCapId?.maintenanceCost?.monthlyRental,
          )} Per Month ${stateVAT}. VAT`}
        </Text>
      </Heading>
      <Link size="small" onClick={() => setIsModalShowing(true)}>
        See What&apos;s Included
      </Link>
      <Formgroup>
        <Radio
          name="maintenance"
          id="maintenanceCost"
          label="YES, I want peace of mind and to keep things hassle-free"
          onChange={() => setMaintenance(true)}
          defaultChecked={!!maintenance}
          disabled={isPlayingLeaseAnimation}
        />
        <Radio
          name="maintenance"
          id="leaseCost"
          label="NO, I want to worry about sorting the maintenance costs myself"
          onChange={() => setMaintenance(false)}
          defaultChecked={maintenance === false}
          disabled={isPlayingLeaseAnimation}
        />
      </Formgroup>
      <div className="button-wrapper">
        <Button
          className={cx('-reset', isPlayingLeaseAnimation ? 'disabled' : '')}
          fill="clear"
          color="teal"
          icon={<Refresh />}
          iconColor="teal"
          iconPosition="before"
          label="Reset Price"
          onClick={handleClickResetTermAndUpfront}
        />
      </div>

      {isShowFreeInsuranceMerch && (
        <div className="whats-included-insurance">
          <ShieldFreeInsurance />
          <div>
            <Badge label="Free" color="orange" size="small" />
            <Text tag="span">1 Year&lsquo;s Free Car Insurance</Text>
          </div>
        </div>
      )}
      <LazyLoadComponent
        visibleByDefault={isServerRenderOrAppleDevice}
        placeholder={<span className="-d-block -h-900" />}
      >
        <OrderSummary
          quoteByCapId={quoteByCapId}
          stateVAT={stateVAT}
          maintenance={maintenance}
          colours={colourList}
          trims={trimList}
          trim={trim}
          pickups={pickups}
          isShowFreeInsuranceMerch={isShowFreeInsuranceMerch}
          isShowFreeHomeChargerMerch={isShowFreeHomeChargerMerch}
          roadsideAssistance={roadsideAssistance}
          warrantyDetails={warrantyDetails}
        />
      </LazyLoadComponent>
      {!isMobile && (
        <div
          className={cx(
            'lease-scanner--sticky-wrap',
            (screenY || 0) < 350 ? 'start-screen' : '',
          )}
          style={{ opacity: '1' }}
        >
          <LeaseScanner
            classNameHeading="headingText"
            className="pdp-footer"
            nextBestPrice={
              maintenance
                ? `£${toPriceFormat(
                    quoteByCapId?.nextBestPrice?.maintained,
                  )} PM ${stateVAT}. VAT`
                : `£${toPriceFormat(
                    quoteByCapId?.nextBestPrice?.nonMaintained,
                  )} PM ${stateVAT}. VAT`
            }
            priceLabel={
              maintenance
                ? `+£${toPriceFormat(
                    quoteByCapId?.maintenanceCost?.monthlyRental,
                  )} Vanarama Service Plan`
                : undefined
            }
            price={+toPriceFormat(quoteByCapId?.leaseCost?.monthlyRental)}
            orderNowClick={() => {
              onSubmit({
                leaseType: leaseType.toUpperCase() as LeaseTypeEnum,
                lineItems: [lineItem],
              });
              setSessionValues();
            }}
            headingText={`PM ${stateVAT}. VAT`}
            leasingProviders={LEASING_PROVIDERS}
            startLoading={isPlayingLeaseAnimation}
            endAnimation={() => {
              setIsInitialLoading(true);
              setIsPlayingLeaseAnimation(false);
            }}
            requestCallBack={() => {
              showCallBackForm(true);
            }}
          />
        </div>
      )}
      {isModalShowing && (
        <Modal
          className="-mt-000"
          containerClassName="modal-container-large"
          title="The Vanarama Service Plan (Our Maintenance Package) Covers:"
          show={isModalShowing}
          onRequestClose={() => setIsModalShowing(false)}
        >
          <MaintenanceModalContent />
          <Button
            className="-mt-200"
            color="teal"
            onClick={() => setIsModalShowing(false)}
            label="Okay"
          />
        </Modal>
      )}
      {isInitPayModalShowing && (
        <Modal
          className="-mt-000"
          title="How much do you want to pay upfront?"
          text="Your upfront payment is calculated based on your monthly payments. The more you pay upfront, the lower your monthly payments."
          show={isInitPayModalShowing}
          onRequestClose={() => setIsInitPayModalShowing(false)}
        />
      )}
    </div>
  );
};

export default CustomiseLease;
