import React, { useEffect, useState } from 'react';
import Icon from 'core/atoms/icon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import TextInput from 'core/atoms/textinput/TextInput';
import cx from 'classnames';
import useMediaQuery from '../../hooks/useMediaQuery';
import GlobalSearchLeftSideContainer from './GlobalSearchLeftSideContainer';
import GlobalSearchRightSideContainer from './GlobalSearchRightSideContainer';
import useDebounce from '../../hooks/useDebounce';
import { useGlobalSearch } from './gql';
import { moreInfoConfig } from './config';
import RouterLink from '../../components/RouterLink/RouterLink';

const SearchCircle = dynamic(() => import('core/assets/icons/SearchOutline'), {
  ssr: false,
});
const CloseSharp = dynamic(() => import('core/assets/icons/CloseSharp'), {
  ssr: false,
});
const GlobalSearchContainer = () => {
  const isDesktop = useMediaQuery('(min-width: 1216px)');
  const router = useRouter();
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchValue, 400);
  const suggestions = useGlobalSearch(debouncedSearchTerm);
  // TODO: it's feature flag, should be removed after release
  const isVisible = Cookies.get('DIG-5552') === '1';
  const onSubmit = (value: string) => {
    router.push(
      {
        pathname: '/search',
        query: {
          searchTerm: value,
        },
      },
      undefined,
      { shallow: false },
    );
  };

  useEffect(() => {
    if (searchValue && !isOpenResults) {
      setIsOpenResults(true);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpenResults(false);
    };
    router.events.on('beforeHistoryChange', handleRouteChange);
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange);
    };
  }, []);

  return isVisible ? (
    <>
      <div className={cx('header-search', isOpenResults ? '-active' : '')}>
        <div className="search-input-container">
          <TextInput
            className="header-search--input"
            id="search"
            isNative={false}
            type="text"
            value={fieldValue}
            placeholder="Search for vehicles or information..."
            onFocus={() => {
              if (!isOpenResults && fieldValue.length > 2) {
                setIsOpenResults(true);
              }
            }}
            onChange={e => {
              setFieldValue(e.target.value);
              if (e.target.value.length > 2) {
                setSearchValue(e.target.value);
              } else if (e.target.value.length < 3 && isOpenResults) {
                setSearchValue('');
                setIsOpenResults(false);
              }
            }}
            onKeyPress={e =>
              e.key === 'Enter'
                ? onSubmit((e.target as HTMLTextAreaElement).value)
                : null
            }
          />
          {!isOpenResults && (
            <Icon
              icon={<SearchCircle />}
              className="icon -lead -black md hydrated"
              aria-label="search"
            />
          )}
          {!(!isOpenResults && isDesktop) && (
            <Icon
              onClick={() => {
                if (isOpenResults) {
                  setIsOpenResults(false);
                }
              }}
              icon={<CloseSharp />}
              className={cx(
                'icon -lead -black md hydrated',
                !isOpenResults ? '-is-hidden' : '',
              )}
              aria-label="search"
            />
          )}
        </div>
        {isOpenResults && (
          <>
            <div className="header-search-results-container">
              <GlobalSearchLeftSideContainer
                suggestions={suggestions.suggestsList}
                aggregation={suggestions.aggregation}
              />
              <GlobalSearchRightSideContainer
                suggestions={
                  isDesktop
                    ? suggestions.vehiclesList
                    : suggestions.vehiclesList.slice(0, 5)
                }
                searchQuery={fieldValue}
                aggregation={suggestions.aggregation}
              />
              <div className="info">
                <span className="heading -small -dark">More Information</span>

                <ul>
                  {moreInfoConfig.map(config => (
                    <li key={config.label}>
                      <RouterLink link={config.link}>{config.label}</RouterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              role="alertdialog"
              className="search-modal-bg"
              onClick={() => setIsOpenResults(false)}
              onKeyDown={() => setIsOpenResults(false)}
            />
          </>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default GlobalSearchContainer;
