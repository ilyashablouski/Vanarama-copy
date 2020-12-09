import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import IndependentReview from '../IndependentReview';

describe('<IndependentReview />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with empty review', () => {
    const getComponent = () => {
      return renderer.create(<IndependentReview review="" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with review', () => {
    const getComponent = () => {
      return renderer
        .create(<IndependentReview review="<h2>Test</h2>" />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should show all review when clicking the "Read More" link', () => {
    // ARRANGE
    const mocks =
      'Ten Second Review. This fourth generation C-Class really does democratise Mercedes luxury for a wider' +
      ' audience, lighter, cleverer, nicer to ride in and beautifully finished.' +
      ' True, pricing still reflects its premium positioning but in this guise more than ever, this more efficient,' +
      ' more desirable design now has a look and feel worth every penny. A cut above its BMW 3 Series and Audi A4 rivals? Many will think so.';

    // ACT
    render(<IndependentReview review={mocks} />);

    expect(screen.queryByText(/Read Less/)).not.toBeInTheDocument();
    expect(screen.queryByText(mocks)).not.toBeInTheDocument();
    // Click the "Read More" link
    fireEvent.click(screen.getByText(/Read More/));

    // ASSERT
    expect(screen.getByText(/Read Less/)).toBeInTheDocument();
    expect(screen.queryByText(/Read More/)).not.toBeInTheDocument();
    expect(screen.getByText(mocks)).toBeInTheDocument();
  });
});
