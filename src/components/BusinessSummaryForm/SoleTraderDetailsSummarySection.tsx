import moment from 'moment';
import dynamic from 'next/dynamic';
import { SummaryFormSoleTrader_associates as SoleTraderAssociate } from '../../../generated/SummaryFormSoleTrader';
import { addressToDisplay } from '../../utils/address';
import { sortAddresses } from './helpers';
import { dateToFormat } from '../../utils/dates';

import Skeleton from '../Skeleton';

const StructuredList = dynamic(() => import('core/organisms/structured-list'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  soleTrader: SoleTraderAssociate | undefined;
  onEdit: () => any;
}

const SoleTraderDetailsSummarySection: React.FC<IProps> = ({
  soleTrader,
  onEdit,
}) => {
  const { currentAddress, previousAddress } = sortAddresses(
    soleTrader?.addresses,
  );
  return (
    <>
      <StructuredList
        editable
        editDataTestId="edit-bank-details"
        onEditClicked={onEdit}
        list={[
          {
            label: 'Title',
            value: soleTrader?.title || '',
            dataTestId: 'summary-soleTrader-title',
          },
          {
            label: 'First Name',
            value: soleTrader?.firstName || '',
            dataTestId: 'summary-soleTrader-first-name',
          },
          {
            label: 'Last Name',
            value: soleTrader?.lastName || '',
            dataTestId: 'summary-soleTrader-last-name',
          },
          {
            label: 'Gender',
            value: soleTrader?.gender || '',
            dataTestId: 'summary-soleTrader-gender',
          },
          {
            label: 'Date Of Birth',
            value: dateToFormat(soleTrader?.dateOfBirth) || '',
            dataTestId: 'summary-soleTrader-last-name',
          },
          {
            label: 'Place Of Birth',
            value: soleTrader?.countryOfBirth || '',
            dataTestId: 'summary-soleTrader-place-of-birth',
          },
          {
            label: 'Marital Status',
            value: soleTrader?.maritalStatus || '',
            dataTestId: 'summary-soleTrader-marital-status',
          },
          {
            label: 'Nationality',
            value: soleTrader?.nationality || '',
            dataTestId: 'summary-soleTrader-nationality',
          },
          {
            label: 'Email Address',
            value:
              (soleTrader?.emailAddresses &&
                soleTrader?.emailAddresses[0].value) ||
              '',
            dataTestId: 'summary-soleTrader-email',
          },
          {
            label: 'Adults Living in Household',
            value: soleTrader?.noOfAdultsInHousehold || '',
            dataTestId: 'summary-soleTrader-adults-in-house',
          },
          {
            label: 'Number of Dependants',
            value: soleTrader?.noOfDependants || '',
            dataTestId: 'summary-soleTrader-dependants',
          },
          {
            label: 'Current Address',
            value: (currentAddress && addressToDisplay(currentAddress)) || '',
            dataTestId: `summary-soleTrader-curr-address`,
          },
          {
            label: 'Date Moved In',
            value:
              (currentAddress &&
                moment(currentAddress.startedOn).format('MMMM YYYY')) ||
              '',
            dataTestId: `summary-soleTrader-curr-moved-in`,
          },
          ...previousAddress,
          {
            label: 'Property Status',
            value: (currentAddress && currentAddress.propertyStatus) || '',
            dataTestId: `summary-soleTrader-prop-status`,
          },
          {
            label: 'Occupation',
            value: soleTrader?.occupation || '',
            dataTestId: 'summary-soleTrader-occupation',
          },
          {
            label: 'Annual Income',
            value: String(soleTrader?.incomeAndExpense?.annualIncome || 'N/A'),
            dataTestId: 'summary-soleTrader-annual-income',
          },
          {
            label: 'Average Monthly Income',
            value: String(
              soleTrader?.incomeAndExpense?.averageMonthlyIncome || 'N/A',
            ),
            dataTestId: 'summary-soleTrader-monthly-income',
          },
          {
            label: 'Monthly Mortgage Payments',
            value: String(
              soleTrader?.incomeAndExpense?.mortgageOrRent || 'N/A',
            ),
            dataTestId: 'summary-soleTrader-monthly-payments',
          },
          {
            label: 'Monthly Student Payments',
            value: String(soleTrader?.incomeAndExpense?.studentLoan || 'N/A'),
            dataTestId: 'summary-soleTrader-student-payments',
          },
          {
            label: 'Future Monthly Income',
            value: String(
              soleTrader?.incomeAndExpense?.futureMonthlyIncome || 'N/A',
            ),
            dataTestId: 'summary-soleTrader-future-income',
          },
        ]}
        heading="Sole Trader Details"
        dataTestId="soleTrader-summary-heading"
        headingSize="large"
        className="-styled-headers"
      />
      <br />
    </>
  );
};

export default SoleTraderDetailsSummarySection;
