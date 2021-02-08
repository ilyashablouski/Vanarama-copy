import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Heading from 'core/atoms/heading';
import Choiceboxes from 'core/atoms/choiceboxes';
import Text from 'core/atoms/text';
import SlidingInput from 'core/atoms/sliding-input';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
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
    getProductVehicleList,
    productVehicleListData,
  } = props;

  const stateVAT =
    (steps?.financeTypes?.value as any) === 'PCH' ? 'inc' : 'exc';
  const rentalData: [{ key: string }] = getSectionsData(
    ['productVehicleList', 'aggs', 'rental'],
    productVehicleListData?.data,
  );
  const minRental = rentalData?.reduce((prev, curr) =>
    parseFloat(prev.key) < parseFloat(curr.key) ? prev : curr,
  );
  const defaultRental =
    (steps.rental?.value as any) ??
    RENTAL_DATA.reduce((prev, curr) =>
      prev.value < parseFloat(minRental.key) &&
      prev.value < curr.value &&
      parseFloat(minRental.key) < curr.value
        ? prev
        : curr,
    ).value;
  const vehiclesResultNumber = getSectionsData(
    ['productVehicleList', 'totalCount'],
    productVehicleListData?.data,
  );

  const [rental, setRental] = useState<number>(defaultRental ?? 550);
  const [initialPeriods, setInitialPeriods] = useState<string>(
    (steps.initialPeriods?.value as any) || '6',
  );

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
      getProductVehicleList({
        variables: {
          filter: {
            ...buildAnObjectFromAQuery(searchParams, steps),
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeParams = (rentalId: number, initialPeriodValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const rentalValue = RENTAL_DATA[rentalId - 1].value;
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
    getProductVehicleList({
      variables: {
        filter: {
          ...buildAnObjectFromAQuery(searchParams, steps),
          rental: {
            min: rentalValue,
          },
          initialPeriods: [+initialPeriodValue],
        },
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
          Initial Payment - No. Of Months
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
        <div className="stepped-form--results" />
      </div>
    </>
  );
};

export default HelpMeChooseResult;
