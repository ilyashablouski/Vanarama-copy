import { render } from '@testing-library/react';
import BreadCrumbContainer, { buildCrumbs } from '../BreadCrumbContainer';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

test('breadcrumb component dependant items prop value is built from route path', () => {
  const items = buildCrumbs('/about/hello-new/world-order');
  const exItems = [
    { label: 'About', href: 'about' },
    { label: 'Hello New', href: 'hello-new' },
    { label: 'World Order', href: 'world-order' },
  ];

  expect(items).toMatchObject(exItems);
});

test('BreadCrumbContainer to match snap', () => {
  useRouter.mockImplementationOnce(() => ({
    asPath: '/hello/world',
  }));
  const { container } = render(<BreadCrumbContainer />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <nav>
        <ol
          class="breadcrumb"
        >
          <li
            class="breadcrumb-item -parent"
          >
            <a
              class="link breadcrumb-item--backlink -teal -small -plain"
              href="hello"
            >
              Back to 
              Hello
              <i
                class="icon -medium -xsmall"
              >
                <svg
                  height="1em"
                  viewBox="0 0 512 512"
                  width="1em"
                >
                  <title>
                    ionicons-v5-a
                  </title>
                  <polyline
                    points="328 112 184 256 328 400"
                    style="fill: none; stroke: var(--class-color); stroke-linecap: round; stroke-linejoin: round; stroke-width: 48;"
                  />
                </svg>
              </i>
            </a>
            <a
              class="link breadcrumb-item--parent -teal -small -plain"
              href="hello"
            >
              Hello
            </a>
            <i
              class="icon -medium -xsmall"
            >
              <svg
                height="1em"
                viewBox="0 0 512 512"
                width="1em"
              >
                <title>
                  ionicons-v5-a
                </title>
                <polyline
                  points="184 112 328 256 184 400"
                  style="fill: none; stroke: var(--class-color); stroke-linecap: round; stroke-linejoin: round; stroke-width: 48;"
                />
              </svg>
            </i>
          </li>
          <li
            class="breadcrumb-item -child"
          >
            <span
              class="text breadcrumb-item--child -small -darker"
            >
              World
            </span>
          </li>
        </ol>
      </nav>
    </div>
  `);
});
