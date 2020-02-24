import * as React from 'react';
import { connect } from 'react-redux';
import PasswordReset from '../../../components/molecules/account/password-reset';
import { passwordReset } from '../../../redux/actions/account/actions';

interface Props {
  onPasswordReset: (verificationCode: string, password: string) => void;
}

export const PasswordResetPage: React.FC<Props> = ({ onPasswordReset }) => {

  return <PasswordReset onPasswordReset={ onPasswordReset } />;
};

const mapDispatchToProps = {
  onPasswordReset: passwordReset,
};

export default connect(null, mapDispatchToProps)(PasswordResetPage);
