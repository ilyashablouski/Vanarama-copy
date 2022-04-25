import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import React, { useMemo } from 'react';
import { IListItemProps } from 'core/organisms/structured-list/interfaces';
import FCWithFragments from '../../utils/FCWithFragments';
import { VatDetails } from '../../../generated/VatDetails';

import Skeleton from '../Skeleton';

const StructuredList = dynamic(() => import('core/organisms/structured-list'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  vatDetails: VatDetails;
  onEdit: () => any;
}

const BusinessSummaryFormVATDetailsSection: FCWithFragments<IProps> = ({
  onEdit,
  vatDetails,
}) => {
  const formattedPercentageData = useMemo(
    () =>
      vatDetails.turnoverPercentageOutsideUk?.reduce(
        (prev, curr, index) => ({
          percentage: `${parseInt(curr.percentage, 10) +
            parseInt(prev.percentage, 10)}`,
          // line break is ignored so using comma
          country:
            index > 0 ? prev.country.concat(', ', curr.country) : curr.country,
        }),
        {
          percentage: '0',
          country: '',
        },
      ),
    [vatDetails.turnoverPercentageOutsideUk],
  );

  const list: IListItemProps[] = [
    {
      label: 'VAT Number',
      value: vatDetails.vatNumber || '',
      dataTestId: 'summary-vat-details',
    },

    {
      label: 'Countries You Trade In',
      value:
        (formattedPercentageData &&
          formattedPercentageData.country.split(',')) ||
        '',
      dataTestId: 'summary-vat-countries',
    },
    {
      label: 'Percentage Of Company Turnover Outside The UK',
      value:
        (formattedPercentageData && `${formattedPercentageData.percentage}%`) ||
        '0%',
      dataTestId: 'summary-turnover-percentage',
    },
  ];

  return (
    <StructuredList
      editable
      editDataTestId="edit-vat-details"
      onEditClicked={onEdit}
      list={list}
      heading="VAT Details"
      headingDataTestId="company_vat_details_heading_data_testId"
      headingSize="large"
      className="-styled-headers"
    />
  );
};

BusinessSummaryFormVATDetailsSection.fragments = {
  vatDetails: gql`
    fragment VatDetails on CompanyType {
      uuid
      isVatRegistered
      tradesOutsideUk
      turnoverPercentageOutsideUk {
        country
        percentage
      }
      vatNumber
    }
  `,
};

export default BusinessSummaryFormVATDetailsSection;
