/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Dispatch, SetStateAction } from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import SlidingInput from '@vanarama/uibook/lib/components/atoms/sliding-input';
import LeaseScanner from '@vanarama/uibook/lib/components/organisms/lease-scanner';
import SpeedometerOutline from '@vanarama/uibook/lib/assets/icons/SpeedometerSharp';
import { IProps, IColour, ITrim, IChoice } from './interfase';
import {
  GetVehicleDetails_derivativeInfo_trims,
  GetVehicleDetails_derivativeInfo_colours,
} from '../../../generated/GetVehicleDetails';

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
  setChoice: Dispatch<SetStateAction<string | null>>,
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
    defaultValue={defaultValue || ''}
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
  mileage,
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
        value={mileages.indexOf(mileage || 0) + 1}
        onChange={value => {
          setMileage(mileages[value - 1]);
        }}
        steps={mileages.map((item: number) => `${item / 1000}K`)}
      />
      <div className="-flex-row">
        <Icon color="orange" size="large" icon={<SpeedometerOutline />} />
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
        `£${quoteByCapId?.nonMaintained?.initialRental} ${stateVAT}. VAT`,
      )}
      <Heading tag="span" size="regular" color="black">
        Vehicle Options
      </Heading>
      {select(
        `${quoteByCapId?.colour}`,
        setColour,
        derivativeInfo?.colours,
        'Select Paint Holder',
      )}
      {select(
        `${quoteByCapId?.trim}`,
        setTrim,
        derivativeInfo?.trims,
        'Select Interior',
      )}
      <div className="lease-scanner--sticky-wrap">
        <LeaseScanner
          className="pdp-footer"
          price={quoteByCapId?.nonMaintained?.monthlyRental || 0}
          orderNowClick={() => {}}
          headingText={`PM ${stateVAT}. VAT`}
          phoneNumber="+1313222"
          leasingProviders={LEASING_PROVIDERS}
          startLoading={false}
        />
      </div>
    </div>
  );
};

export default CustomiseLease;
