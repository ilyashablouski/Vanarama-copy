import { useFormContext } from 'react-hook-form';
import CheckBox from 'core/atoms/checkbox';
import { termsAndCons, privacyPolicy } from '../../utils/inputValidators';

interface IGenericCheckboxes {
  id: string;
}

export const TermsAndConditions: React.FC<IGenericCheckboxes> = ({ id }) => {
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
          href="/legal/terms-and-conditions.html"
          target="_blank"
        >
          Terms and Conditions
        </a>,
      ]}
      ref={register(termsAndCons)}
    />
  );
};

export const PrivacyPolicy: React.FC<IGenericCheckboxes> = ({ id }) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`privacy${id || ''}`}
      dataTestId="aboutPrivacyPolicy"
      name="privacyPolicy"
      label={[
        'I have read and understood the ',
        <a
          key="a-privacy"
          className="link -teal"
          href="/legal/privacy-policy.html"
          target="_blank"
        >
          Privacy Policy
        </a>,
      ]}
      ref={register(privacyPolicy)}
    />
  );
};

export const Consent: React.FC<IGenericCheckboxes> = ({ id }) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`consent${id || ''}`}
      dataTestId="aboutConsent"
      name="consent"
      label="Keep me updated on the latest deals & offers"
      ref={register}
    />
  );
};
