import { NextPage } from 'next';
import React, { useEffect } from 'react';
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

const VanDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const capId = parseInt(
    sessionStorage.getItem('capId') ?? (router.query.capId as string) ?? '',
    10,
  );

  const [getCarData, { data, loading, error }] = useCarData(
    capId,
    VehicleTypeEnum.LCV,
  );

  useEffect(() => {
    if (capId) {
      getCarData();
    }
  }, [capId, getCarData]);

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
      vans
      data={data}
      loading={loading}
      error={error}
      router={router}
    />
  );
};

export default withApollo(VanDetailsPage);
