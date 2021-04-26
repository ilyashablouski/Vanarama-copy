import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { ICompetitionHeroProps } from './interface';
import SearchPodContainer from '../../containers/SearchPodContainer';
// import RequestCallBackForm from '../RequestCallBackForm';
// import WorkingHoursTable from '../../containers/InsurancePageContainer/sections/WorkingHoursTable';
import { useOpportunityCreation } from '../../containers/GoldrushFormContainer/gql';
import {
  handleNetworkError,
  DEFAULT_POSTCODE,
} from '../../containers/GoldrushFormContainer/GoldrushFormContainer';
import { OpportunityTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';
// import BenefitsSection from 'containers/FleetPageContainer/sections/BenefitsSection';
import BenefitsBar from '../../core/organisms/benefits-bar/BenefitsBar';

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

const CompetitionHero: React.FC<ICompetitionHeroProps> = ({
  children,
  withRequestCallbackForm,
  workingHoursCard,
  searchPodCarsData,
  searchPodVansData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => setShowModal(true),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
      if (error?.message) {
        toast.error(
          'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
          error?.message,
        );
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
      />
    );
  };

  return (
    <div className="row:bg-nlol-competition">
      <div className="row:hero">
        <div className="hero--left">{children}</div>
        <div className="hero--right" style={{ minHeight: '347px' }}>
          {/* NOTE: Some components using dynamic imports are causing issues affecting next sibling CSS classnames 
              from rendering as expected. This issue is happening when rehydrating on the client-side */}
          {renderHeroRight()}
          <BenefitsBar countItems={4} />
        </div>
        <div className="hero--decals">
          <svg
            id="hero--curve"
            className="hero--curve"
            data-name="curve"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 170.2"
          >
            <path
              className="hero--curve-background"
              d="M0,65.16v107H1920V113.35s-271.62,32.89-625.91,42.9C925.77,179.08,394.27,183,0,65.16Z"
              transform="translate(0 -2)"
            />
            <path
              className="hero--curve-foreground"
              d="M0,2V64.75c394.27,117.82,925.77,113.92,1294.09,91.08C874,167.71,337.57,147.42,0,2Z"
              transform="translate(0 -1)"
            />
          </svg>
          <svg
            id="hero--curve-m"
            className="hero--curve-m"
            data-name="curve"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 65.05"
          >
            <path
              className="hero--curve-foreground"
              d="M0,1.81v35c122.83,16.41,249.92,25.7,375,30V47.6C246.33,38.57,119.07,24,0,1.81Z"
              transform="translate(0 -1)"
            />
            <path
              className="hero--curve-background"
              d="M0,66.86H375c-125.08-4.32-252.17-13.61-375-30Z"
              transform="translate(0 -1.81)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompetitionHero;
