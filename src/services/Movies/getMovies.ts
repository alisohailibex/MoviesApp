import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';
import moviesHttp from '../config/movies-http';
import {API_ENDPOINT} from '../config/endpoints';

async function getMovies({pageParam = 1}) {
  const limit = 5;
  const response = await moviesHttp.get(
    `${API_ENDPOINT.MOVIES.GET_MOVIES}?limit=${limit}`,
  );
  return response.data;
}

export const useGetMoviesQuery = () => {
  return useInfiniteQuery({
    queryKey: [API_ENDPOINT.MOVIES.GET_MOVIES],
    queryFn: getMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = 2;
      if (allPages.length >= maxPages) return undefined;
      return allPages.length + 1;
    },
  });
};
