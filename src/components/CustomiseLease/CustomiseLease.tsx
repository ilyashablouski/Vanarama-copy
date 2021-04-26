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

const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const InformationCircle = dynamic(
  () => import('core/assets/icons/InformationCircle'),
  {
    ssr: false,
  },
);
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const CardHeader = dynamic(() => import('core/molecules/cards/CardHeader'), {
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
) => (
  <>
    <Heading tag="span" size="regular" color="black">
      {heading}
      {currentValue && (
        <Text color="orange" className="-b -ml-100">
          {currentValue}
        </Text>
      )}
    </Heading>
    <Choiceboxes
      disabled={isDisabled}
      className={`-cols-${choicesValues?.length}`}
      choices={choicesValues}
      onSubmit={value => {
        setChoice(value.label);
      }}
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
  isDisabled,
  setIsDisabled,
  setIsInitialLoading,
  lineItem,
  onSubmit,
  showCallBackForm,
  screenY,
  trimList,
  colourList,
  isInitPayModalShowing,
  setIsInitPayModalShowing,
}: IProps) => {
  const [initialPayment, setInitialPayment] = useState(
    data?.quoteByCapId?.leaseCost?.initialRental,
  );
  const [defaultMileage, setDefaultMileage] = useState(mileages.indexOf(mileage || 0) + 1);
  const quoteByCapId = data?.quoteByCapId;

  useEffect(() => {
    // check for any previously set lease settings
    if(window.sessionStorage.leaseSettings) {
      const leaseSettings = JSON.parse(window.sessionStorage?.leaseSettings);
      if (leaseSettings && leaseSettings.capId === capId) {
        setDefaultMileage(leaseSettings.mileageValue);
        setMileage(leaseSettings.mileage);
        setTerm(leaseSettings.term)
      }
    }
  }, []);
  
  useEffect(() => {
    console.log(terms)
  }, [quoteByCapId])

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
    const leaseSettings: any = {
      capId,
    }
    const storage = window.sessionStorage
    if(mileage) {
      const mileageValue = mileages.indexOf(mileage) + 1
      leaseSettings.mileage = mileage;
      leaseSettings.mileageValue = mileageValue;
      leaseSettings.term = quoteByCapId?.term;
    }
    storage.setItem('leaseSettings', JSON.stringify(leaseSettings));
  }

  return (
    <div className={cx('pdp--sidebar', isDisabled ? 'disabled' : '')}>
      <Heading tag="h2" size="xlarge" color="black">
        Customise Your Lease
      </Heading>
      {choices(leaseTypes, setLeaseType, 'Lease Type', isDisabled)}
      <Heading tag="span" size="regular" color="black">
        Annual Mileage:
        <Text color="orange" className="-b -ml-100">
          {`${quoteByCapId?.mileage} Miles`}
        </Text>
      </Heading>
      <SlidingInput
        steps={mileages}
        disabled={isDisabled}
        defaultValue={defaultMileage}
        onChange={value => {
          setMileage(mileages[value - 1]);
        }}
      />
      {choices(
        terms,
        value => setTerm(+(value || 0) || null),
        'Length Of Lease:',
        isDisabled,
        `${quoteByCapId?.term} Months`,
      )}
      <Icon
        icon={<InformationCircle />}
        color="teal"
        className="md hydrated"
        onClick={() => setIsInitPayModalShowing(true)}
        onMouseEnter={() => setIsInitPayModalShowing(true)}
      />
      {choices(
        upfronts,
        value => setUpfront(+(value || 0) || null),
        'Initial Payment - Months: ',
        isDisabled,
        `£${toPriceFormat(initialPayment)} ${stateVAT}. VAT`,
      )}
      <Heading tag="span" size="regular" color="black" className="-flex-h">
        Vehicle Options
        {data.quoteByCapId?.leadTime && (
          <CardHeader
            text={data.quoteByCapId.leadTime}
            incomplete
            className="rounded"
            accentIcon={
              <Icon icon={<Flame />} color="white" className="md hydrated" />
            }
          />
        )}
      </Heading>

      {select(
        `${quoteByCapId?.colour}`,
        setColour,
        colourList,
        'Select Paint Colour',
        isDisabled,
      )}
      {select(
        `${quoteByCapId?.trim || trim}`,
        setTrim,
        trimList,
        'Select Interior',
        isDisabled,
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
          disabled={isDisabled}
        />
        <Radio
          name="maintenance"
          id="leaseCost"
          label="NO, I want to worry about sorting the maintenance costs myself"
          onChange={() => setMaintenance(false)}
          disabled={isDisabled}
        />
      </Formgroup>
      <LazyLoadComponent
        visibleByDefault={
          typeof window === 'undefined' ||
          navigator?.vendor === 'Apple Computer, Inc.'
        }
      >
        <OrderSummary
          quoteByCapId={quoteByCapId}
          stateVAT={stateVAT}
          maintenance={maintenance}
          colours={derivativeInfo?.colours}
          trims={derivativeInfo?.trims}
          trim={trim}
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
          <LazyLoadComponent
            visibleByDefault={
              typeof window === 'undefined' ||
              navigator?.vendor === 'Apple Computer, Inc.'
            }
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
              startLoading={isDisabled}
              endAnimation={() => {
                setIsInitialLoading(true);
                setIsDisabled(false);
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
