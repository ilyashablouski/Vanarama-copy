import React from 'react';
import renderer from 'react-test-renderer';

import SchemaJSON from '..';
import { ISchemaJSONProps } from '../interfaces';

const props: ISchemaJSONProps = {
  json: `
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    }
  }
}
`,
};

function getComponent() {
  return renderer.create(<SchemaJSON json={props.json} />).toJSON();
}

describe('<SchemaJSON />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
