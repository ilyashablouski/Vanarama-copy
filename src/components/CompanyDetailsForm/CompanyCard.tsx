import dynamic from 'next/dynamic';
import React from 'react';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import Skeleton from '../Skeleton';
import { fullMonthFormatDate } from '../../utils/dates';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  company: SearchResult;
}

export default function CompanyCard({ company }: IProps) {
  const tradingSince =
    company.dateOfCreation &&
    fullMonthFormatDate(new Date(company.dateOfCreation));

  return (
    <Card optimisedHost={process.env.IMG_OPTIMISATION_HOST}>
      <Heading tag="span" color="black" size="lead">
        {company.title} - {company.companyNumber}
      </Heading>
      <Text tag="span" size="regular" color="darker">
        {company.addressSnippet}
      </Text>
      {tradingSince && (
        <Text className="-b" tag="span" size="regular" color="black">
          Trading Since: {tradingSince}
        </Text>
      )}
    </Card>
  );
}
