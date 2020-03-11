import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Register from '../index';
import { findForm, fillInputField } from '../../../../services/utils/test-helpers';

const email = "email";
const password = "password";

describe('<Register />', () => {
  const register = jest.fn();

  it('renders correctly with registration', () => {
    const wrapper = mount(<Register register={ register } />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Submit', () => {
    let register;
    let wrapper;

    beforeEach(() => {
      register = jest.fn();
      wrapper = shallow(<Register register={ register } />);
      fillRegisterFields(wrapper);
      findForm(wrapper)
        .simulate('submit', { preventDefault () {} });
    });

    afterEach(() => {
      jest.restoreAllMocks()
    });

    it('it is called once',()=>{
      expect(register).toHaveBeenCalledTimes(1);
    });

    it('it is called with correct parameters',()=>{
      expect(register).toBeCalledWith(email, password)
    });
  });

  describe('HandleChange', () => {
    let register;
    let wrapper;

    beforeEach(() => {
      register = jest.fn();
      wrapper = shallow(<Register register={ register } />);
    });

    afterEach(() => {
      jest.restoreAllMocks()
    });

    it('it has correct state [email]',()=> {
      fillRegisterFields(wrapper);
      expect(wrapper.state(email)).toEqual(email);
    });

    it('it has correct state [password]',()=> {
      fillRegisterFields(wrapper);
      expect(wrapper.state(password)).toEqual(password);
    });

    it('it has incorrect state [email]',()=> {
      expect(wrapper.state('email')).toEqual('');
    });

    it('it has incorrect state [password]',()=> {
      expect(wrapper.state('password')).toEqual('');
    });
  });
});

function fillRegisterFields(wrapper: any) {
    fillInputField(wrapper, 'registerEmail', { name: email, value: email })
    fillInputField(wrapper, 'registerPassword', { name: password, value: password })
}
