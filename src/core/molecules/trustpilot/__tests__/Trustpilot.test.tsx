import React from 'react';
import renderer from 'react-test-renderer';

import Trustpilot from '..';

describe('<Trustpilot />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Trustpilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
