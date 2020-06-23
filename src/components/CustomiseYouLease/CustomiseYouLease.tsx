import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import SlidingInput from '@vanarama/uibook/lib/components/atoms/sliding-input';
import LeaseScanner from '@vanarama/uibook/lib/components/organisms/lease-scanner';
import SpeedometerOutline from '@vanarama/uibook/lib/assets/icons/SpeedometerSharp';
import { IProps, IColour, ITrim } from './interfase';

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

const CustomiseYourLease = ({
  terms,
  upfronts,
  leaseTypes,
  mileages,
  setLeaseType,
  setMileage,
  setUpfront,
  setColour,
  setTerm,
  setTrim,
  quoteData,
  data,
}: IProps) => {
  const quoteByCapId = quoteData?.quoteByCapId;
  const leaseAdjustParams = data?.leaseAdjustParams;
  const derivativeInfo = data?.derivativeInfo;
  return (
    <div className="pdp--sidebar -pb-600">
      <Heading tag="span" size="xlarge" color="black">
        Customise Your Lease
      </Heading>
      <Heading tag="span" size="regular" color="black">
        Lease Type
      </Heading>
      <Choiceboxes
        choices={leaseTypes}
        onSubmit={value => {
          setLeaseType(value.label.toUpperCase());
        }}
      />
      <Heading tag="span" size="regular" color="black">
        Annual Mileage:
        <Text color="orange" className="-b -ml-100">
          {`${quoteByCapId?.mileage} Miles`}
        </Text>
      </Heading>
      <SlidingInput
        steps={mileages}
        onChange={value => {
          setMileage(leaseAdjustParams?.mileages[value] || 0);
        }}
      />
      <div className="-flex-row">
        <Icon color="orange" icon={<SpeedometerOutline />} />
        <Text color="orange" size="small" className="-b -ml-200">
          + 1000
        </Text>
        <Text color="black" size="small" className="-mt-000 -ml-100">
          Extra Miles FREE
        </Text>
      </div>
      <Heading tag="span" size="regular" color="black">
        Length Of Lease:
        <Text color="orange" className="-b -ml-100">
          {`${quoteByCapId?.term} Months`}
        </Text>
      </Heading>
      <Choiceboxes
        choices={terms}
        onSubmit={value => {
          setTerm(+value.label);
        }}
      />
      <Heading tag="span" size="regular" color="black">
        Initial Payment:{' '}
        <Text color="orange" className="-b">
          {`£${quoteByCapId?.nonMaintained?.initialRental} inc. VAT`}
        </Text>
      </Heading>
      <Choiceboxes
        choices={upfronts}
        onSubmit={value => {
          setUpfront(+value.label);
        }}
      />
      <Heading tag="span" size="regular" color="black">
        Vehicle Options
      </Heading>
      <Select
        defaultValue={quoteByCapId?.colour || ''}
        className="-fullwidth"
        onChange={value => setColour(+value)}
      >
        {derivativeInfo?.colours?.map((currentColour: IColour | null) => (
          <option key={currentColour?.id} value={currentColour?.id}>
            {currentColour?.optionDescription}
          </option>
        ))}
      </Select>
      <Select
        defaultValue={quoteByCapId?.trim || ''}
        className="-fullwidth"
        onChange={value => setTrim(+value)}
      >
        {derivativeInfo?.trims?.map((currentTrim: ITrim | null) => (
          <option key={currentTrim?.id} value={currentTrim?.id}>
            {currentTrim?.optionDescription}
          </option>
        ))}
      </Select>

      <div className="pdp--order-summary">
        <LeaseScanner
          price={quoteByCapId?.nonMaintained?.monthlyRental || 0}
          orderNowClick={() => {}}
          headingText="PM inc. VAT"
          phoneNumber="+1313222"
          leasingProviders={LEASING_PROVIDERS}
          startLoading={false}
        />
      </div>
    </div>
  );
};

export default CustomiseYourLease;
