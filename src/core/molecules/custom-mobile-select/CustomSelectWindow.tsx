import { ReactNode, MouseEvent, useRef, useState } from 'react';
import Text from 'core/atoms/text';
import Button from 'core/atoms/button';
import cx from 'classnames';

interface IProps {
  title: string;
  children?: ReactNode;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CustomSelectWindow = ({ title, onClose, children }: IProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const onScrollHandle = () => {
    if ((listRef?.current?.scrollTop || 0) > 0 && !isScrolling) {
      setIsScrolling(true);
    } else if (listRef?.current?.scrollTop === 0 && isScrolling) {
      setIsScrolling(false);
    }
  };

  return (
    <div className="custom-select-window">
      <div className="select-window">
        <div
          className={cx('list-header', {
            'list-header_scrolling': isScrolling,
          })}
        >
          <Text tag="span" color="black" size="initial-size">
            {title}
          </Text>
          <Button onClick={onClose} label="Done" fill="clear" color="primary" />
        </div>
        <div
          ref={listRef}
          className="options-list-wrapper"
          onScroll={e => {
            e.stopPropagation();
            onScrollHandle();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectWindow;
