import { useRouter } from 'next/router';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import SlidingInput from 'core/atoms/sliding-input';
import Heading from 'core/atoms/heading';
import Text from 'core/atoms/text';
import Choiceboxes from 'core/atoms/choiceboxes';
import Price from 'core/atoms/price';
import Button from 'core/atoms/button';
import ProductCard from 'core/molecules/cards/ProductCard/ProductCard';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
import {
  buildAnObjectFromAQuery,
  formatForCompare,
  initialSteps,
  onReplace,
} from '../helpers';
import truncateString from '../../../utils/truncateString';
import { useModelImages } from '../../SearchPageContainer/gql';
import { CompareContext } from '../../../utils/comparatorTool';
import { isCompared } from '../../../utils/comparatorHelpers';
import RouterLink from '../../../components/RouterLink/RouterLink';
import { ProductVehicleList_productVehicleList_edges as Edges } from '../../../../generated/ProductVehicleList';

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

interface IHelpMeChooseResult extends HelpMeChooseStep {
  setCounterState: Dispatch<SetStateAction<number>>;
  counterState: number;
}

const HelpMeChooseResult: FC<IHelpMeChooseResult> = props => {
  const router = useRouter();
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
    setLoadingStatus,
    counterState,
    setCounterState,
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

  const resultsData: Edges[] = getSectionsData(
    ['productVehicleList', 'edges'],
    productVehicleListData?.data,
  )
    ?.slice()
    .sort((a: any, b: any) => a.node?.availability - b.node?.availability);
  const capIds: string[] = resultsData?.map(
    el => el.node?.derivativeId || '',
  ) || [''];
  const { data: imageData } = useModelImages(capIds, !capIds.length);

  const [rental, setRental] = useState<number>(
    parseInt(defaultRental, 10) ?? 550,
  );
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

  const onChangeParams = (rentalId: number, initialPeriodValue: string) => {
    setLoadingStatus(true);
    const searchParams = new URLSearchParams(window.location.search);
    const rentalValue = RENTAL_DATA[rentalId - 1].value;
    const newStep = {
      ...steps,
      rental: {
        active: true,
        value: rentalValue as any,
      },
      initialPeriods: {
        active: true,
        value: initialPeriodValue as any,
      },
    };
    setSteps(newStep);
    getProductVehicleList({
      variables: {
        filter: {
          ...buildAnObjectFromAQuery(searchParams, steps),
          rental: {
            max: rentalValue,
          },
          initialPeriods: [+initialPeriodValue],
        },
      },
    });
    onReplace(router, newStep);
  };

  const clickSearchAgain = () => {
    setLoadingStatus(true);
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
          </Text>{' '}
          Vehicles
        </Heading>
        <div className="stepped-form--results">
          {!!resultsData?.length &&
            resultsData.map((el: Edges, id: number) => (
              <div key={`${el.node?.capId || 0 + id}`}>
                <ProductCard
                  className="-compact"
                  inline
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  imageSrc={
                    imageData?.vehicleImages?.find(
                      x =>
                        x?.capId === parseInt(el.node?.derivativeId || '', 10),
                    )?.mainImageUrl ||
                    `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
                  }
                  onCompare={() => {
                    compareChange(
                      formatForCompare(
                        el.node,
                        steps.financeTypes.value as any,
                        imageData?.vehicleImages?.find(
                          x =>
                            x?.capId ===
                            parseInt(el.node?.derivativeId || '', 10),
                        )?.mainImageUrl || '',
                      ),
                    );
                  }}
                  compared={isCompared(
                    compareVehicles,
                    formatForCompare(
                      el.node,
                      steps.financeTypes.value as any,
                      imageData?.vehicleImages?.find(
                        x =>
                          x?.capId ===
                          parseInt(el.node?.derivativeId || '', 10),
                      )?.mainImageUrl || '',
                    ),
                  )}
                  onWishlist={() => true}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        link={{
                          // href: el.legacyUrl || el.url || '',
                          href: '',
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
                        // href: el.legacyUrl || el.url || '',
                        href: '',
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
        {!!vehiclesResultNumber && vehiclesResultNumber > 12 && (
          <div>
            <Button
              color="primary"
              dataTestId="help-me-choose_load-more"
              label="Load More"
              onClick={() => {
                setCounterState(counterState + 1);
                setLoadingStatus(true);
                const searchParams = new URLSearchParams();
                getProductVehicleList({
                  variables: {
                    filter: {
                      ...buildAnObjectFromAQuery(searchParams, steps),
                    },
                    first: 12 * (counterState + 1),
                  },
                });
              }}
              size="large"
              className="stepped-form--button"
              type="button"
              fill="clear"
            />
          </div>
        )}
        <div className="button-group">
          {!!resultsData?.length && (
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
          )}
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
