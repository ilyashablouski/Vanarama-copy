import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StructuredList from '../StructuredList';
import ListItem from '../ListItem';
import { IStructuredListProps } from '../interfaces';
import { editableList, defaultList as list } from '../__fixtures__';

const getComponent = (props: IStructuredListProps) => (
  <StructuredList {...props} />
);

describe('<StructuredList />', () => {
  it('should render with required props', () => {
    const { container } = render(getComponent({ list }));

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a custom CSS class', () => {
    const { container } = render(
      getComponent({ list, className: 'custom-class' }),
    );

    expect(container).toMatchSnapshot();
  });

  it('should contain `<Link/>` with expected props/vals', () => {
    const wrap = render(
      getComponent({ list: editableList, editable: true }),
    ).container.getElementsByClassName('structured-list--edit')[0];

    expect(wrap.getElementsByClassName('link').length).toEqual(1);
    expect(wrap.getElementsByClassName('link')[0].textContent).toEqual('Edit');
    expect(
      fireEvent.click(wrap.getElementsByClassName('link')[0]),
    ).toBeTruthy();
  });

  it('should contain 4 ListItem components (defined in fixtures)', () => {
    const wrap = render(getComponent({ list: editableList, editable: true }))
      .container;

    expect(
      wrap
        .getElementsByClassName('structured-list-tbody')[0]
        .getElementsByClassName('structured-list-row').length,
    ).toEqual(4);
  });

  it('should contain `<ListItem/>` with default value (non editing state)', () => {
    const wrap = render(
      <ListItem textEdit editing={false} label="Test" value="test" />,
    ).container;
    expect(
      wrap.getElementsByClassName('structured-list-td')[1].textContent,
    ).toEqual('test');
  });

  it('should contain `<ListItem/>` with TextInput (editing state)', () => {
    const wrap = render(<ListItem textEdit editing label="Test" value="test" />)
      .container;
    expect(wrap.getElementsByClassName('textinput--native').length).toEqual(1);
  });

  it('should contain `<ListItem/>` with select (editing state)', () => {
    const wrap = render(
      <ListItem selectEdit editing label="Test" value="test" />,
    ).container;
    expect(wrap.getElementsByTagName('select').length).toEqual(1);
  });
  // TODO: fix test
  it.skip('should call `onEditClicked` when clicking the Edit link', () => {
    // // ARRANGE
    // const onEditClicked = jest.fn();
    //
    // // ACT
    // const wrapper = render(
    //   <StructuredList list={[]} editable onEditClicked={onEditClicked} />,
    // );
    //
    // // Find the anchor element with the text "Edit", and click it
    // wrapper.find('a[children="Edit"]').simulate('click');
    //
    // // ASSERT
    // expect(onEditClicked).toHaveBeenCalledTimes(1);
  });
  // TODO: fix test
  it.skip('should attach a data-testid attribute to the Edit link', () => {
    // ARRANGE
    // const dataTestId = 'my-data-testid';
    //
    // // ACT
    // const wrapper = mount(
    //   <StructuredList list={[]} editable editDataTestId={dataTestId} />,
    // );
    //
    // // ASSERT
    // // Find the anchor element with the text "Edit" and make sure it has a data-testid
    // expect(wrapper.find('a[children="Edit"]').prop('data-testid')).toEqual(
    //   dataTestId,
    // );
  });

  it('should attach a data-testid attributes the the list items', () => {
    // ARRANGE
    const dataTestId = 'my-data-testid';

    // ACT
    render(
      <StructuredList
        list={[
          { label: 'Some item label', value: 'Some item value', dataTestId },
        ]}
      />,
    );

    // ASSERT
    // Find the anchor element with the text "Edit" and make sure it has a data-testid
    expect(screen.getByTestId('my-data-testid').textContent).toEqual(
      'Some item value',
    );
  });
});
