import Text from 'core/atoms/text/Text';
import cx from 'classnames';
import Close from 'core/assets/icons/Close';
import Icon from 'core/atoms/icon';

interface IProps {
  isFiltersRender: boolean;
  onCloseDrawer: () => void;
  isShowDrawer: boolean;
}
const Drawer = ({ isFiltersRender, onCloseDrawer, isShowDrawer }: IProps) => {
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
      />
    </div>
  );
};

export default Drawer;
