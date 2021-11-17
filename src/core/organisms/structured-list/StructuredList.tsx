import React, { FC, useState } from 'react';
import cx from 'classnames';

import Price from '../../atoms/price';
import Text from '../../atoms/text';
import Link from '../../atoms/link';
import ListItem from './ListItem';

import { IListItemProps, IStructuredListProps } from './interfaces';

const StructuredList: FC<IStructuredListProps> = ({
  className,
  list = [],
  editable = false,
  heading = '',
  onChange,
  headingSize,
  onEditClicked,
  priceTag,
  editDataTestId,
  priceDataTestId,
  priceTagDataTestId,
  headingDataTestId,
  itemWrap,
  dataUiTestId,
}) => {
  const [editing, setEditing] = useState(false);
  return (
    <section className={cx('structured-list', className)}>
      {(heading || priceTag) && (
        <div className="structured-list-thead">
          <div className="structured-list-row structured-list-row--header-row">
            {priceTag && (
              <div className="structured-list-th">
                <Price
                  price={priceTag.price}
                  size={priceTag.size}
                  dataTestId={priceDataTestId}
                />
                <Text
                  tag="p"
                  color={priceTag.color ? priceTag.color : 'black'}
                  size="xsmall"
                  dataTestId={priceTagDataTestId}
                >
                  {priceTag.info}
                </Text>
              </div>
            )}
            {heading && (
              <div className="structured-list-th">
                <Text
                  tag="p"
                  color="black"
                  size={headingSize}
                  dataTestId={headingDataTestId}
                >
                  {heading}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="structured-list-tbody">
        {list.map((item: IListItemProps, index: number) => (
          <ListItem
            key={item.dataTestId}
            {...item}
            wrap={itemWrap}
            testId={index}
            onChange={onChange}
            editing={editing}
            dataUiTestId={dataUiTestId}
          />
        ))}
      </div>
      {editable && (
        <div className="structured-list--edit">
          {!editing ? (
            <Link
              color="teal"
              dataTestId={editDataTestId}
              onClick={() => {
                onEditClicked?.();
                setEditing(true);
              }}
            >
              Edit
            </Link>
          ) : (
            <Link color="teal" onClick={() => setEditing(false)}>
              Save Changes
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default StructuredList;
