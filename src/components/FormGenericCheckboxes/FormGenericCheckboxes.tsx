import React from 'react';
import { useFormContext } from 'react-hook-form';
import CheckBox from 'core/atoms/checkbox';
import { termsAndCons, privacyPolicy } from '../../utils/inputValidators';
import RouterLink from '../RouterLink';

interface IGenericCheckboxes {
  id: string;
  dataUiTestId?: string;
}

export const TermsAndConditions: React.FC<IGenericCheckboxes> = ({
  id,
  dataUiTestId,
}) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`termsAndCons${id || ''}`}
      dataTestId="aboutTermsAndCons"
      name="termsAndCons"
      label={[
        'I agree to the ',
        <a
          key="a"
          className="link -teal"
          href="/legal/terms-and-conditions"
          target="_blank"
          data-uitestid={
            dataUiTestId
              ? `${dataUiTestId}_terms-and-conditions_link`
              : undefined
          }
        >
          Terms and Conditions
        </a>,
      ]}
      ref={register(termsAndCons)}
      dataUiTestId={dataUiTestId}
    />
  );
};

export const PrivacyPolicy: React.FC<IGenericCheckboxes> = ({
  id,
  dataUiTestId,
}) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`privacyPolicy${id || ''}`}
      dataTestId="aboutPrivacyPolicy"
      name="privacyPolicy"
      label={[
        'I have read and understood the ',
        <RouterLink
          key={id || ''}
          link={{
            href: '/legal/privacy-policy',
            label: 'Privacy Policy',
            target: '_blank',
          }}
          classNames={{ color: 'teal' }}
          dataUiTestId={
            dataUiTestId ? `${dataUiTestId}_privacy-policy_link` : undefined
          }
        />,
      ]}
      ref={register(privacyPolicy)}
      dataUiTestId={dataUiTestId}
    />
  );
};

export const Consent: React.FC<IGenericCheckboxes> = ({ id, dataUiTestId }) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`consent${id || ''}`}
      dataTestId="aboutConsent"
      name="consent"
      label="Keep me updated on the latest deals & offers"
      ref={register}
      dataUiTestId={dataUiTestId}
    />
  );
};
