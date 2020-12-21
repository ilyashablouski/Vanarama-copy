# Benson

*Overview of the CSS-based design system for vanarama.com.*

## Contents

1. [Contents](#contents)
1. [Styleguide](#styleguide)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [BEM](#bem)
    - [ID selectors](#id-selectors)
1. [Sass](#sass)
    - [Structure](#structure)
    - [Syntax](#syntax)
    - [Ordering of property declarations](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
1. [Variables](#variables)
    - [Typography](#typography)
    - [Measurements](#measurements)
    - [Animations](#animations)
    - [Viewports](#viewports)
    - [Indices](#indices)
    - [Opacity](#opacity)
    - [Shadows](#shadows)
    - [Colours](#colours)
    - [Colour modifiers](#colour-modifiers)
1. [Utilities](#utilities)
    - [Classes](#classes)
      - [Flow control](#flow-control)
      - [Padding](#padding)
      - [Margins](#margins)
      - [Align](#align)
      - [Display](#display)
      - [Height](#height)
      - [Inline-styling](#inline-styling)
    - [Sass mixins](#sass-mixins)
      - [Media queries](#media-queries)
      - [Spacing](#spacing)
      - [Misc](#misc)

## Styleguide

### Formatting

- Use soft tabs (2 spaces) for indentation.
- Prefer dashes over camelCasing in class names.
  - Underscores and kebab-casing are okay if you are using BEM (see [BEM](#bem) below).
- Do not use ID selectors.
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace `{` in rule declarations.
- Put closing braces `}` of rule declarations on a new line.
- Put blank lines between rule declarations.
- Allow single-line declarations sparingly.

```scss
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}

.sparingly { border: 2px solid white }
```

### Comments

- Prefer line comments (`//` in Sass) to block comments.
- Prefer comments on their own line. Avoid end-of-line comments.
- Write comments for high-specificity styling exceptions.

### BEM

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing styles.

- CSS Tricks [BEM 101](https://css-tricks.com/bem-101/)
- Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

#### Example

```tsx
// card.tsx
function Card() {
  return (
    <article class="card card--featured">

      <h1 class="card__title">Lorem ipsum dolor</h1>

      <div class="card__content">
        <p>Vestibulum id ligula porta felis euismod semper.</p>
      </div>

    </article>
  );
}
```

```css
.card { }
.card--featured { }
.card__title { }
.card__content { }
```

- `.card` is the “block” and represents the higher-level component
- `.card__title` is an “element” and represents a descendant of `.card` that helps compose the block as a whole.
- `.card--featured` is a “modifier” and represents a different state or variation on the `.card` block.

### ID selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern. ID selectors introduce an unnecessarily high level of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) to your rule declarations, and they are not reusable.

**[↑ Back to Top](#benson)**

## Sass

### Structure

```plaintext
📁 components
┃
┣ 📁 atoms
┃ ┗ 📁 button
┃   ┣ 🔹 button.scss
┃   ┗ 🔸 button.tsx
┃
┣ 📁 molecules
┃ ┗ 📁 card
┃   ┣ 🔹 card.scss
┃   ┗ 🔸 card.tsx
┃
┣ 📁 organisms
┃ ┗ 📁 carousel
┃   ┣ 🔹 carousel.scss
┃   ┗ 🔸 carousel.tsx
┃
┣ 📁 templates
┃ ┣ 🔹 page.scss — page templates
┃ ┗ 🔹 row.scss — row templates
┃
┣ 📁 util
┃ ┣ 🔹 color.scss — color utility classes
┃ ┣ 🔹 font-face.scss — @font-face declarations
┃ ┣ 🔹 global.scss — base styles and utility classes
┃ ┣ 🔹 markdown.scss — markdown specific styles
┃ ┣ 🔹 mixins.scss — @mixin declarations
┃ ┣ 🔹 reset.scss — global reset
┃ ┗ 🔹 size.scss — size utility classes
┃
┣ 🔹 base.scss — compiler entry point, @imports
┗ 🔹 variables.scss — sass variables
```

### Syntax

- Use the `.scss` syntax, not the original `.sass` syntax
- Order regular CSS and `@include` declarations logically (see below)

### Ordering of property declarations

1. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector.

    ```scss
    .tag {
      @include padding-inline($rem-300);
      // ...
      background: $teal;
      font-weight: $font-weight-bold;
    }
    ```

2. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector.

    ```scss
    .tag {
      background: $teal;
      font-weight: $font-weight-bold;
      // ...
    }
    ```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

    ```scss
    .tag {
      @include padding-inline($rem-300);
      background: $teal;
      font-weight: $font-weight-bold;

      .icon {
        margin-right: 1ch;
      }
    }
    ```

### Variables

Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).

### Mixins

Mixins should be used to [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up your code, add clarity, or abstract complexity--in much the same way as well-named functions.

### Extend directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts).

**[↑ Back to Top](#benson)**

## Variables

Location: `/variables.scss`

#### Typography

`$font-family`

- `&-heading` — titles, labels, buttons
- `&-body` — default font
- `&-code` — fixed-width
  
`$font-size`

- `&-100: 0.5rem`
- `&-200: 0.75rem`
- `&-300: 0.875rem`
- `&-400: 1rem`
- `&-500: 1.25rem`
- `&-600: 1.75rem`
- `&-700: 2.75rem`

`$font-weight`

- `&-light: 300`
- `&-regular: 400`
- `&-medium: 500`
- `&-semibold: 600`
- `&-bold: 700`
- `&-black: 800`

`$letter-spacing`

- `&-narrow: -0.02em`
- `&-wide: 0.016em`
  
#### Measurements

`$rem`

- `&-100: 0.25rem`
- `&-200: 0.5rem`
- `&-300: 0.75rem`
- `&-400: 1rem`
- `&-500: 2rem`
- `&-600: 4rem`
- `&-700: 8rem`

`$em`

- `&-100: 0.25em`
- `&-200: 0.5em`
- `&-300: 0.75em`
- `&-400: 1em`
- `&-500: 2em`
- `&-600: 4em`
- `&-700: 8em`

`$height`

- `&-xsmall: 1.5rem`
- `&-small: 2rem`
- `&-regular: 2.5rem`
- `&-large: 3rem`
- `&-xlarge: 4rem`

`$border-width`

- `&-regular: 1px`
- `&-medium: 2px`
- `&-semibold: 3px`
- `&-bold: 5px`

`$border-radius`

- `&-xsmall: 0.125rem`
- `&-small: 0.25rem`
- `&-medium: 0.375rem`
- `&-large: 1rem`
- `&-round: 9999px`
- `&-circle: 50%`

#### Animations

`$transition`

- `&-soft: cubic-bezier(0.08, 0.52, 0.52, 1)`
- `&-strong: cubic-bezier(0.2, 0, 0.38, 0.9)`

`$duration`

- `&-small: 80ms`
- `&-medium: 150ms`
- `&-large: 250ms`

#### Viewports

`$vp`

- `&-small: 768px`
- `&-medium: 1024px`
- `&-large: 1216px`

#### Indices

`$z-index`

- `&-dropdown: 200`
- `&-card: 400`
- `&-header: 800`
- `&-modal: 900`

#### Opacity

`$opacity`

- `&-100: 0.04`
- `&-200: 0.08`
- `&-300: 0.16`
- `&-400: 0.40`
- `&-500: 0.80`
- `&-600: 0.90`
- `&-700: 0.96`

#### Shadows

`$box-shadow`

- `&-focus` — focus state outline
- `&-thin` — equivalent to a 1px solid border
- `&-small` — light shadow for inline elements
- `&-medium` — default shadow
- `&-large` — strong shadow for block elements
- `&-xlarge` — very strong shadow for modals
- `&-all` — small, medium, large and xlarge shadows in a single property

#### Colours

> Brand colours

- `$orange: hsl(24, 93%, 48%)` — brand primary
- `$teal: hsl(183, 68%, 31%)` — brand secondary
- `$sky: hsl(191, 63%, 59%)` — brand tertiary

> Interface colours (greys)

- `$black: hsl(209, 22%, 5%)` — strong text, headings
- `$darker: hsl(209, 22%, 34%)` — default text
- `$dark: hsl(209, 19%, 50%)` — muted text
- `$medium: hsl(209, 19%, 84%)` — border color
- `$light: hsl(209, 18%, 92%)` — contrast background
- `$lighter: hsl(200, 18%, 96%)` — alt. background
- `$white: hsl(0, 0%, 100%)` — background

> Semantic colours

- `$red: hsl(8, 100%, 42%)` — danger state
- `$yellow: hsl(43, 94%, 55%)` — warning state
- `$green: hsl(132, 60%, 32%)` — success state

#### Colour modifiers

> Values to adjust the appearance of a colour by through [darken](http://www.sass-lang.com/documentation/modules/color#darken) / [lighten](http://www.sass-lang.com/documentation/modules/color#lighten) functions

- `$shade: 10%` — use with `darken()`
- `$tint: 5%` — use with `lighten()`

```scss
.link {
  // default
  color: $teal;
  
  // lighter on hover
  &:hover {
    color: lighten($teal, $tint);
  }
  
  // darker on focus
  &:focus {
    color: darken($teal, $shade);
  }
}
```

**[↑ Back to Top](#benson)**

## Utilities

### Utility classes

Location: `/util/global.scss`

#### Flow control

`.-distribute-content` — add spacing between adjacent siblings

`.-justify-content`

- `&-dense` — flex center with wrapping
- `&-row` — flex horizontally with wrapping

`.-flex`

- `&-h` — flex horizontally
- `&-v` — flex vertically

#### Padding

`*: [100, 200, 300, 400, 500, 600, 700]`

| Class     | Properties                                              |
| ---       | ---                                                     |
| `.-p-*`   | `padding: $rem-*;`                                      |
| `.-pt-*`  | `padding-top: $rem-*;`                                  |
| `.-pb-*`  | `padding-bottom: $rem-*;`                               |
| `.-pv-*`  | `padding-top: $rem-*;` <br> `padding-bottom: $rem-*;`   |
| `.-pr-*`  | `padding-right: $rem-*;`                                |
| `.-pl-*`  | `padding-left: $rem-*;`                                 |
| `.-ph-*`  | `padding-left: $rem-*;` <br> `padding-right: $rem-*;`   |
| `.-p--*`  | `padding: -$rem-*;`                                     |
| `.-pt--*` | `padding-top: -$rem-*;`                                 |
| `.-pb--*` | `padding-bottom: -$rem-*;`                              |
| `.-pv--*` | `padding-top: -$rem-*;` <br> `padding-bottom: -$rem-*;` |
| `.-pr--*` | `padding-right: -$rem-*;`                               |
| `.-pl--*` | `padding-left: -$rem-*;`                                |
| `.-ph--*` | `padding-left: -$rem-*;` <br> `padding-right: -$rem-*;` |

#### Margins

`*: [100, 200, 300, 400, 500, 600, 700]`

| Class     | Properties                                            |
| ---       | ---                                                   |
| `.-m-*`   | `margin: $rem-*;`                                     |
| `.-mt-*`  | `margin-top: $rem-*;`                                 |
| `.-mb-*`  | `margin-bottom: $rem-*;`                              |
| `.-mv-*`  | `margin-top: $rem-*;` <br> `margin-bottom: $rem-*;`   |
| `.-mr-*`  | `margin-right: $rem-*;`                               |
| `.-ml-*`  | `margin-left: $rem-*;`                                |
| `.-mh-*`  | `margin-left: $rem-*;` <br> `margin-right: $rem-*;`   |
| `.-m--*`  | `margin: -$rem-*;`                                    |
| `.-mt--*` | `margin-top: -$rem-*;`                                |
| `.-mb--*` | `margin-bottom: -$rem-*;`                             |
| `.-mv--*` | `margin-top: -$rem-*;` <br> `margin-bottom: -$rem-*;` |
| `.-mr--*` | `margin-right: -$rem-*;`                              |
| `.-ml--*` | `margin-left: -$rem-*;`                               |
| `.-mh--*` | `margin-left: -$rem-*;` <br> `margin-right: -$rem-*;` |

#### Align

| Class        | Properties                |
| ---          | ---                       |
| `.-a-start`  | `align-self: flex-start;` |
| `.-a-end`    | `align-self: flex-end;`    |
| `.-a-left`   | `text-align: left;`        |
| `.-a-right`  | `text-align: right;`       |
| `.-a-center` | `text-align: center;`      |
| `.-a-middle` | `vertical-align: middle;`  |

#### Display

| Class              | Properties               |
| ---                | ---                      |
| `.-d-block`        | `display: block;`        |
| `.-d-inline-block` | `display: inline-block;` |
| `.-d-inline`       | `display: inline;`       |

#### Height

| Class         | Properties             |
| ---           | ---                    |
| `.-h-auto`    | `height: auto;`        |
| `.-h-content` | `height: max-content;` |

#### Inline-styling

| Class | Properties            |
| ---   | ---                   |
| `.-b` | `font-weight: 600;`   |
| `.-i` | `font-style: italic;` |

### Utility mixins

Location: `/util/mixins.scss`

#### Media queries

| Name             | Arguments | Description                                                |
| ---              | ---       | ---                                                        |
| `mobile`         | `{ ... }` | `@media` `max-width: $vp-small`                            |
| `tablet`         | `{ ... }` | `@media` `min-width: $vp-small` and `max-width: $vp-large` |
| `desktop`        | `{ ... }` | `@media` `min-width: $vp-large`                            |
| `mobile-tablet`  | `{ ... }` | `@media` `max-width: $vp-large`                            |
| `tablet-desktop` | `{ ... }` | `@media` `min-width: $vp-large`                            |

#### Spacing

| Name             | Arguments            | Description                                                                    |
| ---              | ---                  | ---                                                                            |
| `padding-block`  | `($value: $rem-400)` | see: [padding-block](developer.mozilla.org/en-US/docs/Web/CSS/padding-block)   |
| `padding-inline` | `($value: $rem-400)` | see: [padding-inline](developer.mozilla.org/en-US/docs/Web/CSS/padding-inline) |
| `margin-block`   | `($value: $rem-400)` | see: [margin-block](developer.mozilla.org/en-US/docs/Web/CSS/margin-block)     |
| `margin-inline`  | `($value: $rem-400)` | see: [margin-inline](developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)   |
| `global-inset`   | -                    | the outermost horizontal padding of all pages                                  |

#### Other

| Name                   | Arguments                     | Description                                                          |
| ---                    | ---                           | ---                                                                  |
| `distribute-children`  | `($value, $direction: block)` | add `$value` spacing between adjacent siblings in given `$direction` |
| `n`                    | `($num) { ... }`              | alias for `:nth-child($num) { ... }`                                 |
| `max-size`             | `($h, $w: $h)`                | shorthand for `max-height` and `max-width`                           |
| `overflow`             | `($y, $x: $y)`                | shorthand for `overflow-x` and `overflow-y`                          |
| `pseudo`               | `($position: before) { ... }` | shorthand for `&:after { ... }` or `&:before { ... }`                |
| `expand-tappable-area` | `($amount: 25%)`              | increases tap-area with an absolutely-positioned pseudo-element      |

**[↑ Back to Top](#benson)**
