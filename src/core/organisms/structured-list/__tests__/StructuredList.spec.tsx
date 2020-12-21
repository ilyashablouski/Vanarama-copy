import React from 'react';
import { mount, shallow } from 'enzyme';
import StructuredList from '../StructuredList';
import ListItem from '../ListItem';
import { IStructuredListProps } from '../interfaces';
import { editableList, defaultList as list } from '../__fixtures__';
import TextInput from '../../../atoms/textinput';

const getComponent = (props: IStructuredListProps) => (
  <StructuredList {...props} />
);

describe('<StructuredList />', () => {
  it('should render with required props', () => {
    const wrap = shallow(getComponent({ list }));

    expect(wrap).toMatchSnapshot();
  });

  it('should render correctly with a custom CSS class', () => {
    const wrap = shallow(getComponent({ list, className: 'custom-class' }));

    expect(wrap).toMatchSnapshot();
  });

  it('should contain `<Link/>` with expected props/vals', () => {
    const wrap = shallow(
      getComponent({ list: editableList, editable: true }),
    ).find('.structured-list--edit');

    expect(wrap.find('Link').length).toEqual(1);
    expect(wrap.find('Link').text()).toEqual('Edit');
    expect(
      wrap
        .find('Link')
        .at(0)
        .props().onClick,
    ).toEqual(expect.any(Function));
  });

  it('should contain 4 ListItem components (defined in fixtures)', () => {
    const wrap = shallow(getComponent({ list: editableList, editable: true }));

    expect(
      wrap
        .find('.structured-list-tbody')
        .at(0)
        .find('ListItem').length,
    ).toEqual(4);
  });

  it('should contain `<ListItem/>` with default value (non editing state)', () => {
    const wrap = mount(
      <ListItem textEdit editing={false} label="Test" value="test" />,
    );
    expect(
      wrap
        .find('.structured-list-td')
        .at(1)
        .text(),
    ).toEqual('test');
  });

  it('should contain `<ListItem/>` with TextInput (editing state)', () => {
    const wrap = mount(<ListItem textEdit editing label="Test" value="test" />);
    expect(wrap.find(TextInput).length).toEqual(1);
  });

  it('should contain `<ListItem/>` with select (editing state)', () => {
    const wrap = mount(
      <ListItem selectEdit editing label="Test" value="test" />,
    );
    expect(wrap.find('select').length).toEqual(1);
  });

  it('should call `onEditClicked` when clicking the Edit link', () => {
    // ARRANGE
    const onEditClicked = jest.fn();

    // ACT
    const wrapper = mount(
      <StructuredList list={[]} editable onEditClicked={onEditClicked} />,
    );

    // Find the anchor element with the text "Edit", and click it
    wrapper.find('a[children="Edit"]').simulate('click');

    // ASSERT
    expect(onEditClicked).toHaveBeenCalledTimes(1);
  });

  it('should attach a data-testid attribute to the Edit link', () => {
    // ARRANGE
    const dataTestId = 'my-data-testid';

    // ACT
    const wrapper = mount(
      <StructuredList list={[]} editable editDataTestId={dataTestId} />,
    );

    // ASSERT
    // Find the anchor element with the text "Edit" and make sure it has a data-testid
    expect(wrapper.find('a[children="Edit"]').prop('data-testid')).toEqual(
      dataTestId,
    );
  });

  it('should attach a data-testid attributes the the list items', () => {
    // ARRANGE
    const dataTestId = 'my-data-testid';

    // ACT
    const wrapper = mount(
      <StructuredList
        list={[
          { label: 'Some item label', value: 'Some item value', dataTestId },
        ]}
      />,
    );

    // ASSERT
    // Find the anchor element with the text "Edit" and make sure it has a data-testid
    expect(wrapper.find('[data-testid="my-data-testid"]').text()).toEqual(
      'Some item value',
    );
  });
});
