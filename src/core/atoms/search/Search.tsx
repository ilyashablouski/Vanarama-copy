import cx from 'classnames';
import React, { FC, memo, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Close from '../../assets/icons/Close';
import SearchIcon from '../../assets/icons/Search';
import Tile from '../../molecules/tile';
import Button from '../button';
import Icon from '../icon';
import { ISearchProps } from './interfaces';
import Text from '../text';
import Link from '../link';

const Search: FC<ISearchProps> = memo(props => {
  const {
    id,
    name,
    className,
    placeholder,
    results = [],
    onSelect,
    onChange,
    isIntermediateState,
  } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // const [cursor, setCursor] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleSelect = (result: string) => {
    setSearchValue(result.trim());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setSearchResults([]);
      if (onSelect) {
        onSelect(searchValue);
      }
    }
  };

  // >>> reset search results <<<
  const handleClear = () => {
    setSearchValue('');
    setSearchResults([]);
  };

  useDeepCompareEffect(() => {
    const newResults = results.filter(result => {
      return result.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSearchResults(newResults);
  }, [results, searchValue]);

  return (
    <div className={cx('search--wrapper', className)}>
      <div className={cx('search', { '-results': results.length > 0 })}>
        <Icon icon={<SearchIcon />} size="regular" className="magnifier" />
        <label className="search-label" />
        <input
          id={id}
          name={name}
          ref={inputRef}
          role="searchbox"
          className="search-input"
          type="text"
          value={searchValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          label={<Icon icon={<Close />} size="small" color="success" />}
          fill="clear"
          className="search-close"
          onClick={() => handleClear()}
        />
      </div>
      {isIntermediateState && (
        <div className="search--spacer">
          <Text>
            Velit dolore exercitationem distinctio ipsa numquam quisquam?
          </Text>
          <Link>Change</Link>
        </div>
      )}
      {searchResults.length > 0 && (
        <Tile scrollable className="search--results">
          <ul className="search--results--ul">
            {searchResults.map(result => {
              return (
                <li
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelect(result)}
                  key={result}
                >
                  <span>{result}</span>
                </li>
              );
            })}
          </ul>
        </Tile>
      )}
    </div>
  );
});

export default Search;
