import {useSWRInfinite} from 'swr';
import qs from 'qs';
import {fetcher} from '../lib';
import {Client} from '../types';

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
  gender?: string;
  page: number;
};

const useClients = (query: UseClientsQuery): UseClientsReturn => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/?results=50&page=${pageIndex}&${qs.stringify(query)}`;
  }
  const {data, error, isValidating, size: page, setSize: setPage} = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });
  
  const results = data ? [].concat(...data) : [];
  const isLoading = !data && !error && isValidating;
  const isLoadingMore = Boolean(isLoading || (page > 0 && data && typeof data[page - 1] === 'undefined'));
  const isEmpty = Boolean(data?.[0]?.length === 0);
  const isReachingEnd = Boolean(isEmpty || (data && data[data.length - 1]?.length < 50));

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
