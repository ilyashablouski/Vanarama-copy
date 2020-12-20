import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Heading from 'core/atoms/heading';
import Choiceboxes from 'core/atoms/choiceboxes';
import Text from 'core/atoms/text';
import SlidingInput from 'core/atoms/sliding-input';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
import { toPriceFormat } from '../../../utils/helpers';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';

const RENTAL_DATA = [
  {
    value: 150,
    label: '£150',
  },
  {
    value: 250,
    label: '£250',
  },
  {
    value: 350,
    label: '£350',
  },
  {
    value: 450,
    label: '£450',
  },
  {
    value: 550,
    label: '£550+',
  },
];

const HelpMeChooseResult: FC<HelpMeChooseStep> = props => {
  const router = useRouter();
  const {
    setSteps,
    steps,
    getProductsFilterList,
    productsFilterListData,
  } = props;

  const stateVAT =
    (steps?.financeTypes?.value as any) === 'PCH' ? 'inc' : 'exc';
  const minRental = getSectionsData(
    ['productsFilterList', 'rental', 'stats', 'min'],
    productsFilterListData?.data,
  );
  const defaultRental =
    (steps.rental?.value as any) ??
    RENTAL_DATA.find(el => el.value > minRental)?.value;
  const vehiclesResultNumber = getSectionsData(
    ['productsFilterList', 'manufacturers', 'docCount'],
    productsFilterListData?.data,
  );
  const initialPaymentNumber = getSectionsData(
    ['productsFilterList', 'initialPayment', 'stats', 'min'],
    productsFilterListData?.data,
  );

  const [rental, setRental] = useState<number>(defaultRental ?? 550);
  const [initialPeriods, setInitialPeriods] = useState<string>(
    (steps.initialPeriods?.value as any) || '6',
  );
  const price = initialPaymentNumber;

  const INITIAL_PERIODS_DATA = [
    {
      value: '1',
      label: '1',
      active: initialPeriods === '1',
    },
    {
      value: '3',
      label: '3',
      active: initialPeriods === '3',
    },
    {
      value: '6',
      label: '6',
      active: initialPeriods ? initialPeriods === '6' : true,
    },
    {
      value: '9',
      label: '9',
      active: initialPeriods === '9',
    },
    {
      value: '12',
      label: '12',
      active: initialPeriods === '12',
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const rentalQuey = parseInt(searchParams.get('rental') || '', 10);
      const initialPeriodsQuey = searchParams.get('initialPeriods');
      setSteps({
        ...steps,
        rental: {
          active: true,
          value: (rentalQuey as any) || rental,
        },
        initialPeriods: {
          active: true,
          value: (initialPeriodsQuey as any) || initialPeriods,
        },
      });
      setRental(rentalQuey || rental);
      setInitialPeriods(initialPeriodsQuey || initialPeriods);
      getProductsFilterList({
        variables: {
          filter: {
            ...buildAnObjectFromAQuery(searchParams),
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeParams = (rentalId: number, initialPeriodValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const rentalValue = RENTAL_DATA[rentalId - 1].value;
    getProductsFilterList({
      variables: {
        filter: {
          ...buildAnObjectFromAQuery(searchParams),
          rental: {
            min: rentalValue,
          },
          initialPeriods: [+initialPeriodValue],
        },
      },
    });
    setSteps({
      ...steps,
      rental: {
        active: true,
        value: rentalValue as any,
      },
      initialPeriods: {
        active: true,
        value: initialPeriodValue as any,
      },
    });
    onReplace(router, {
      ...steps,
      rental: {
        active: true,
        value: rentalValue as any,
      },
      initialPeriods: {
        active: true,
        value: initialPeriodValue as any,
      },
    });
  };

  return (
    <>
      <div className="row:stepped-form">
        <div className="stepped-form--filter">
          <Heading tag="span" size="regular" color="black">
            Monthly Budget:
            <Text color="orange" className="-b -ml-100">
              Up To £{rental} PM {stateVAT}.VAT
            </Text>
          </Heading>
          <SlidingInput
            steps={RENTAL_DATA}
            defaultValue={RENTAL_DATA.findIndex(el => el.value === rental) + 1}
            onChange={(value: number) => {
              setRental(RENTAL_DATA[value - 1].value);
              onChangeParams(value, initialPeriods);
            }}
          />
        </div>
        <Heading tag="span" size="regular" color="black">
          Initial Payment - No. Of Months: £
          <Text color="orange" className="-b -ml-100">
            {toPriceFormat(price)} {stateVAT}.VAT
          </Text>
        </Heading>
        <Choiceboxes
          className="-cols-5 stepped-form--choiceboxes"
          choices={INITIAL_PERIODS_DATA}
          onSubmit={el => {
            setInitialPeriods(el.value || '');
            onChangeParams(
              RENTAL_DATA.findIndex(r => r.value === rental) + 1,
              el.value || '',
            );
          }}
        />
        <Heading
          tag="h1"
          color="black"
          size="xlarge"
          className="stepped-form--title -mb-100"
        >
          {`We've Found `}
          <Text tag="span" size="xlarge" color="orange" className="-b -mh-100">
            {vehiclesResultNumber}
          </Text>
          Vehicles
        </Heading>
        <div className="stepped-form--results">work</div>
      </div>
    </>
  );
};

export default HelpMeChooseResult;
