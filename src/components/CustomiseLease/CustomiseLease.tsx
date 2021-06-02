import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Choiceboxes from 'core/atoms/choiceboxes';
import Select from 'core/atoms/select';
import SlidingInput from 'core/atoms/sliding-input';
import Radio from 'core/atoms/radio';
import cx from 'classnames';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import OrderSummary from '../OrderSummary/OrderSummary';
import { IProps, IChoice } from './interface';
import { toPriceFormat } from '../../utils/helpers';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

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
  choicesValues: IChoice[],
  setChoice: Dispatch<SetStateAction<string>>,
  heading: string,
  isDisabled: boolean,
  currentValue?: string,
  choiceIndex?: number,
  setChoiceIndex?: Dispatch<SetStateAction<number>>,
  icon?: JSX.Element,
) => (
  <>
    <Heading tag="span" size="regular" color="black">
      {heading}
      {icon}
      {currentValue && (
        <>
          <br />
          <Text color="orange" className="-b">
            {currentValue}
          </Text>
        </>
      )}
    </Heading>
    <Choiceboxes
      disabled={isDisabled}
      className={`-cols-${choicesValues?.length}`}
      choices={choicesValues}
      onSubmit={value => {
        setChoice(value.label);
      }}
      choiceIndex={choiceIndex}
      setChoiceIndex={setChoiceIndex}
    />
  </>
);

const select = (
  defaultValue: string,
  setChanges: Dispatch<SetStateAction<number | null>>,
  items: (ITrimList | IColourList | null)[] | undefined | null,
  placeholder: string,
  isDisabled: boolean,
) => (
  <Select
    disabled={isDisabled}
    dataTestId={defaultValue}
    key={
      items?.some(item => `${item?.optionId}` === defaultValue)
        ? defaultValue
        : undefined
    }
    defaultValue={
      items?.some(item => `${item?.optionId}` === defaultValue)
        ? defaultValue
        : undefined
    }
    placeholder={placeholder}
    className="-fullwidth"
    onChange={option => {
      setChanges(+option.currentTarget.value);
    }}
  >
    {items?.map(item => (
      <option key={item?.optionId || 0} value={`${item?.optionId || 0}`}>
        {item?.label}
      </option>
    ))}
  </Select>
);

const CustomiseLease = ({
  terms,
  upfronts,
  defaultTermValue,
  defaultUpfrontValue,
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
  derivativeInfo,
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
}: IProps) => {
  const [initialPayment, setInitialPayment] = useState(
    data?.quoteByCapId?.leaseCost?.initialRental,
  );
  const [defaultMileage, setDefaultMileage] = useState(
    mileages.indexOf(mileage || 0) + 1,
  );
  const [monthIndex, setMonthIndex]: any = useState(null);
  const [upfrontIndex, setUpfrontIndex]: any = useState(null);
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
        setDefaultMileage(leaseSettings.mileageValue);
        setMileage(leaseSettings.mileage);
        setTerm(leaseSettings.term);
        setMonthIndex(
          terms.findIndex(
            term => term.value === leaseSettings.term?.toString(),
          ),
        );
        setUpfront(leaseSettings.upfront);
        setUpfrontIndex(
          upfronts.findIndex(
            upfront => upfront.value === leaseSettings.upfront?.toString(),
          ),
        );
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
  }, []);

  useEffect(() => {
    const upfront = quoteByCapId?.upfront;
    const maintenanceCost = quoteByCapId?.maintenanceCost?.monthlyRental;
    const initialRental = quoteByCapId?.leaseCost?.initialRental;
    if (upfront && maintenanceCost && maintenance) {
      const extraPayment = upfront * maintenanceCost;
      if (initialRental) setInitialPayment(extraPayment + initialRental);
    }
    if (!maintenance) setInitialPayment(initialRental);
  }, [quoteByCapId, maintenance]);

  const isMobile = useMobileViewport();
  const stateVAT = leaseType === 'Personal' ? 'inc' : 'exc';

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
    setTerm(defaultTermValue);
    setMonthIndex(
      terms.findIndex(term => term.value === defaultTermValue?.toString()),
    );

    setUpfront(defaultUpfrontValue);
    setUpfrontIndex(
      upfronts.findIndex(
        upfront => upfront.value === defaultUpfrontValue?.toString(),
      ),
    );
  };

  return (
    <div
      className={cx('pdp--sidebar', isPlayingLeaseAnimation ? 'disabled' : '')}
    >
      <Heading tag="h2" size="xlarge" color="black">
        Customise Your Lease
      </Heading>
      {choices(
        leaseTypes,
        setLeaseType,
        'Is this for you, or for your business?',
        isPlayingLeaseAnimation,
      )}
      <Heading tag="span" size="regular" color="black">
        How many miles will you be driving a year?
        <br />
        <Text color="orange" className="-b">
          {`${quoteByCapId?.mileage} Miles`}
        </Text>
      </Heading>
      <SlidingInput
        steps={mileages}
        disabled={isPlayingLeaseAnimation}
        defaultValue={defaultMileage}
        onChange={value => {
          setMileage(mileages[value - 1]);
        }}
      />
      {choices(
        terms,
        value => setTerm(+(value || 0) || null),
        'How long do you want your vehicle for?',
        isPlayingLeaseAnimation,
        `${quoteByCapId?.term} Months - ${(quoteByCapId?.term as number) /
          12} Years`,
        monthIndex,
        setMonthIndex,
      )}
      {choices(
        upfronts,
        value => setUpfront(+(value || 0) || null),
        'How much do you want to pay upfront?',
        isPlayingLeaseAnimation,
        `${quoteByCapId?.upfront} Months - £${toPriceFormat(
          initialPayment,
        )} ${stateVAT}. VAT`,
        upfrontIndex,
        setUpfrontIndex,
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

      {select(
        `${defaultColor || quoteByCapId?.colour}`,
        setColour,
        colourList,
        'Select Paint Colour',
        isPlayingLeaseAnimation,
      )}
      {select(
        `${defaultTrim || quoteByCapId?.trim || trim}`,
        setTrim,
        trimList,
        'Select Interior',
        isPlayingLeaseAnimation,
      )}
      <Heading tag="span" size="regular" color="black">
        Add Maintenance:
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
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <OrderSummary
          quoteByCapId={quoteByCapId}
          stateVAT={stateVAT}
          maintenance={maintenance}
          colours={derivativeInfo?.colours}
          trims={derivativeInfo?.trims}
          trim={trim}
          pickups={pickups}
          isShowFreeInsuranceMerch={isShowFreeInsuranceMerch}
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
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
                    )} Maintenance`
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
          </LazyLoadComponent>
        </div>
      )}
      {isModalShowing && (
        <Modal
          className="-mt-000"
          title="The Maintenance Package Covers:"
          text="Servicing, MOTs, tyres, brakes, wipes and bulbs. All you need to worry about is insurance and fuel!"
          show={isModalShowing}
          onRequestClose={() => setIsModalShowing(false)}
          additionalText="PS: Without this package you’ll have to deal with servicing and maintenance for your vehicle for the duration of your lease."
        >
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
