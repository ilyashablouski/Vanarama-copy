import React, { FC, memo } from 'react';

import { ISchemaJSONProps } from './interfaces';

const SchemaJSON: FC<ISchemaJSONProps> = memo(props => {
  const { json } = props;

  const createSchema = () => {
    return {
      __html: json,
    };
  };

  return json ? (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={createSchema()}
    />
  ) : null;
});

export default memo(SchemaJSON);
