import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as toast from 'core/atoms/toast/Toast';
import Router from 'next/router';
import GoldrushForm from '../../components/GoldrushForm/GoldrushForm';
import { IGoldrushFromValues } from '../../components/GoldrushForm/interfaces';
import InsuranceHeroSection from '../InsurancePageContainer/sections/InsuranceHeroSection';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import InsuranceTypeSection from './sections/InsuranceTypeSection';
import InsuranceFormSection from './sections/InsuranceFormSection';
import { useOpportunityCreation } from '../GoldrushFormContainer/gql';
import {
  OpportunitySubtypeEnum,
  OpportunityTypeEnum,
} from '../../../generated/globalTypes';
import { pushInsuranceEventDataLayer } from '../../utils/dataLayerHelpers';
import Skeleton from '../../components/Skeleton';

const Modal = dynamic(() => import('core/molecules/modal'));
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  sections: Section | null | undefined;
  breadcrumbsData: any;
}

export const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    '',
  );

const toThankYouPage = () => {
  Router.push(`multi-year-insurance/thank-you`);
};

const FinanceGapInsurancePageContainer = ({
  sections,
  breadcrumbsData,
}: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  const [showModal, setShowModal] = useState(false);

  const [createOppurtunity, { loading }] = useOpportunityCreation(
    () => toThankYouPage(),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
    },
  );

  const breadcrumbsItems = breadcrumbsData?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  const getOpportunitySubtype = () => {
    switch (Router.asPath) {
      case 'insurance/short-term-insurance':
      case '/van-insurance/short-term-insurance.html':
        return OpportunitySubtypeEnum.SHORTTERM;
      case 'insurance/tools-in-transit':
      case '/van-insurance/tools-in-transit.html':
        return OpportunitySubtypeEnum.TOOLSINTRANSIT;
      case 'insurance/finance-gap-insurance':
      case '/van-insurance/finance-gap-insurance.html':
        return OpportunitySubtypeEnum.GAPINSURANCE;
      case 'insurance/multi-year-insurance':
      case '/van-insurance/multi-year-van-insurance.html':
        return OpportunitySubtypeEnum.MULTIYEAR;
      default:
        return null;
    }
  };

  return (
    <>
      {hero && <InsuranceHeroSection {...hero} />}
      {breadcrumbsItems && (
        <div className="row:title -mt-200">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      {leadText && <InsuranceTypeSection {...leadText} />}
      {featured1 && (
        <InsuranceFormSection
          {...featured1}
          isSubmitting={loading}
          onSubmit={(values: IGoldrushFromValues) => {
            pushInsuranceEventDataLayer(Router);
            createOppurtunity({
              variables: {
                email: values.email,
                phoneNumber: values.phoneNumber,
                fullName: values.fullName,
                postcode: values.postcode,
                opportunityType: OpportunityTypeEnum.INSURANCE,
                termsAndConditions: Boolean(values.termsAndCons),
                privacyPolicy: Boolean(values.privacyPolicy),
                communicationsConsent: Boolean(values.consent),
                opportunitySubtype: getOpportunitySubtype(),
              },
            });
          }}
        />
      )}
      {showModal && (
        <Modal
          className="-mt-000 callBack"
          show
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <GoldrushForm
            callBack={false}
            className="form-insurance"
            isSubmitting={loading}
            isPostcodeVisible
            termsAndConditionsId="modal"
            isTextInVisible
            noTermsAndConditions
            onSubmit={(values: IGoldrushFromValues) => {
              pushInsuranceEventDataLayer(Router);
              createOppurtunity({
                variables: {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  fullName: values.fullName,
                  postcode: values.postcode,
                  opportunityType: OpportunityTypeEnum.INSURANCE,
                  termsAndConditions: Boolean(values.termsAndCons),
                  privacyPolicy: Boolean(values.privacyPolicy),
                  communicationsConsent: Boolean(values.consent),
                  opportunitySubtype: getOpportunitySubtype(),
                },
              });
            }}
          />
        </Modal>
      )}
      <hr className="-fullwidth" />
      {rowText && (
        <InsuranceTypeSection
          showModal={() => setShowModal(true)}
          {...rowText}
          link1={featured1?.link}
          link2={featured2?.link}
        />
      )}
    </>
  );
};

export default FinanceGapInsurancePageContainer;
