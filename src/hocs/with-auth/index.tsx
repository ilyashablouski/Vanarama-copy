import React, { Component } from 'react';
import { connect } from 'react-redux';

interface session {
  userAuthenticated: boolean;
}
interface withAuthProps {
  session: session;
}

const withAuth = <P extends object>(PassedComponent: React.ComponentType) => {
  class Auth extends Component<P & withAuthProps> {
    render() {
      return <PassedComponent />;
    }
  }
};

export default connect(state => state)(withAuth);
