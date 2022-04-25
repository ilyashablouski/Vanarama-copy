import React, { useEffect, useState } from 'react';
import Icon from 'core/atoms/icon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import TextInput from 'core/atoms/textinput/TextInput';
import cx from 'classnames';
import { useDesktopViewport } from '../../hooks/useMediaQuery';
import GlobalSearchLeftSideContainer from './GlobalSearchLeftSideContainer';
import GlobalSearchRightSideContainer from './GlobalSearchRightSideContainer';
import useDebounce from '../../hooks/useDebounce';
import { useGlobalSearch } from './gql';
import { moreInfoConfig } from './config';
import RouterLink from '../../components/RouterLink/RouterLink';
import { productDerivatives_productDerivatives_derivatives as ISuggestions } from '../../../generated/productDerivatives';

const SearchCircle = dynamic(() => import('core/assets/icons/SearchOutline'), {
  ssr: false,
});
const CloseSharp = dynamic(() => import('core/assets/icons/CloseSharp'), {
  ssr: false,
});

const GlobalSearchContainer = () => {
  const isDesktop = useDesktopViewport();
  const router = useRouter();
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchValue, 400);
  const suggestions = useGlobalSearch(debouncedSearchTerm);
  const onSubmit = (target: HTMLTextAreaElement) => {
    target.blur();
    router.push(
      {
        pathname: '/search',
        query: {
          searchTerm: target.value,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpenResults(false);
    };
    router.events.on('beforeHistoryChange', handleRouteChange);
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('header-search', isOpenResults ? '-active' : '')}>
      <div className="search-input-container">
        <TextInput
          className="header-search--input"
          id="search"
          isNative={false}
          type="text"
          value={fieldValue}
          placeholder="Search for vehicles or information..."
          dataUiTestId="global-search_search-field"
          onFocus={() => {
            if (!isOpenResults && fieldValue.length > 2) {
              setIsOpenResults(true);
            }
          }}
          onChange={event => {
            setFieldValue(event.target.value);
            if (event.target.value.length > 2) {
              setSearchValue(event.target.value);
            } else if (event.target.value.length < 3 && isOpenResults) {
              setSearchValue('');
              setIsOpenResults(false);
            }
          }}
          onKeyPress={event =>
            event.key === 'Enter'
              ? onSubmit(event.target as HTMLTextAreaElement)
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
              dataUiTestId="global-search_suggestions"
              suggestions={suggestions.suggestsList}
            />
            <GlobalSearchRightSideContainer
              dataUiTestId="global-search_results"
              suggestions={
                isDesktop
                  ? (suggestions.vehiclesList as ISuggestions[])
                  : (suggestions.vehiclesList as ISuggestions[]).slice(0, 5)
              }
              searchQuery={fieldValue}
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
  );
};

export default GlobalSearchContainer;
