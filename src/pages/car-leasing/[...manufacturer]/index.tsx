import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ParsedUrlQuery } from 'querystring';
import { useCarData } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import DetailsPage from '../../../containers/DetailsPage/DetailsPage';

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

  useEffect(() => {
    if (capId) {
      getCarData();
    } else if (sessionStorage) {
      setCapId(
        parseInt(
          sessionStorage.getItem('capId') ??
            (router.query.capId as string) ??
            '',
          10,
        ),
      );
    }
  }, [capId, getCarData, router.query.capId]);

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
