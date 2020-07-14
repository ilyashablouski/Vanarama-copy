import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';
import { VatDetails } from '../../../generated/VatDetails';

interface IProps {
  vatDetails: VatDetails;
  onEdit: () => any;
}

const BusinessSummaryFormVATDetailsSection: FCWithFragments<IProps> = ({
  onEdit,
  vatDetails,
}) => {
  const formattedPercentageData = vatDetails.turnoverPercentageOutsideUk?.reduce((prev, curr) =>
    ({
      percentage: `${parseInt(curr.percentage) + parseInt(prev.percentage)}`,
      country: prev.country.concat('\n', curr.country)
    }),
    {
      percentage: '0',
      country: ''
    });
  return <StructuredList
    editable
    editDataTestId="edit-your-details"
    onEditClicked={onEdit}
    list={[
      {
        label: 'VAT Number',
        value: vatDetails.vatNumber || '',
        dataTestId: 'summary-vat-details',
      }, {
        label: 'Countries You Trade In',
        value: formattedPercentageData && formattedPercentageData.country || '',
        dataTestId: 'summary-vat-countries',
      }, {
        label: 'Percentage Of Company Turnover Outside The UK',
        value: formattedPercentageData && formattedPercentageData.percentage + '%' || '0%',
        dataTestId: 'summary-email-address',
      },
    ]}
    heading="VAT Details"
    headingDataTestId="company_vat_details_heading_data_testId"
    className="-styled-headers"
    headingSize="large"
  />
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
