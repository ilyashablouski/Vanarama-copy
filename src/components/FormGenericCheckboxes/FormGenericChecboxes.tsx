import { useFormContext } from 'react-hook-form';
import CheckBox from 'core/atoms/checkbox';
import { termsAndCons } from '../../utils/inputValidators';

interface IGenericCheckboxes {
  id: string;
  altLabel?: Boolean;
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
        'I have read and understood the Privacy Policy',
        <a
          key="a-privacy"
          className="link -teal"
          href="/legal/privacy-policy.html"
          target="_blank"
        >
          Privacy Policy
        </a>,
      ]}
      ref={register}
    />
  );
};

export const Consent: React.FC<IGenericCheckboxes> = ({ id, altLabel }) => {
  const { register } = useFormContext();
  return (
    <CheckBox
      id={`consent${id || ''}`}
      dataTestId="aboutConsent"
      name="consent"
      label={
        altLabel
          ? 'Keep me updated on the latest deals & offers.'
          : 'I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions.'
      }
      ref={register}
    />
  );
};
