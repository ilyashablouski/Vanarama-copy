import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import SearchPodContainer from '../../containers/SearchPodContainer';
import { IHeroProps } from './interface';
// import RequestCallBackForm from '../RequestCallBackForm';
// import WorkingHoursTable from '../../containers/InsurancePageContainer/sections/WorkingHoursTable';
import { useOpportunityCreation } from '../../containers/GoldrushFormContainer/gql';
import {
  handleNetworkError,
  DEFAULT_POSTCODE,
} from '../../containers/GoldrushFormContainer/GoldrushFormContainer';
import { OpportunityTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../Skeleton';

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
  withRequestCallbackForm,
  workingHoursCard,
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
                marketingPreference: Boolean(values.agreement),
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
    return <SearchPodContainer />;
  };

  return (
    <div className="row:bg-hero">
      <div className="row:hero">
        <div className="hero--left">{children}</div>
        <div className="hero--right">{renderHeroRight()}</div>
        <div className="hero--decals">
          {/* <svg
            aria-hidden="true"
            focusable="false"
            className="hero-logomark"
            width="320"
            height="318"
            viewBox="0 0 320 318"
          >
            <defs>
              <clipPath id="clip-Vanarama_Logo">
                <rect width="320" height="318" />
              </clipPath>
            </defs>
            <g
              id="Vanarama_Logo"
              data-name="Vanarama Logo"
              clipPath="url(#clip-Vanarama_Logo)"
            >
              <g
                id="Group_1"
                data-name="Group 1"
                transform="translate(-548.96 -430.411)"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M791.259,591.381a17.785,17.785,0,0,0-17.84-17.729c-.222,0-.426.058-.645.067a17.72,17.72,0,0,0-9.362-32.84h0s-58.89.05-63.18,0c0,0,14.286-38.444,17.34-46.827a64.077,64.077,0,0,0,3.366-12.624c2.018-14.048-4.7-27.255-16.6-33.271-.3.472-49.532,89.221-67.931,120.809l.165-.067c-7.728,13.919-10.778,29.466-8.928,46.881,2.982,28.091,20.387,48.953,47.761,55.979,6.445,1.654,13.126,2.388,19.7,3.545l60.518-.194h0l.72,0h0l.667,0,.007-.08a17.7,17.7,0,0,0,8.4-32.663c.143.006.272.046.416.048l.717,0a17.706,17.706,0,0,0,8.032-33.307A17.726,17.726,0,0,0,791.259,591.381Z"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M724.251,431.411a55.254,55.254,0,0,1,18.839,38.628,124.188,124.188,0,1,1-81.74,4.495c7.328-13.124,23.034-41.338,23.489-42.1C608.592,443.958,549.96,509.924,549.96,589.337c0,87.508,71.2,158.7,158.7,158.7s158.7-71.2,158.7-158.7C867.362,507.088,804.469,439.27,724.251,431.411Z"
                />
              </g>
            </g>
          </svg> */}
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

export default Hero;
