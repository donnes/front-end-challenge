import {useSWRInfinite} from 'swr';
import qs from 'qs';
import {omit} from 'lodash';
import {fetcher} from '@/lib';
import {Client} from '@/types';

type UseClientsReturn = {
  results: Client[];
  page: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  isEmpty: boolean;
  isReachingEnd: boolean;
  setPage: (page: number) => void,
};

type UseClientsQuery = {
  search: string;
  gender: string;
  page: string | number;
  viewId: string;
};

const useClients = (query: UseClientsQuery): UseClientsReturn => {
  const getKey = (pageIndex, previousPageData) => {
    const fetchParams = omit(query, ['page', 'viewId', 'search']);
    if (previousPageData && !previousPageData.length) return null;
    return `/?results=50&page=${pageIndex}&${qs.stringify(fetchParams)}`;
  }
  const {data, error, isValidating, size: page, setSize: setPage} = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });
  
  const results = data ? [].concat(...data) : [];
  const isLoading = !data && !error && isValidating;
  const isLoadingMore = isLoading || (page > 0 && data && typeof data[page - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 50);

  return {
    results,
    page,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    setPage,
  }
}

export default useClients;
