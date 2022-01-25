import React from 'react';
import { render } from '@testing-library/react';
import IvanCta from '../IvanCta';

describe('<IvanCta />', () => {
  it('should default render correctly', () => {
    const { container } = render(
      <IvanCta
        body="Our helpful chatbot iVan is available 24/7 to answer your van financing questions"
        title="Meet iVan"
        imageSrc="https://images.ctfassets.net/3xid768u5joa/31iQbyGS1DYs7b9viQHtXh/86ae2d62793162409d230b2042d9e00a/header-ivan.svg"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should compact render correctly', () => {
    const { container } = render(
      <IvanCta
        isCompact
        body="We're open again at 8:30am. Why not chat to iVan?"
        title=""
        imageSrc="https://www.vanarama.com/assets/images-optimised/header-ivan.svg"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
