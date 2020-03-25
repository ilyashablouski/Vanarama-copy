import Heading from '@vanarama/uibook/src/components/atoms/heading';
import Tabs from '@vanarama/uibook/src/components/molecules/tabs';
import { connect } from 'react-redux';
import Login from '../../../components/account/login';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';
import { login } from '../../../services/redux/account/login/actions';
import { RootState } from '../../../services/redux/rootState';

interface IProps {
  authenticated: boolean;
  token: string;
  login: (email: string, password: string) => void;
}

export const IndexPage: React.FC<IProps> = ({
  login: loginUser,
  authenticated,
  token,
}) => {
  return (
    <section style={{ padding: '4rem 0' }}>
      <Heading size="xlarge">Login / Register</Heading>
      <Tabs active={0} tabs={['Login', 'Register']}>
        <section>
          <Login
            login={loginUser}
            authenticated={authenticated}
            token={token}
          />
        </section>
        <section>
          <RegisterForm />
        </section>
      </Tabs>
    </section>
  );
};

const mapStateToProps = ({ auth: { authenticated, data } }: RootState) => ({
  authenticated,
  token: data && data.token,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
