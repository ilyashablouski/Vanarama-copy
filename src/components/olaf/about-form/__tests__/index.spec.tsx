import * as React from 'react';
import { shallow } from 'enzyme';
import AboutForm from '..';

function selectChange(
  select,
  name: string,
  value: string | number,
  checked: string = '',
) {
  select.props().onChange({
    currentTarget: { name, value, checked },
    preventDefault: () => false,
  });
}

function inputChange(input, name: string, value: string) {
  input.props().onChange({
    currentTarget: { name, value },
    preventDefault: () => false,
  });
}

let spy: jest.SpyInstance;
beforeAll(() => {
  // NOTE: `AboutForm.handleInputChange` is logging and cluttering the test output
  spy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  spy.mockRestore();
});

describe('<AboutForm />', () => {
  let wrapper;
  let form;
  let submit;

  beforeEach(() => {
    submit = jest.fn();
    wrapper = shallow(
      <AboutForm submit={submit} allDropDowns={{}} preloadData={{}} />,
    );
    form = wrapper.find('form');
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Submit Handlers', () => {
    it('should call submit handler', () => {
      form.simulate('submit', { preventDefault() {} });
      expect(submit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Change Handlers', () => {
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

    /*  it('should set dateOfBirth', () => {
      const select = form.find('#aboutSelectDOB').first();
      const day = select.props().options.data[30].value;
      selectChange(select, 'dayOfBirth', day);
      expect(wrapper.state('details').dayOfBirth).toEqual(31);
    });

    it('should set monthOfBirth', () => {
      const select = form.find('#aboutSelectMOB').first();
      const mnth = select.props().options.data[5].value;
      selectChange(select, 'monthOfBirth', mnth);
      expect(wrapper.state('details').monthOfBirth).toEqual('June');
    });

    it('should set yearOfBirth', () => {
      const select = form.find('#aboutSelectYOB').first();
      const thisYear = new Date().getFullYear();
      const year = select.props().options.data.slice(-1)[0].value;
      selectChange(select, 'yearOfBirth', year);
      expect(wrapper.state('details').yearOfBirth).toEqual(thisYear);
    }); */

    it('should set countryOfBirth', () => {
      const select = form.find('#aboutSelectCOB').first();
      selectChange(select, 'countryOfBirth', 'United Kingdom');
      expect(wrapper.state('details').countryOfBirth).toEqual('United Kingdom');
    });

    it('should set nationality', () => {
      const select = form.find('#aboutSelectNationality').first();
      selectChange(select, 'nationality', 'British');
      expect(wrapper.state('details').nationality).toEqual('British');
    });

    it('should set maritalStatus', () => {
      const select = form.find('#aboutSelectMarStatus').first();
      selectChange(select, 'maritalStatus', 'Single');
      expect(wrapper.state('details').maritalStatus).toEqual('Single');
    });

    it('should set dependants', () => {
      const select = form.find('#aboutSelectDependants').first();
      selectChange(select, 'dependants', 1);
      expect(wrapper.state('details').dependants).toEqual(1);
    });

    it('should set adultsInHousehold', () => {
      const select = form.find('#aboutSelectAdultsInHouse').first();
      selectChange(select, 'adultsInHousehold', 1);
      expect(wrapper.state('details').adultsInHousehold).toEqual(1);
    });

    // >>> awaiting uibook component <<<

    /* it('should set termsAndCons', () => {
      const select = form.find('#aboutInputT&C').first();
      selectChange(select, 'termsAndCons', null, "checked");
      expect(wrapper.state('details').termsAndCons).toBe("checked");
    });

    it('should set consent', () => {
      const select = form.find('#aboutInputConsent').first();
      selectChange(select, 'consent', null, "checked");
      expect(wrapper.state('details').consent).toBe("checked");
    }); */
  });
});
