import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ParsedUrlQuery } from 'querystring';
import { useCarData } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import DetailsPage from '../../../containers/DetailsPage/DetailsPage';
import { VEHICLE_CONFIGURATION_BY_URL } from '../../../gql/productCard';
import { VehicleConfigurationByUrl } from '../../../../generated/VehicleConfigurationByUrl';

interface IProps {
  query?: ParsedUrlQuery;
}

const CarDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const [capId, setCapId] = useState(0);

  const [getCarData, { data, loading, error }] = useCarData(
    capId,
    VehicleTypeEnum.CAR,
  );

  const [getConfiguration, { data: configuration }] = useLazyQuery<
    VehicleConfigurationByUrl
  >(VEHICLE_CONFIGURATION_BY_URL, {
    variables: {
      url: router.asPath.replace('/car-leasing', '').slice(0, -1),
    },
    onCompleted: d =>
      setCapId(d.vehicleConfigurationByUrl?.capDerivativeId || 0),
  });

  useEffect(() => {
    if (capId) {
      getCarData();
    } else if (sessionStorage && sessionStorage.getItem('capId')) {
      setCapId(parseInt(sessionStorage.getItem('capId') ?? '', 10));
    } else if (router.asPath !== router.pathname) {
      getConfiguration();
    }
  }, [capId, getCarData, router, configuration, getConfiguration]);

  if (!data) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  return (
    <DetailsPage
      capId={capId}
      cars
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default withApollo(CarDetailsPage);
