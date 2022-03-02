import React, { useMemo } from 'react';

import Heading from 'core/atoms/heading';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';

import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

import CommonDescriptionContainer from './CommonDescriptionContainer';
import { onMadeLineBreaks } from '../helpers';
import { useDesktopOrTabletViewport } from '../../../hooks/useMediaQuery';
import { Nullish } from '../../../types/common';

interface IProps {
  breadcrumbs: Nullish<CustomJSON>;
  pageTitle: string;
  pageData?: GenericPageQuery;
  partnershipDescription: string;
  isPartnershipActive?: boolean;
  isNewPage?: boolean;
  dataUiTestId?: string;
}

const SearchPageTitle = ({
  breadcrumbs,
  pageTitle,
  pageData,
  partnershipDescription,
  isPartnershipActive,
  isNewPage,
  dataUiTestId,
}: IProps) => {
  const isDesktopOrTablet = useDesktopOrTabletViewport();

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

  const breadcrumbsItems = useMemo(
    () =>
      breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      })),
    [breadcrumbs],
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
