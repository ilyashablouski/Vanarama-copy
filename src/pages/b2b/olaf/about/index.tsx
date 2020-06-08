import { gql, useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { NextPage } from 'next';
import React from 'react';
import { GetB2BAboutPageData } from '../../../../../generated/GetB2BAboutPageData';
import BusinessAboutForm from '../../../../components/BusinessAboutForm/BusinessAboutForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

const GET_B2B_ABOUT_PAGE_DATA = gql`
  query GetB2BAboutPageData {
    allDropDowns {
      ...BusinessAboutFormDropDownData
    }
  }
  ${BusinessAboutForm.fragments.dropDownData}
`;

const BusinessAboutPage: NextPage = () => {
  const { data, loading, error } = useQuery<GetB2BAboutPageData>(
    GET_B2B_ABOUT_PAGE_DATA,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <OLAFLayout>
      {data && data.allDropDowns && (
        <BusinessAboutForm dropDownData={data.allDropDowns} />
      )}
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
