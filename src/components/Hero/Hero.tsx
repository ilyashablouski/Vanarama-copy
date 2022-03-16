import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from 'core/atoms/icon';
import * as toast from 'core/atoms/toast/Toast';
import cx from 'classnames';
import { IHeroProps } from './interface';
import SearchPodContainer from '../../containers/SearchPodContainer';
import { useOpportunityCreation } from '../../containers/GoldrushFormContainer/gql';
import {
  handleNetworkError,
  DEFAULT_POSTCODE,
} from '../../containers/GoldrushFormContainer/GoldrushFormContainer';
import { OpportunityTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';
import HeroCurve from './HeroCurve';
import ErrorMessages from '../../models/enum/ErrorMessages';

const ArrowForward = dynamic(() => import('core/assets/icons/ArrowForward'), {
  ssr: false,
});
const RequestCallBackForm = dynamic(() => import('../RequestCallBackForm'), {
  loading: () => <Skeleton count={5} />,
});
const WorkingHoursTable = dynamic(
  () =>
    import(
      '../../containers/InsurancePageContainer/sections/WorkingHoursTable'
    ),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const Hero: React.FC<IHeroProps> = ({
  children,
  topHeader,
  customCTAColor,
  withRequestCallbackForm,
  workingHoursCard,
  searchPodCarsData,
  searchPodVansData,
  smallPrint,
  customCTALink,
  activeSearchIndex,
  searchType,
  isCustomSearchButtonLabel,
  className,
  dataUiTestId,
  isCurve = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => setShowModal(true),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
      if (error?.message) {
        toast.error(ErrorMessages.requestIssue, error?.message);
      }
    },
  );

  const renderHeroRight = () => {
    if (withRequestCallbackForm) {
      return (
        <RequestCallBackForm
          setShowModal={setShowModal}
          showModal={showModal}
          isSubmitting={loading}
          onSubmit={values => {
            createOpportunity({
              variables: {
                email: values.email,
                phoneNumber: values.phoneNumber,
                fullName: values.fullName,
                companyName: values.companyName,
                fleetSize: +values.fleetSize,
                opportunityType: OpportunityTypeEnum.FLEET,
                communicationsConsent: Boolean(values.consent),
                termsAndConditions: Boolean(values.termsAndCons),
                privacyPolicy: Boolean(values.privacyPolicy),
                postcode: DEFAULT_POSTCODE,
              },
            });
          }}
        />
      );
    }

    if (workingHoursCard) {
      return <WorkingHoursTable {...workingHoursCard} />;
    }

    return (
      <SearchPodContainer
        searchPodCarsData={searchPodCarsData}
        searchPodVansData={searchPodVansData}
        customCTAColor={customCTAColor}
        activeSearchIndex={activeSearchIndex}
        searchType={searchType}
        isCustomSearchButtonLabel={isCustomSearchButtonLabel}
        dataUiTestId={dataUiTestId}
      />
    );
  };

  return (
    <div className={cx('row:bg-hero', className)}>
      {topHeader && <div className="hero--top-header">{topHeader}</div>}
      <div className="row:hero">
        <div className="hero--left">{children}</div>
        <div className="hero--right" style={{ minHeight: '347px' }}>
          {/* NOTE: Some components using dynamic imports are causing issues affecting next sibling CSS classnames
              from rendering as expected. This issue is happening when rehydrating on the client-side */}
          {renderHeroRight()}
        </div>
        {isCurve && (
          <div className="hero--decals">
            <HeroCurve />
          </div>
        )}
      </div>
      {smallPrint || customCTALink ? (
        <div className="nlol-small-print-cta">
          {smallPrint && (
            <div className="nlol-small-print-section">
              <p>{smallPrint}</p>
            </div>
          )}
          {customCTALink && (
            <div className="nlol-cta-section">
              <a href={customCTALink}>
                Find out more{' '}
                <Icon
                  icon={<ArrowForward />}
                  className="-regular md hydrated"
                  name="arrow-forward"
                  color="teal"
                />
              </a>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
