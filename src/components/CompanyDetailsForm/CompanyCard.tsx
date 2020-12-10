import dynamic from 'next/dynamic';
import moment from 'moment';
import React from 'react';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import Skeleton from '../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface IProps {
  company: SearchResult;
}

export default function CompanyCard({ company }: IProps) {
  const tradingSince =
    company.dateOfCreation &&
    moment(company.dateOfCreation).format('MMMM YYYY');

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
