import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import CompetitionHeroSection from '../CompetitionLandingPageContainer/sections/CompetitionHeroSection';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import CompetitionTypeSection from './sections/CompetitionTypeSection';
import CompetitionFormSection from './sections/CompetitionFormSection';
import ErrorMessages from '../../models/enum/ErrorMessages';
import { IBreadcrumbLink } from '../../types/breadcrumbs';
import { Nullish } from '../../types/common';

interface IProps {
  sections: Nullish<Section>;
  breadcrumbsItems: Nullish<IBreadcrumbLink[]>;
}

export const handleNetworkError = () =>
  toast.error(ErrorMessages.requestIssue, '');

const CompetitionPageContainer = ({ sections, breadcrumbsItems }: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  return (
    <>
      {hero && <CompetitionHeroSection {...hero} />}
      {breadcrumbsItems && (
        <div className="row:title -mt-200">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      {leadText && <CompetitionTypeSection {...leadText} />}
      {featured1 && <CompetitionFormSection {...featured1} />}
      {rowText && (
        <CompetitionTypeSection
          {...rowText}
          link1={featured1?.link}
          link2={featured2?.link}
        />
      )}
    </>
  );
};

export default CompetitionPageContainer;
