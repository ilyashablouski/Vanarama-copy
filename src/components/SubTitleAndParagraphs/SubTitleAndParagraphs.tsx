import React, { FunctionComponent } from 'react';
import { Item } from './interfaces';

type SubTitleAndParagraphsProps = {
  title?: string;
  titleOn: boolean;
  paragraps?: Item[];
};

export const SubTitleAndParagraphs: FunctionComponent<SubTitleAndParagraphsProps> = ({
  title,
  titleOn,
  paragraps,
}) => {
  return (
    <>
      <div className="row:default">
        {titleOn ? <h3 className="heading -large -black -a-center -mb-500">{title}</h3> : null }

        {paragraps.map(item => {
          return (
            <>
              <p className="small-heading-and-copy">
                <span>{item.title}</span>
                <span>{item.description}</span>
              </p>
            </>
          );
        })}
      </div>
    </>
  );
};
