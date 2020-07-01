import { NextPage } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useCarData } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import DetailsPage from '../../../containers/DetailsPage/DetailsPage';
import { CAR_CAP_ID } from '../../../models/enum/CarDataCapId';

interface IProps {
  query: ParsedUrlQuery;
}

const CarDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const capId = parseInt((router.query.capId as string) ?? CAR_CAP_ID, 10);

  const { data, loading, error } = useCarData(capId, VehicleTypeEnum.CAR);

  return (
    <DetailsPage
      capId={capId}
      cars
      data={data}
      loading={loading}
      error={error}
      router={router}
    />
  );
};

export default withApollo(CarDetailsPage);
