import StructuredList from 'core/organisms/structured-list';
import { IList } from 'core/organisms/structured-list/interfaces';
import { gql } from '@apollo/client';
import React, { useMemo } from 'react';
import { SummaryFormEmploymentHistoryEmployment } from '../../../generated/SummaryFormEmploymentHistoryEmployment';
import { addressToDisplay } from '../../utils/address';
import FCWithFragments from '../../utils/FCWithFragments';
import { toCurrencyDisplay } from '../../utils/helpers';
import { defaultFormatDate } from '../../utils/dates';

interface IProps {
  employments: SummaryFormEmploymentHistoryEmployment[];
  onEdit: () => any;
}

const SummaryFormEmploymentHistory: FCWithFragments<IProps> = ({
  employments,
  onEdit,
}) => {
  const items = useMemo(() => reduceToItems(employments), [employments]);
  return (
    <StructuredList
      editable
      editDataTestId="edit-employment-history"
      onEditClicked={onEdit}
      list={items}
      heading="Employment History"
      headingDataTestId="your_employment_heading_data_testId"
    />
  );
};

function reduceToItems(employments: SummaryFormEmploymentHistoryEmployment[]) {
  return [...employments]
    .sort(
      (firstDate, secondDate) =>
        new Date(secondDate.employedSinceDate ?? '').getTime() -
        new Date(firstDate.employedSinceDate ?? '').getTime(),
    )
    .reduce((acc, employment, index) => {
      const values: IList[] = [
        {
          label: 'Employment Status',
          value: employment.employmentStatus || '',
          dataTestId: `summary-employment[${index}].status`,
        },
      ];

      if (
        employment.employmentStatus === 'Employed' ||
        employment.employmentStatus === 'Self employed'
      ) {
        values.push(
          {
            label: 'Job Title',
            value: employment.jobTitle || '',
            dataTestId: `summary-employment[${index}].title`,
          },
          {
            label: 'Company Name',
            value: employment.companyName || '',
            dataTestId: `summary-employment[${index}].company`,
          },
          {
            label: 'Work Phone',
            value: employment.workPhoneNumber || '',
            dataTestId: `summary-employment[${index}].phone`,
          },
          {
            label: 'Company Address',
            value: addressToDisplay({
              city: employment.companyAddressCity,
              lineOne: employment.companyAddressLineOne,
              lineTwo: employment.companyAddressLineTwo,
              postcode: employment.companyAddressPostcode,
            }),
            dataTestId: `summary-employment[${index}].address`,
          },
          {
            label: 'Gross Annual Income',
            value: toCurrencyDisplay(employment.grossAnnualIncome || 0),
            dataTestId: `summary-employment[${index}].income`,
          },
        );
      }

      return [
        ...acc,
        ...values,
        {
          label: 'Since',
          value: employment.employedSinceDate
            ? defaultFormatDate(new Date(employment.employedSinceDate), '/')
            : '',
          dataTestId: `summary-employment[${index}].since`,
        },
      ];
    }, [] as IList[]);
}

SummaryFormEmploymentHistory.fragments = {
  employments: gql`
    fragment SummaryFormEmploymentHistoryEmployment on EmploymentHistoryType {
      __typename
      uuid
      employmentStatus
      jobTitle
      companyAddressCity
      companyAddressLineOne
      companyAddressLineTwo
      companyAddressPostcode
      companyName
      workPhoneNumber
      grossAnnualIncome
      employedSinceDate
    }
  `,
};

export default SummaryFormEmploymentHistory;
