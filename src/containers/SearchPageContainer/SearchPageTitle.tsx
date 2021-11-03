import React from 'react';

import Heading from 'core/atoms/heading';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';

import { GenericPageQuery } from '../../../generated/GenericPageQuery';

import CommonDescriptionContainer from './CommonDescriptionContainer';

interface IProps {
  breadcrumbsItems: any;
  pageTitle: string;
  titleWithBreaks: string[];
  pageData?: GenericPageQuery;
  partnershipDescription: string;
  isDesktopOrTablet: boolean;
  isPartnershipActive: boolean;
  isNewPage: boolean;
}

const SearchPageTitle = ({
  breadcrumbsItems,
  pageTitle,
  titleWithBreaks,
  pageData,
  partnershipDescription,
  isPartnershipActive,
  isDesktopOrTablet,
  isNewPage,
}: IProps) => (
  <div className="row:title">
    {!isPartnershipActive && <Breadcrumbs items={breadcrumbsItems} />}
    {isNewPage ? null : (
      <Heading tag="h1" size="xlarge" color="black">
        {isDesktopOrTablet
          ? pageTitle
          : titleWithBreaks.map((line, index) => (
              <React.Fragment key={String(index)}>
                {line} <br />
              </React.Fragment>
            ))}
      </Heading>
    )}
    <CommonDescriptionContainer
      pageData={pageData}
      customDescription={partnershipDescription}
    />
  </div>
);

export default SearchPageTitle;
