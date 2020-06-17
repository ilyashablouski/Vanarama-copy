import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import moment from 'moment';
import React from 'react';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';

interface IProps {
  company: SearchResult;
}

export default function CompanyCard({ company }: IProps) {
  const tradingSince =
    company.dateOfCreation &&
    moment(company.dateOfCreation).format('MMMM YYYY');

  return (
    <Card>
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
