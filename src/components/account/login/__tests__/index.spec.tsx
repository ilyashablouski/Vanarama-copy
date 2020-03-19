import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../index';
import {
  findForm,
  fillInputField,
} from '../../../../services/utils/test-helpers';

const email = 'email';
const password = 'password';

describe('<Login />', () => {
  const login = jest.fn();

  it('renders correctly with authentication', () => {
    const wrapper = mount(<Login login={login} authenticated token="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly without authentication', () => {
    const wrapper = mount(
      <Login login={login} authenticated={false} token="" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('Submit', () => {
    let login;
    let wrapper;

    beforeEach(() => {
      login = jest.fn();
      wrapper = shallow(<Login login={login} authenticated={false} token="" />);
      fillLoginFields(wrapper);
      findForm(wrapper).simulate('submit', { preventDefault() {} });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('it is called once', () => {
      expect(login).toHaveBeenCalledTimes(1);
    });

    it('it is called with correct parameters', () => {
      expect(login).toBeCalledWith(email, password);
    });
  });

  describe('HandleChange', () => {
    let login;
    let wrapper;

    beforeEach(() => {
      login = jest.fn();
      wrapper = shallow(<Login login={login} authenticated={false} token="" />);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('it has correct state [email]', () => {
      fillLoginFields(wrapper);
      expect(wrapper.state(email)).toEqual(email);
    });

    it('it has correct state [password]', () => {
      fillLoginFields(wrapper);
      expect(wrapper.state(password)).toEqual(password);
    });

    it('it has incorrect state [email]', () => {
      expect(wrapper.state('email')).toEqual('');
    });

    it('it has incorrect state [password]', () => {
      expect(wrapper.state('password')).toEqual('');
    });
  });
});

function fillLoginFields(wrapper: any) {
  fillInputField(wrapper, 'loginEmail', { name: email, value: email });
  fillInputField(wrapper, 'loginPassword', { name: password, value: password });
}
