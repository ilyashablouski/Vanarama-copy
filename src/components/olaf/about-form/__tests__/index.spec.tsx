import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import AboutForm from '../AboutForm';

describe('<AboutForm />', () => {
  let wrapper;
  beforeAll(async () => {
    const captchaOlafData = jest.fn();
    const dropDownData = {};
    wrapper = shallow(
      <AboutForm
        details={{}}
        captchaOlafData={captchaOlafData}
        allDropDowns={dropDownData}
      />,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Change Handlers', () => {
    let form;

    beforeEach(() => {
      form = wrapper.find('form');
    });

    it('should select title', () => {
      const select = form.find('#aboutSelectTitle').first();
      selectChange(select, 'title', 'Mr');
      expect(wrapper.state('details').title).toEqual('Mr');
    });

    it('fills firstName input', () => {
      const input = form.find('#aboutInputFirstName').first();
      inputChange(input, 'firstName', 'testName');
      expect(wrapper.state('details').firstName).toEqual('testName');
    });

    it('fills lastName input', () => {
      const input = form.find('#aboutInputLastName').first();
      inputChange(input, 'lastName', 'testName');
      expect(wrapper.state('details').lastName).toEqual('testName');
    });

    it('fills email input', () => {
      const input = form.find('#aboutInputEmail').first();
      inputChange(input, 'email', 'test@email.com');
      expect(wrapper.state('details').email).toEqual('test@email.com');
    });

    it('fills phoneNumber input', () => {
      const input = form.find('#aboutInputPhoneNumber').first();
      inputChange(input, 'mobile', '0121000');
      expect(wrapper.state('details').mobile).toEqual('0121000');
    });

  });
});

function selectChange(select, name: string, value: string) {
  select.props().onChange({
    currentTarget: { name, value },
    preventDefault: () => false,
  });
}

function inputChange(input, name: string, value: string) {
  input.props().handleChange({
    currentTarget: { name, value },
    preventDefault: () => false,
  });
}
