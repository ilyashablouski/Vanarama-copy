import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';
import { VatDetails } from '../../../generated/VatDetails';

import { CompanyAssociate } from '../../../generated/CompanyAssociate';
import DirectorDetailsForm from 'components/DirectorDetailsForm/DirectorDetailsForm';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import BusinessSummaryFormDirectorDetailsItem from './BusinessSummaryFormDirectorDetailsItem';

interface IBusinessSummaryFormDirectorDetailsSectionProps {
  directors: CompanyAssociate[];
  onEdit: () => any;
}

const BusinessSummaryFormDirectorDetailsSection = (props: IBusinessSummaryFormDirectorDetailsSectionProps) => {

  return <section>
    <Heading color="black" size="large" dataTestId="directors-section-heading" className="olaf--summary-title">
      Director Details
      </Heading>
    <hr />
    {props.directors.map(d => <BusinessSummaryFormDirectorDetailsItem
      director={d}
      onEdit={props.onEdit}
      key={d.uuid || d.firstName + d.lastName}
    />)}
  </section>
};

export default BusinessSummaryFormDirectorDetailsSection;
