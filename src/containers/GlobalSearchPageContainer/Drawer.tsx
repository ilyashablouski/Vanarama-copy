import Text from 'core/atoms/text/Text';
import cx from 'classnames';
import Close from 'core/assets/icons/Close';
import Icon from 'core/atoms/icon';
import Button from 'core/atoms/button';
import { pluralise } from '../../utils/dates';
import { Component } from '../../types/common';

interface IProps {
  renderContent: () => Component;
  isFiltersRender: boolean;
  onCloseDrawer: () => void;
  onResetFilters: () => void;
  isShowDrawer: boolean;
  totalResults: number;
}
const Drawer = ({
  isFiltersRender,
  onCloseDrawer,
  onResetFilters,
  isShowDrawer,
  renderContent,
  totalResults,
}: IProps) => {
  return (
    <div
      className={cx('srp-f-flyout', {
        open: isShowDrawer,
      })}
    >
      <Text tag="div" className="title">
        <span>{isFiltersRender ? 'Filter' : 'Sort'}</span>
        <Icon
          icon={<Close />}
          onClick={onCloseDrawer}
          className="close-filter"
        />
      </Text>
      <div
        className={cx('content', {
          filters: isFiltersRender,
          sort: !isFiltersRender,
        })}
      >
        {renderContent()}
      </div>
      {isFiltersRender ? (
        <div className="actions">
          <Button label="Reset" fill="outline" onClick={onResetFilters} />
          <Button
            onClick={onCloseDrawer}
            color="primary"
            className="update-results"
            label={`
                View ${totalResults} ${pluralise(totalResults, {
              one: 'Card',
              many: 'Cards',
            })}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Drawer;
