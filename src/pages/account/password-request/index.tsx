import * as React from 'react';
import { connect } from 'react-redux';
import PasswordRequest from '../../../components/molecules/account/password-request';
import { passwordRequest } from '../../../redux/account/actions';

interface Props {
  onPasswordRequest: (email: string) => void;
}

export const PasswordRequestPage: React.FC<Props> = ({ onPasswordRequest }) => {

  return <PasswordRequest onPasswordRequest={ onPasswordRequest } />;
};

const mapDispatchToProps = {
  onPasswordRequest: passwordRequest,
};

export default connect(null, mapDispatchToProps)(PasswordRequestPage);
