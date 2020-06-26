import { NextPage } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useCarData } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import DetailsPage from '../../../containers/DetailsPage/DetailsPage';

interface IProps {
  query: ParsedUrlQuery;
}

const PickupDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const capId = (router.query.capId as string) ?? '41882';

  const { data, loading, error } = useCarData(
    parseInt(capId, 10),
    VehicleTypeEnum.LCV,
  );

  return (
    <DetailsPage
      capId={41882}
      pickups
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default withApollo(PickupDetailsPage);
