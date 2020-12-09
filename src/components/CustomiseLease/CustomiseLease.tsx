/* eslint-disable @typescript-eslint/camelcase */
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import SlidingInput from '@vanarama/uibook/lib/components/atoms/sliding-input';
import Radio from '@vanarama/uibook/lib/components/atoms/radio';
import cx from 'classnames';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import OrderSummary from '../OrderSummary/OrderSummary';
import { IProps, IColour, ITrim, IChoice } from './interface';
import { toPriceFormat } from '../../utils/helpers';
import {
  GetVehicleDetails_derivativeInfo_trims,
  GetVehicleDetails_derivativeInfo_colours,
} from '../../../generated/GetVehicleDetails';
import { LEASING_PROVIDERS } from '../../utils/leaseScannerHelper';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Link = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/link'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Modal = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/modal'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Formgroup = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/formgroup'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const LeaseScanner = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/lease-scanner'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

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
  items:
    | (
        | GetVehicleDetails_derivativeInfo_colours
        | GetVehicleDetails_derivativeInfo_trims
        | null
      )[]
    | undefined
    | null,
  placeholder: string,
  isDisabled: boolean,
) => (
  <Select
    disabled={isDisabled}
    dataTestId={defaultValue}
    key={
      items?.some(item => item?.id === defaultValue) ? defaultValue : undefined
    }
    defaultValue={
      items?.some(item => item?.id === defaultValue) ? defaultValue : undefined
    }
    placeholder={placeholder}
    className="-fullwidth"
    onChange={option => {
      setChanges(+option.currentTarget.value);
    }}
  >
    {items?.map((item: IColour | ITrim | null) => (
      <option key={item?.id} value={item?.id}>
        {item?.optionDescription}
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
}: IProps) => {
  const quoteByCapId = data?.quoteByCapId;
  const isMobile = useMobileViewport();
  const stateVAT = leaseType === 'Personal' ? 'inc' : 'exc';

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
        defaultValue={mileages.indexOf(mileage || 0) + 1}
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
      {choices(
        upfronts,
        value => setUpfront(+(value || 0) || null),
        'Initial Payment: ',
        isDisabled,
        `£${toPriceFormat(
          quoteByCapId?.leaseCost?.initialRental,
        )} ${stateVAT}. VAT`,
      )}
      <Heading tag="span" size="regular" color="black">
        Vehicle Options
      </Heading>
      {select(
        `${quoteByCapId?.colour}`,
        setColour,
        derivativeInfo?.colours,
        'Select Paint Colour',
        isDisabled,
      )}
      {select(
        `${quoteByCapId?.trim || trim}`,
        setTrim,
        derivativeInfo?.trims,
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
      <OrderSummary
        quoteByCapId={quoteByCapId}
        stateVAT={stateVAT}
        maintenance={maintenance}
        colours={derivativeInfo?.colours}
        trims={derivativeInfo?.trims}
        trim={trim}
      />
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
                  )} Maintenance`
                : undefined
            }
            price={+toPriceFormat(quoteByCapId?.leaseCost?.monthlyRental)}
            orderNowClick={() =>
              onSubmit({
                leaseType: leaseType.toUpperCase() as LeaseTypeEnum,
                lineItems: [lineItem],
              })
            }
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
        </div>
      )}
      {isModalShowing && (
        <Modal
          className="-mt-000"
          title="The Maintenance Package Covers:"
          text="Servicing, MOTs, tyres, brakes, wipes and bulbs. All you need to worry about is insurance and fuel!"
          show={isModalShowing}
          onRequestClose={() => setIsModalShowing(false)}
          additionalText="PS: Without the package you’ll have to deal with the MOTs, servicing
      and replacements for your new vehicle, for the duration of your lease."
        >
          <Button
            className="-mt-200"
            color="teal"
            onClick={() => setIsModalShowing(false)}
            label="Okay"
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomiseLease;
