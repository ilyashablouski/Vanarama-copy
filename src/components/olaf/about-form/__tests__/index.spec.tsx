import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import AboutForm from '../AboutForm';

describe('<AboutForm />', () => {
  let wrapper;
  beforeAll(() => {
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

    it('should set firstName', () => {
      const input = form.find('#aboutInputFirstName').first();
      inputChange(input, 'firstName', 'testName');
      expect(wrapper.state('details').firstName).toEqual('testName');
    });

    it('should set lastName', () => {
      const input = form.find('#aboutInputLastName').first();
      inputChange(input, 'lastName', 'testName');
      expect(wrapper.state('details').lastName).toEqual('testName');
    });

    it('should set email', () => {
      const input = form.find('#aboutInputEmail').first();
      inputChange(input, 'email', 'test@email.com');
      expect(wrapper.state('details').email).toEqual('test@email.com');
    });

    it('should set phoneNumber', () => {
      const input = form.find('#aboutInputPhoneNumber').first();
      inputChange(input, 'mobile', '0121000');
      expect(wrapper.state('details').mobile).toEqual('0121000');
    });

    it('should set dateOfBirth', () => {
      const select = form.find('#aboutSelectDOB').first();
      const day = select.props().options
      console.log(day)
      selectChange(select, 'dayOfBirth', 31);
      expect(wrapper.state('details').dayOfBirth).toEqual(31);
    });

    it('should set monthOfBirth', () => {
      const select = form.find('#aboutSelectMOB').first();
      selectChange(select, 'monthOfBirth', 'June');
      expect(wrapper.state('details').monthOfBirth).toEqual('June');
    });

    

  });
});

function selectChange(select, name: string, value: string | number) {
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
