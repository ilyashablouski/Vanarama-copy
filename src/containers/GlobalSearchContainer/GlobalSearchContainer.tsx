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
import { isGlobalSearchFeatureEnabled } from '../../utils/helpers';

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
  // TODO: https://autorama.atlassian.net/browse/DIG-6855
  const isVisible = isGlobalSearchFeatureEnabled();
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

  return isVisible ? (
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
            />
            <GlobalSearchRightSideContainer
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
  ) : (
    <></>
  );
};

export default GlobalSearchContainer;
