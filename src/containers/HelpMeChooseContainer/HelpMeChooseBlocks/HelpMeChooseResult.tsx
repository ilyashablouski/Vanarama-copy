import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { FC, useContext, useEffect, useState } from 'react';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
import { buildAnObjectFromAQuery, initialSteps, onReplace } from '../helpers';
import truncateString from '../../../utils/truncateString';
import { useModelImages } from '../../SearchPageContainer/gql';
import { useVehicleListUrl } from '../../../gql/vehicleList';
import { CompareContext } from '../../../utils/comparatorTool';
import { formatProductPageUrl } from '../../../utils/url';
import { isCompared } from '../../../utils/comparatorHelpers';
import RouterLink from '../../../components/RouterLink/RouterLink';

const SlidingInput = dynamic(() => import('core/atoms/sliding-input'));
const Text = dynamic(() => import('core/atoms/text'));
const Choiceboxes = dynamic(() => import('core/atoms/choiceboxes'));
const Heading = dynamic(() => import('core/atoms/heading'));
const Price = dynamic(() => import('core/atoms/price'));
const ProductCard = dynamic(() =>
  import('core/molecules/cards/ProductCard/ProductCard'),
);
const Button = dynamic(() => import('core/atoms/button'));

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
  const { compareVehicles, compareChange } = useContext(CompareContext);
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
  const defaultRental = steps.rental?.value
    ? (steps.rental?.value as any)
    : RENTAL_DATA.reduce((prev, curr) =>
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

  const resultsData: any[] =
    getSectionsData(
      ['productVehicleList', 'edges'],
      productVehicleListData?.data,
    ) || 0;
  const capIds: string[] = resultsData.map(el => el.node.derivativeId);
  const { data: imageData } = useModelImages(capIds, !capIds.length);
  const { data: urlData } = useVehicleListUrl(capIds);
  const results: any[] = resultsData
    .map(el => {
      const urlItem = urlData?.vehicleList.edges?.find(
        x => x?.node?.derivativeId === el.node?.derivativeId,
      )?.node;
      return {
        ...el,
        imageSrc: imageData?.vehicleImages?.find(
          x => x?.capId === parseInt(el.node?.derivativeId || '', 10),
        )?.mainImageUrl,
        legacyUrl: urlItem?.legacyUrl,
        url: urlItem?.url,
      };
    })
    .sort((a, b) => a.node?.availability - b.node?.availability);

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
      const rentalValue = rentalQuey ? (rentalQuey as any) : rental;
      const initialPeriodsValue = initialPeriodsQuey
        ? (initialPeriodsQuey as any)
        : initialPeriods;
      setSteps({
        ...steps,
        rental: {
          active: true,
          value: rentalValue,
        },
        initialPeriods: {
          active: true,
          value: initialPeriodsValue,
        },
      });
      setRental(rentalValue);
      setInitialPeriods(initialPeriodsValue);
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

  const clickSearchAgain = () => {
    const searchParams = new URLSearchParams();
    setSteps(initialSteps);
    getProductVehicleList({
      variables: {
        filter: {
          ...buildAnObjectFromAQuery(searchParams, steps),
        },
      },
    });
    onReplace(router, { ...initialSteps });
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
        <div className="stepped-form--results">
          {!!results.length &&
            results.map((el: any, id: number) => (
              <div key={el.node?.capId + id || ''}>
                <ProductCard
                  inline
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  imageSrc={
                    el.imageSrc ||
                    `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
                  }
                  onCompare={() => {
                    compareChange({
                      pageUrl: formatProductPageUrl(
                        el.legacyUrl || el.url || '',
                        el.node?.derivativeId,
                      ),
                      ...(el.node as any),
                    });
                  }}
                  compared={isCompared(compareVehicles, el.node as any)}
                  onWishlist={() => true}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        link={{
                          href: el.legacyUrl || el.url || '',
                          label: '',
                        }}
                        onClick={() =>
                          sessionStorage.setItem(
                            'capId',
                            el.node?.derivativeId || '',
                          )
                        }
                        className="heading"
                        classNames={{ size: 'large', color: 'black' }}
                      >
                        <Heading tag="span" size="large" className="-pb-100">
                          {truncateString(
                            `${el.node?.manufacturerName} ${el.node?.modelName}`,
                          )}
                        </Heading>
                        <Heading tag="span" size="small" color="dark">
                          {el.node?.derivativeName || ''}
                        </Heading>
                      </RouterLink>
                    ),
                  }}
                >
                  <div className="-flex-h">
                    <Price
                      price={el.node?.rental}
                      size="large"
                      separator="."
                      priceDescription={`Per Month ${
                        (steps.financeTypes.value as any) === 'PCH'
                          ? 'Inc.VAT'
                          : 'Exc.VAT'
                      }`}
                    />
                    <RouterLink
                      link={{
                        href: el.legacyUrl || el.url || '',
                        label: 'View Offer',
                      }}
                      onClick={() =>
                        sessionStorage.setItem(
                          'capId',
                          el.node?.derivativeId || '',
                        )
                      }
                      classNames={{
                        color: 'teal',
                        solid: true,
                        size: 'regular',
                      }}
                      className="button"
                      dataTestId="view-offer"
                    >
                      <div className="button--inner">View Offer</div>
                    </RouterLink>
                  </div>
                </ProductCard>
              </div>
            ))}
        </div>
        <div className="button-group">
          <Button
            color="primary"
            dataTestId="help-me-choose_view-all"
            label="View All Offers"
            onClick={() => {
              onReplace(
                router,
                {
                  ...steps,
                  rental: {
                    active: true,
                    value: rental as any,
                  },
                },
                '/car-leasing/special-offers',
              );
            }}
            size="large"
            className="stepped-form--button"
            type="button"
          />
          <Button
            color="primary"
            dataTestId="help-me-choose_search-again"
            fill="outline"
            label="Search Again"
            onClick={clickSearchAgain}
            size="large"
            className="stepped-form--button"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default HelpMeChooseResult;
