import dynamic from 'next/dynamic';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ComparatorTable from 'core/organisms/comparator-table';
import Router from 'next/router';
import ProductCard from 'core/molecules/cards/ProductCard/ProductCard';
import { CompareContext, INIT_VEHICLE } from '../../utils/comparatorTool';
import {
  getCriterials,
  getVehiclesIds,
} from '../../utils/comparatorTableHelpers';
import { useVehicleData, useVehiclesTotalCount } from './gql';
import { vehicleComparator } from '../../../generated/vehicleComparator';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import useLeaseType from '../../hooks/useLeaseType';

import pickUpImage from '../../../../public/Assets/images/comparator/modal/cap-44067-160978.png';
import vanImage from '../../../../public/Assets/images/comparator/modal/cap-51392-171678.png';
import carImage from '../../../../public/Assets/images/comparator/modal/cap-88928-161019.png';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForward = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

const PICKUP_SEARCH_URL = 'van-leasing/search?bodyStyles=Pickup';
const VAN_SEARCH_URL = '/van-leasing/search';
const CAR_SEARCH_URL = '/car-leasing/search';

const createModalCards = (offersCount: number[]) => [
  {
    header: 'Vans',
    imageSrc: vanImage,
    redirect: VAN_SEARCH_URL,
    totalCount: offersCount[0],
  },
  {
    header: 'Pickups',
    imageSrc: pickUpImage,
    redirect: PICKUP_SEARCH_URL,
    totalCount: offersCount[1],
  },
  {
    header: 'Cars',
    imageSrc: carImage,
    redirect: CAR_SEARCH_URL,
    totalCount: offersCount[2],
  },
];

const ComparatorContainer: React.FC = () => {
  const [vehicles, setVehicles] = useState<
    { capId: number; vehicleType: VehicleTypeEnum | null }[]
  >([]);
  const [isModalVisible, setModalVisibility] = useState(false);
  const { compareVehicles, compareChange } = useContext(CompareContext);
  const { cachedLeaseType } = useLeaseType(null);
  const [getCarsOffers, carsOptions] = useVehiclesTotalCount(
    VehicleTypeEnum.CAR,
  );
  const [getVansOffers, vansOptions] = useVehiclesTotalCount(
    VehicleTypeEnum.LCV,
  );
  const [
    getPickupsOffers,
    pickupsOptions,
  ] = useVehiclesTotalCount(VehicleTypeEnum.LCV, ['Pickup']);

  useEffect(() => {
    if (compareVehicles?.length) {
      setVehicles(getVehiclesIds(compareVehicles));
    }
  }, [compareVehicles]);

  const { data, loading, error, refetch } = useVehicleData(
    vehicles,
    !vehicles.length,
  );

  useEffect(() => {
    if (vehicles.length && compareVehicles?.length) {
      refetch();
    }
  }, [vehicles, compareVehicles, refetch]);

  const vansTotalCount = vansOptions.data?.vehicleList.totalCount || 0;
  const pickupsTotalCount = pickupsOptions.data?.vehicleList.totalCount || 0;
  const carsTotalCount = carsOptions.data?.vehicleList.totalCount || 0;
  const cards = useMemo(
    () => createModalCards([vansTotalCount, pickupsTotalCount, carsTotalCount]),
    [vansTotalCount, pickupsTotalCount, carsTotalCount],
  );

  const handleVehicleAdd = useCallback(() => {
    if ((compareVehicles || []).length > 0) {
      const vehicleToCompare = compareVehicles?.[0];
      if (vehicleToCompare?.vehicleType === VehicleTypeEnum.CAR) {
        Router.push(CAR_SEARCH_URL);
      } else if (
        vehicleToCompare?.vehicleType === VehicleTypeEnum.LCV &&
        vehicleToCompare.bodyStyle === 'Pickup'
      ) {
        Router.push(PICKUP_SEARCH_URL);
      } else {
        Router.push(VAN_SEARCH_URL);
      }
    } else {
      setModalVisibility(true);
      getCarsOffers();
      getVansOffers();
      getPickupsOffers();
    }
  }, [compareVehicles]);

  if (error) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  const viewOffer = (capId: string) => {
    const currentVehicle = compareVehicles?.find(
      compareVehicle => compareVehicle.capId === capId,
    );
    if (currentVehicle && currentVehicle.pageUrl) {
      sessionStorage.setItem('capId', capId);
      Router.push(currentVehicle.pageUrl.href, currentVehicle.pageUrl.url);
    }
  };

  const isLoadingOffers =
    vansOptions.loading || pickupsOptions.loading || carsOptions.loading;

  return (
    <>
      <ComparatorTable
        addVehicle={handleVehicleAdd}
        deleteVehicle={capId => {
          compareChange(null, capId);
        }}
        criterias={getCriterials(
          (data as vehicleComparator) ?? (INIT_VEHICLE as vehicleComparator),
          compareVehicles,
          cachedLeaseType,
        )}
        viewOffer={capId => {
          viewOffer(`${capId}`);
        }}
        isNotEmptyPage={!!data}
      />
      {isModalVisible && (
        <Modal show onRequestClose={() => setModalVisibility(false)}>
          <div className="-pt-000">
            <div
              className="-justify-content-row"
              style={{
                maxWidth: '300px',
                textAlign: 'center',
              }}
            >
              <Heading tag="span" color="black">
                Choose the type of vehicle are you looking for?
              </Heading>
            </div>
            {isLoadingOffers ? (
              <Loading size="large" />
            ) : (
              <div>
                {cards.map(card => (
                  <ProductCard
                    inline
                    className="-compact -mt-400"
                    key={card.header}
                    imageSrc={card.imageSrc}
                    title={{
                      title: '',
                      link: (
                        <Heading tag="span" size="large" className="-pb-100">
                          {card.header}
                        </Heading>
                      ),
                    }}
                  >
                    <div className="-mt-600 -justify-content-row">
                      <Icon icon={<Flame />} color="orange" size="lead" />
                      <Text size="regular" color="orange" className="-m-000">
                        {`${card.totalCount} Hot Offers`}
                      </Text>
                      <Button
                        round
                        color="teal"
                        size="xsmall"
                        icon={<Icon icon={<ArrowForward />} color="white" />}
                        onClick={() => Router.push(card.redirect)}
                      />
                    </div>
                  </ProductCard>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ComparatorContainer;
