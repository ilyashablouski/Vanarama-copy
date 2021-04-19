import React from 'react';
import Icon from 'core/atoms/icon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useMediaQuery from '../../hooks/useMediaQuery';

const SearchCircle = dynamic(() => import('core/assets/icons/SearchOutline'), {
  ssr: false,
});
const GlobalSearchContainer = () => {
  const isDesktop = useMediaQuery('(min-width: 1216px)');
  const router = useRouter();
  // TODO: it's feature flag, should be removed after release
  const isVisible = Cookies.get('DIG-5552') === '1';
  const onSubmit = (value: string) => {
    router.push({
      pathname: '/search',
      query: {
        searchTerm: value,
      },
    });
  };
  return isDesktop && isVisible ? (
    <label className="header-search" htmlFor="search">
      {' '}
      {/* {TODO: commit for this search lines should be reverted after implement search functionality} */}
      <Icon icon={<SearchCircle />} />{' '}
      <input
        className="header-search--input"
        id="search"
        type="text"
        placeholder="Search for Vehicles…"
        onKeyPress={e =>
          e.key === 'Enter'
            ? onSubmit((e.target as HTMLTextAreaElement).value)
            : null
        }
      />{' '}
      {/* <div className="header-search--results -is-hidden" /> */}{' '}
    </label>
  ) : (
    <></>
  );
};

export default GlobalSearchContainer;
