import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import SlidingInput from 'core/atoms/sliding-input';
import Heading from 'core/atoms/heading';
import Text from 'core/atoms/text';
import Choiceboxes from 'core/atoms/choiceboxes';
import Price from 'core/atoms/price';
import Button from 'core/atoms/button';
import ProductCard from 'core/molecules/cards/ProductCard/ProductCard';
import { useImperativeQuery } from '../../../hooks/useImperativeQuery';
import { HELP_ME_CHOOSE } from '../../../gql/help-me-choose';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
import {
  buildAnObjectFromAQuery,
  formatForCompare,
  formatForWishlist,
  getMainImageUrl,
  onReplace,
  setQuery,
} from '../helpers';
import truncateString from '../../../utils/truncateString';
import { useModelImages } from '../../SearchPageContainer/gql';
import { CompareContext } from '../../../utils/comparatorTool';
import { isWished } from '../../../utils/wishlistHelpers';
import { isCompared } from '../../../utils/comparatorHelpers';
import useWishlist from '../../../hooks/useWishlist';
import RouterLink from '../../../components/RouterLink/RouterLink';
import { HelpMeChoose_helpMeChoose_vehicles as Vehicles } from '../../../../generated/HelpMeChoose';

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

const RENTAL_DATA = [
  {
    value: 1,
    label: '£0',
  },
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
    label: '£550',
  },
  {
    value: 0,
    label: '£550+',
  },
];

export const AVAILABILITY_LABELS = {
  '0': 'Factory Order',
  '7': '7-10 Day Delivery',
  '14': '10-14 Day Delivery',
  '21': '14-21 Day Delivery',
  '28': '4-6 Week Delivery',
  '45': '6-8 Week Delivery',
  '80': '8-12 Week Delivery',
  '90': '12-16 Week Delivery',
  '95': '16-20 Week Delivery',
  '97': 'Over 20 Week Delivery',
  '100': 'Call For Availability',
} as { [key: string]: string };

interface IHelpMeChooseResult extends HelpMeChooseStep {
  setCounterState: Dispatch<SetStateAction<number>>;
  counterState: number;
  resultsData: Vehicles[];
  setResultsData: Dispatch<SetStateAction<Vehicles[]>>;
  setPageOffset: Dispatch<SetStateAction<number>>;
  dataUiTestId: string;
}

const HelpMeChooseResult: FC<IHelpMeChooseResult> = props => {
  const router = useRouter();
  const { wishlistVehicleIds, wishlistChange } = useWishlist();
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const {
    steps,
    helpMeChooseData,
    setLoadingStatus,
    counterState,
    setCounterState,
    resultsData,
    setResultsData,
    setPageOffset,
    dataUiTestId,
  } = props;
  const getProducts = useImperativeQuery(HELP_ME_CHOOSE);

  useEffect(() => {
    const resultsDataArray: Vehicles[] = getSectionsData(
      ['helpMeChoose', 'vehicles'],
      helpMeChooseData?.data,
    );
    setResultsData(resultsDataArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpMeChooseData]);

  const stateVAT =
    (steps?.financeTypes?.value[0] as any) === 'PCH' ? 'inc' : 'exc';
  const rentalData: [{ key: string }] = getSectionsData(
    ['helpMeChoose', 'aggregation', 'rental'],
    helpMeChooseData?.data,
  );
  const minRental = rentalData?.length
    ? rentalData?.reduce((prev, curr) =>
        parseFloat(prev.key) < parseFloat(curr.key) ? prev : curr,
      )
    : { key: router.query.rental as string };
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
    ['helpMeChoose', 'aggregation', 'totalVehicles'],
    helpMeChooseData?.data,
  );

  const capIds: string[] = resultsData?.map(el => el.derivativeId || '') || [
    '',
  ];
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
    const rentalValue = RENTAL_DATA[rentalId - 1].value;
    const query = {
      rental: rentalValue,
      initialPeriods: initialPeriodValue,
    };
    setQuery(router, query);
  };

  const clickSearchAgain = () => {
    setLoadingStatus(true);
    router.push({
      pathname: router.route,
      query: {},
    });
  };

  const loadMoreResults = () => {
    setCounterState(counterState + 1);
    getProducts({
      ...buildAnObjectFromAQuery(steps, {
        size: 12 * counterState,
      }),
    }).then(result =>
      setResultsData(prevState => [
        ...prevState,
        ...result.data?.helpMeChoose.vehicles,
      ]),
    );
    setPageOffset(window.pageYOffset);
  };

  return (
    <>
      <div className="row:stepped-form">
        <div className="stepped-form--filter">
          <Heading
            tag="span"
            size="regular"
            color="black"
            dataUiTestId={`${dataUiTestId}-heading`}
          >
            Monthly Budget:
            <Text
              color="orange"
              className="-b -ml-100"
              dataUiTestId={`${dataUiTestId}-text`}
            >
              {rental === 0
                ? `Above £550 PM ${stateVAT}.VAT`
                : `Up To £${rental} PM ${stateVAT}.VAT`}
            </Text>
          </Heading>
          <SlidingInput
            steps={RENTAL_DATA}
            defaultValue={RENTAL_DATA.findIndex(el => el.value === rental) + 1}
            onChange={(value: number) => {
              setRental(RENTAL_DATA[value - 1].value);
              onChangeParams(value, initialPeriods);
            }}
            disabledFirstStep
          />
        </div>
        <Heading
          tag="span"
          size="regular"
          color="black"
          dataUiTestId={`${dataUiTestId}-heading-payment`}
        >
          Initial Payment - No. Of Months
        </Heading>
        <Choiceboxes
          className="-cols-5 stepped-form--choiceboxes"
          choices={INITIAL_PERIODS_DATA}
          shouldSelectTheOnlyValue
          onSubmit={el => {
            setInitialPeriods(el.value || '');
            onChangeParams(
              RENTAL_DATA.findIndex(rentItem => rentItem.value === rental) + 1,
              el.value || '',
            );
          }}
          dataUiTestId={`${dataUiTestId}-choiceboxes`}
        />
        <Heading
          tag="h1"
          color="black"
          size="xlarge"
          className="stepped-form--title -mb-100"
          dataUiTestId={`${dataUiTestId}-heading-vehicles`}
        >
          {`We've Found `}
          <Text
            tag="span"
            size="xlarge"
            color="orange"
            className="-b -mh-100"
            dataUiTestId={`${dataUiTestId}-text`}
          >
            {vehiclesResultNumber}
          </Text>{' '}
          Vehicles
        </Heading>
        <div className="stepped-form--results">
          {!!resultsData?.length &&
            resultsData?.slice().map((el: Vehicles, id: number) => {
              const mainImageUrl = getMainImageUrl(imageData, el.derivativeId);

              const formattedCompareProductData = formatForCompare(
                el,
                steps.financeTypes.value as any,
                mainImageUrl,
              );
              const formattedWishlistProductData = formatForWishlist(
                el,
                steps.financeTypes.value as any,
                mainImageUrl,
              );

              return (
                <div key={`${el.derivativeId || 0 + id}`}>
                  <ProductCard
                    header={
                      el.onOffer && el.availability
                        ? {
                            text: AVAILABILITY_LABELS[el.availability],
                            accentIcon: <Icon icon={<Flame />} color="white" />,
                            accentText: el.onOffer ? 'Hot Offer' : '',
                          }
                        : undefined
                    }
                    className="-compact helper"
                    inline
                    imageSrc={mainImageUrl}
                    wished={isWished(
                      wishlistVehicleIds,
                      formattedWishlistProductData,
                    )}
                    compared={isCompared(
                      compareVehicles,
                      formattedCompareProductData,
                    )}
                    onCompare={() => {
                      compareChange(formattedCompareProductData);
                    }}
                    onWishlist={() => {
                      wishlistChange(formattedWishlistProductData);
                    }}
                    title={{
                      title: '',
                      link: (
                        <RouterLink
                          link={{
                            href: el.lqUrl
                              ? `${el.lqUrl}?leaseType=${
                                  steps.financeTypes.value
                                }&mileage=${steps.mileages.value[0] ||
                                  el.mileage}&term=${steps.terms.value[0] ||
                                  el.term}&upfront=${initialPeriods}`
                              : el.url || '',
                            label: '',
                            query: {
                              leaseType: steps.financeTypes.value,
                              mileage: steps.mileages.value[0] || el.mileage,
                              term: steps.terms.value[0] || el.term,
                              upfront: initialPeriods,
                            },
                          }}
                          className="heading"
                          classNames={{ size: 'large', color: 'black' }}
                          dataUiTestId={`${dataUiTestId}-router-link`}
                        >
                          <Heading
                            tag="span"
                            size="large"
                            className="-pb-100"
                            dataUiTestId={`${dataUiTestId}-heading-manufacturer`}
                          >
                            {truncateString(
                              `${el.manufacturerName} ${el.modelName}`,
                            )}
                          </Heading>
                          <Heading
                            tag="span"
                            size="small"
                            color="dark"
                            dataUiTestId={`${dataUiTestId}-heading-derivative`}
                          >
                            {el.derivativeName || ''}
                          </Heading>
                        </RouterLink>
                      ),
                    }}
                  >
                    <div className="-flex-h">
                      <Price
                        price={el.rental}
                        size="large"
                        separator="."
                        priceDescription={`Per Month ${
                          (steps.financeTypes.value[0] as any) === 'PCH'
                            ? 'Inc.VAT'
                            : 'Exc.VAT'
                        }`}
                        dataUiTestId={`${dataUiTestId}-price`}
                      />
                      <RouterLink
                        link={{
                          href: el.lqUrl
                            ? `${el.lqUrl}?leaseType=${
                                steps.financeTypes.value
                              }&mileage=${steps.mileages.value[0] ||
                                el.mileage}&term=${steps.terms.value[0] ||
                                el.term}&upfront=${initialPeriods}`
                            : el.url || '',
                          label: 'View Offer',
                          query: {
                            leaseType: steps.financeTypes.value,
                            mileage: steps.mileages.value[0] || el.mileage,
                            term: steps.terms.value[0] || el.term,
                            upfront: initialPeriods,
                          },
                        }}
                        classNames={{
                          color: 'teal',
                          solid: true,
                          size: 'regular',
                        }}
                        className="button"
                        dataTestId="view-offer"
                        dataUiTestId={`${dataUiTestId}-router-link-view`}
                      >
                        <div className="button--inner">View Offer</div>
                      </RouterLink>
                    </div>
                  </ProductCard>
                </div>
              );
            })}
        </div>
        <div className="button-group">
          {!!vehiclesResultNumber &&
            vehiclesResultNumber > 12 &&
            !!resultsData?.length &&
            resultsData?.length < vehiclesResultNumber && (
              <div>
                <Button
                  color="primary"
                  dataTestId="help-me-choose_load-more"
                  label="Load More"
                  onClick={loadMoreResults}
                  size="large"
                  className="stepped-form--button"
                  type="button"
                  fill="clear"
                  dataUiTestId={`${dataUiTestId}-load-more`}
                />
              </div>
            )}
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
                    title: 'Result',
                  },
                },
                '/car-leasing/search',
              );
            }}
            size="large"
            className="stepped-form--button"
            type="button"
            dataUiTestId={`${dataUiTestId}-view-all`}
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
            dataUiTestId={`${dataUiTestId}-search-again`}
          />
        </div>
      </div>
    </>
  );
};

export default HelpMeChooseResult;
