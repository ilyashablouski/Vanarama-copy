/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Dispatch, SetStateAction } from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import SlidingInput from '@vanarama/uibook/lib/components/atoms/sliding-input';
import LeaseScanner from '@vanarama/uibook/lib/components/organisms/lease-scanner';
import Radio from '@vanarama/uibook/lib/components/atoms/radio';
import MileageBooster from '@vanarama/uibook/lib/assets/icons/MileageBooster';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import OrderSummary from '../OrderSummary/OrderSummary';
import { IProps, IColour, ITrim, IChoice } from './interfase';
import { toPriceFormat } from '../../utils/helpers';
import {
  GetVehicleDetails_derivativeInfo_trims,
  GetVehicleDetails_derivativeInfo_colours,
} from '../../../generated/GetVehicleDetails';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

const LEASING_PROVIDERS = [
  'LeasePlan',
  'Arval',
  'Lex',
  'Hitachi',
  'ALD',
  'BNP Paribas',
  'Leasys',
  'Santander',
  'Toyota Finance',
  'Agility Fleet',
  'BlackHorse',
];

const choices = (
  choicesValues: IChoice[],
  setChoice: Dispatch<SetStateAction<string>>,
  heading: string,
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
) => (
  <Select
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
  lineItem,
  onSubmit,
}: IProps) => {
  const quoteByCapId = data?.quoteByCapId;
  const stateVAT = leaseType === 'Personal' ? 'inc' : 'exc';

  return (
    <div className="pdp--sidebar">
      <Heading tag="span" size="xlarge" color="black">
        Customise Your Lease
      </Heading>
      {choices(leaseTypes, setLeaseType, 'Lease Type')}
      <Heading tag="span" size="regular" color="black">
        Annual Mileage:
        <Text color="orange" className="-b -ml-100">
          {`${quoteByCapId?.mileage} Miles`}
        </Text>
      </Heading>
      <SlidingInput
        steps={mileages}
        defaultValue={mileages.indexOf(mileage || 0) + 1}
        onChange={value => {
          setMileage(mileages[value - 1]);
        }}
      />
      <div className="-flex-row">
        <Icon
          color="orange"
          size="xlarge"
          icon={<MileageBooster />}
          className="-pt-200"
        />
        <Text color="orange" size="small" className="-b -ml-200">
          {`+ ${(quoteByCapId?.mileage || 0) / 10}`}
        </Text>
        <Text color="black" size="small" className="-mt-000 -ml-100">
          Extra Miles FREE
        </Text>
      </div>
      {choices(
        terms,
        value => setTerm(+(value || 0) || null),
        'Length Of Lease:',
        `${quoteByCapId?.term} Months`,
      )}
      {choices(
        upfronts,
        value => setUpfront(+(value || 0) || null),
        'Initial Payment: ',
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
      )}
      {select(
        `${quoteByCapId?.trim || trim}`,
        setTrim,
        derivativeInfo?.trims,
        'Select Interior',
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
        />
        <Radio
          name="maintenance"
          id="leaseCost"
          label="NO, I want to worry about sorting the maintenance costs myself"
          onChange={() => setMaintenance(false)}
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
      <div className="lease-scanner--sticky-wrap">
        <LeaseScanner
          classNameHeading="headingText"
          className="pdp-footer"
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
          phoneNumber="+1313222"
          leasingProviders={LEASING_PROVIDERS}
          startLoading={false}
          endAnimation={() => {}}
        />
      </div>
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
