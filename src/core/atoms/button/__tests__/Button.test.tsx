import React from 'react';
import renderer from 'react-test-renderer';

import { fireEvent, render, screen } from '@testing-library/react';
import Button from '..';
import { IButtonProps } from '../interfaces';

import Add from '../../../assets/icons/Add';

const optionalProps = {
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  fill: 'solid' as const,
  label: 'Label',
  round: true,
  tabIndex: 5,
  type: 'button' as const,
  value: 'value',
};

const disabled = {
  disabled: true,
};

function getComponent(props?: IButtonProps) {
  return renderer.create(<Button {...props} />).toJSON();
}

describe('<Button />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an icon before the label', () => {
    const tree = getComponent({
      ...optionalProps,
      icon: <Add />,
      iconPosition: 'before',
    });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with disabled', () => {
    const tree = getComponent({ ...optionalProps, ...disabled });
    expect(tree).toMatchSnapshot();
  });

  it('should be able to click the button', () => {
    const onClick = jest.fn();
    render(<Button {...optionalProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
