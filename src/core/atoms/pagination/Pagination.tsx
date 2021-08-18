import React, { FC, useCallback, useMemo } from 'react';
import cx from 'classnames';
import { IPaginationProps } from './interfaces';
import Link from '../link';
import ChevronBackSharp from '../../assets/icons/ChevronBackSharp';
import ChevronForwardSharp from '../../assets/icons/ChevronForwardSharp';
import Icon from '../icon';
import { addEtc } from './helpers';

const Pagination: FC<IPaginationProps> = props => {
  const {
    className,
    pages,
    selected,
    path,
    pathWithHtml,
    pathForFirstPage,
    onClick,
    onClickBackArray,
    onClickNextArray,
  } = props;

  const genPages = () => {
    const totalPage = pages.length;
    const first = (page: number) => page === 1;
    const middle = (page: number, between: { first: number; last: number }) =>
      page > between.first && page <= between.last;
    const last = (page: number) => page === totalPage;
    const between = {
      first: 0,
      last: 0,
    };
    if (totalPage <= 5) {
      between.first = 1;
      between.last = 5;
    } else if (selected < 3) {
      between.first = 1;
      between.last = 4;
    } else if (selected > totalPage - 3) {
      between.first = totalPage - 4;
      between.last = totalPage - 1;
    } else {
      between.first = selected - 2;
      between.last = selected + 1;
    }
    const allPages = pages.filter(
      page => first(page) || middle(page, between) || last(page),
    );
    return addEtc(allPages);
  };

  const genPath = useCallback(
    (pageNumber: number) =>
      `${path}/${pageNumber}${pathWithHtml ? '.html' : ''}`,
    [path, pathWithHtml],
  );

  const pagesItem = genPages();

  const previousPagePath = useMemo(() => {
    if (selected === 1) {
      return path;
    }
    if (selected === 2 && pathForFirstPage) {
      return `${pathForFirstPage}${pathWithHtml ? '.html' : ''}`;
    }
    return genPath(selected - 1);
  }, [selected, genPath, path, pathForFirstPage, pathWithHtml]);

  const nextPagePath = useMemo(() => {
    if (selected === pages[pages.length - 1]) {
      return path;
    }
    return genPath(selected + 1);
  }, [selected, genPath, pages, path]);

  return (
    <div className={cx('pagination', className)}>
      {selected !== 1 && (
        <Link
          key="chevron-back"
          href={previousPagePath}
          onClick={onClickBackArray}
          className={cx('pagination--chevron', {
            '-disabled': selected === 1,
          })}
        >
          <Icon icon={<ChevronBackSharp />} />
        </Link>
      )}
      {pagesItem.map((page: string, index: number) => {
        return page === '...' ? (
          <div className="pagination--item --disabled" key={`${page + index}`}>
            {page}
          </div>
        ) : (
          <Link
            key={`${Number(page) + index}`}
            href={
              page === '1' && pathForFirstPage
                ? `${pathForFirstPage}${pathWithHtml ? '.html' : ''}`
                : `${path}/${page}${pathWithHtml ? '.html' : ''}`
            }
            onClick={onClick}
            className={cx('pagination--item', {
              '-active': selected === Number(page),
            })}
          >
            {page}
          </Link>
        );
      })}
      {selected !== pages[pages.length - 1] && (
        <Link
          key="chevron-forward"
          href={nextPagePath}
          onClick={onClickNextArray}
          className={cx('pagination--chevron', {
            '-disabled': selected === pages[pages.length - 1],
          })}
        >
          <Icon icon={<ChevronForwardSharp />} />
        </Link>
      )}
    </div>
  );
};

export default React.memo(Pagination);
