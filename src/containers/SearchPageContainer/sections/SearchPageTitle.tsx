import React, { useMemo } from 'react';

import Heading from 'core/atoms/heading';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';

import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

import CommonDescriptionContainer from './CommonDescriptionContainer';
import { IBreadcrumbLink } from '../../../types/breadcrumbs';
import { Nullish } from '../../../types/common';
import { onMadeLineBreaks } from '../helpers';

interface IProps {
  breadcrumbsItems: Nullish<IBreadcrumbLink[]>;
  pageTitle: string;
  pageData?: GenericPageQuery;
  partnershipDescription: string;
  isDesktopOrTablet: boolean;
  isPartnershipActive?: boolean;
  isNewPage?: boolean;
  dataUiTestId?: string;
}

const SearchPageTitle = ({
  breadcrumbsItems,
  pageTitle,
  pageData,
  partnershipDescription,
  isPartnershipActive,
  isDesktopOrTablet,
  isNewPage,
  dataUiTestId,
}: IProps) => {
  const headingText = useMemo(
    () =>
      isDesktopOrTablet
        ? pageTitle
        : onMadeLineBreaks(pageTitle).map(line => (
            <React.Fragment key={line}>
              {line} <br />
            </React.Fragment>
          )),
    [isDesktopOrTablet, pageTitle],
  );

  return (
    <div className="row:title">
      {!isPartnershipActive && <Breadcrumbs items={breadcrumbsItems} />}
      {isNewPage ? null : (
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataUiTestId={`${dataUiTestId}_heading`}
        >
          {headingText}
        </Heading>
      )}
      <CommonDescriptionContainer
        pageData={pageData}
        customDescription={partnershipDescription}
      />
    </div>
  );
};

export default SearchPageTitle;
