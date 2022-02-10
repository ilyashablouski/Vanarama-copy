import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import * as toast from 'core/atoms/toast/Toast';
import Router from 'next/router';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
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
import ErrorMessages from '../../models/enum/ErrorMessages';
import { IBreadcrumbLink } from '../../types/breadcrumbs';
import { Nullish } from '../../types/common';

const Modal = dynamic(() => import('core/molecules/modal'));

interface IProps {
  sections: Section | null | undefined;
  breadcrumbsItems: Nullish<IBreadcrumbLink[]>;
}

export const handleNetworkError = () =>
  toast.error(ErrorMessages.requestIssue, '');

const toThankYouPage = () => {
  /*
   *  TODO: van-insurance/ should be replaced with insurance/
   *   in the redirect url when we completely stop using van-insurance pages.
   */
  const asPath = Router.asPath.match(/([\w-]+)(\.html)?$/i)?.[1];
  return Router.push(`/van-insurance/${asPath}/thank-you`);
};

const FinanceGapInsurancePageContainer = ({
  sections,
  breadcrumbsItems,
}: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  const [showModal, setShowModal] = useState(false);

  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => toThankYouPage(),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
    },
  );

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
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      {leadText && <InsuranceTypeSection {...leadText} />}
      {featured1 && (
        <InsuranceFormSection
          {...featured1}
          isSubmitting={loading}
          onSubmit={(values: IGoldrushFromValues) => {
            createOpportunity({
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
            }).then(() =>
              setTimeout(() => {
                pushInsuranceEventDataLayer(Router);
              }, 200),
            );
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
            isCallBackForm={false}
            className="form-insurance"
            isSubmitting={loading}
            isPostcodeVisible
            termsAndConditionsId="modal"
            isTextInVisible
            noTermsAndConditions
            onSubmit={(values: IGoldrushFromValues) => {
              createOpportunity({
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
              }).then(() =>
                setTimeout(() => {
                  pushInsuranceEventDataLayer(Router);
                }, 200),
              );
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
